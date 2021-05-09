import { currentScope, opcodeToData } from ".";
import { IOpWordCode } from "../constant/opWordCodes";
import { StackData, ParseResult, StackDataList } from "../model";

import * as constants from "./stackOp/constants";
import * as stacks from "./stackOp/stacks";
import * as splices from "./stackOp/splices";
import * as arithmetics from "./stackOp/arithmetics";
import * as cryptos from "./stackOp/cryptos";
import { OP_ELSE, OP_ENDIF, OP_IF, OP_NOTIF, OP_VERIFY } from "./stackOp/flow";
import { OP_AND, OP_EQUAL, OP_EQUALVERIFY, OP_INVERT, OP_OR, OP_XOR } from "./stackOp/bitwise";

const OP = (word: string, stackDataList: StackDataList): ParseResult => {
  const mainStackDataArray: StackData[] = stackDataList.main;

  const opData: IOpWordCode | undefined = opcodeToData(word);
  if (opData === undefined) throw "Unknown OP word!";
  const mainStackDataArrayLength = mainStackDataArray.length;

  /*
   * Constants
   * * 0 - 96
   */
  if (
    word === "OP_0" ||
    word === "OP_FALSE" ||
    word === "OP_1" ||
    word === "OP_TRUE" ||
    word === "OP_2" ||
    word === "OP_3" ||
    word === "OP_4" ||
    word === "OP_5" ||
    word === "OP_6" ||
    word === "OP_7" ||
    word === "OP_8" ||
    word === "OP_9" ||
    word === "OP_10" ||
    word === "OP_11" ||
    word === "OP_12" ||
    word === "OP_13" ||
    word === "OP_14" ||
    word === "OP_15" ||
    word === "OP_16"
  ) {
    const addDataArray: StackData[] = constants.OP_NUMBER(word, opData);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };
    return { main: { addDataArray, removeLastSize }, alt };
  }

  /*
   * Flow control
   * * 97 - 106
   */
  if (word === "OP_NOP") {
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray: [], removeLastSize }, alt };
  }
  if (word === "OP_IF") {
    if (mainStackDataArrayLength < 1) throw "OP_IF Error: stack data array must include min 1 data!";

    const flows = OP_IF(stackDataList);
    const removeLastSize: number = currentScope(stackDataList) ? 1 : 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  }
  if (word === "OP_NOTIF") {
    if (mainStackDataArrayLength < 1) throw "OP_NOTIF Error: stack data array must include min 1 data!";

    const flows = OP_NOTIF(stackDataList);
    const removeLastSize: number = currentScope(stackDataList) ? 1 : 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  }
  if (word === "OP_ELSE") {
    if (stackDataList.flow.length === 1) throw "OP_ELSE Error: Encountered an OP_ELSE outside of an OP_IF ... OP_ENDIF block.!";

    const flows = OP_ELSE(stackDataList);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  }
  if (word === "OP_ENDIF") {
    if (stackDataList.flow.length === 1) throw "OP_ENDIF Error: Encountered an OP_ENDIF which is not following a matching OP_IF.!";

    const flows = OP_ENDIF(stackDataList);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  }
  if (word === "OP_VERIFY") {
    if (mainStackDataArray.length < 1) throw "OP_VERIFY Error:  stack data array must include min 1 data!!";

    const isVerify = OP_VERIFY(mainStackDataArray[mainStackDataArray.length - 1]);

    if (isVerify) {
      const addDataArray: StackData[] = [];
      const removeLastSize: number = 1;
      const alt = { removeLastStackData: false };

      return { main: { addDataArray, removeLastSize }, alt };
    } else {
      return { main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false }, isStackFailed: true };
    }
  }

  /*
   * Stack
   * * 107 - 125
   */
  if (word === "OP_TOALTSTACK") {
    if (mainStackDataArrayLength < 1) throw "OP_TOALTSTACK Error: stack data array must include min 1 data!";
    const addDataArray: StackData[] = stacks.OP_TOALTSTACK();
    const removeLastSize: number = 1;
    const alt = { addData: mainStackDataArray[mainStackDataArrayLength - 1], removeLastStackData: false };
    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_FROMALTSTACK") {
    const altStackDataArrayLength = stackDataList.alt.length;
    if (altStackDataArrayLength < 1) throw "OP_FROMALTSTACK Error: tried to read from an empty alternate stack.";
    const addDataArray: StackData[] = stacks.OP_FROMALTSTACK(stackDataList.alt[stackDataList.alt.length - 1]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: true };
    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_2DROP") {
    if (mainStackDataArrayLength < 2) throw "OP_2DROP Error: stack data array must include min 2 data!";
    const addDataArray: StackData[] = stacks.OP_2DROP();
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };
    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_2DUP") {
    if (mainStackDataArrayLength < 2) throw "OP_2DUP Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = stacks.OP_2DUP(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };
    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_3DUP") {
    if (mainStackDataArrayLength < 3) throw "OP_3DUP Error: stack data array must include min 3 data!";

    const addDataArray: StackData[] = stacks.OP_3DUP(
      mainStackDataArray[mainStackDataArrayLength - 3],
      mainStackDataArray[mainStackDataArrayLength - 2],
      mainStackDataArray[mainStackDataArrayLength - 1]
    );
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };
    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_2OVER") {
    if (mainStackDataArrayLength < 4) throw "OP_2OVER Error: stack data array must include min 4 data!";
    const addDataArray: StackData[] = stacks.OP_2OVER(mainStackDataArray[mainStackDataArrayLength - 4], mainStackDataArray[mainStackDataArrayLength - 3]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_2SWAP") {
    if (mainStackDataArrayLength < 4) throw "OP_2SWAP Error: stack data array must include min 4 data!";
    const addDataArray: StackData[] = stacks.OP_2SWAP(
      mainStackDataArray[mainStackDataArrayLength - 1],
      mainStackDataArray[mainStackDataArrayLength - 2],
      mainStackDataArray[mainStackDataArrayLength - 3],
      mainStackDataArray[mainStackDataArrayLength - 4]
    );
    const removeLastSize: number = 4;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_IFDUP") {
    if (mainStackDataArrayLength < 1) throw "OP_IFDUP Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = stacks.OP_IFDUP(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_DEPTH") {
    const addDataArray: StackData[] = stacks.OP_DEPTH(mainStackDataArrayLength);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_DROP") {
    if (mainStackDataArrayLength < 1) throw "OP_DROP Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = stacks.OP_DROP();
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_DUP") {
    if (mainStackDataArrayLength < 1) throw "OP_DUP Error: stack data array must include min 1 data!";
    const addDataArray: StackData[] = stacks.OP_DUP(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_NIP") {
    if (mainStackDataArrayLength < 2) throw "OP_NIP Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = stacks.OP_NIP(mainStackDataArray[mainStackDataArrayLength - 1], mainStackDataArray[mainStackDataArrayLength - 2]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_OVER") {
    if (mainStackDataArrayLength < 2) throw "OP_OVER Error: stack data array must include min 2 data!";
    const addDataArray: StackData[] = stacks.OP_OVER(mainStackDataArray[mainStackDataArrayLength - 2]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_SWAP") {
    if (mainStackDataArrayLength < 2) throw "OP_SWAP Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = stacks.OP_SWAP(mainStackDataArray[mainStackDataArrayLength - 1], mainStackDataArray[mainStackDataArrayLength - 2]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_2ROT") {
    if (mainStackDataArrayLength < 6) throw "OP_2ROT Error: stack data array must include min 6 data!";

    const addDataArray: StackData[] = stacks.OP_2ROT(
      mainStackDataArray[mainStackDataArrayLength - 6],
      mainStackDataArray[mainStackDataArrayLength - 5],
      mainStackDataArray[mainStackDataArrayLength - 4],
      mainStackDataArray[mainStackDataArrayLength - 3],
      mainStackDataArray[mainStackDataArrayLength - 2],
      mainStackDataArray[mainStackDataArrayLength - 1]
    );

    const removeLastSize: number = 6;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_ROT") {
    if (mainStackDataArrayLength < 3) throw "OP_ROT Error: stack data array must include min 3 data!";

    const addDataArray: StackData[] = stacks.OP_ROT(
      mainStackDataArray[mainStackDataArrayLength - 3],
      mainStackDataArray[mainStackDataArrayLength - 2],
      mainStackDataArray[mainStackDataArrayLength - 1]
    );

    const removeLastSize: number = 3;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_PICK") {
    if (mainStackDataArrayLength < 2) throw "OP_PICK Error: stack data array must include min 2 data!";

    let stackIndex: number | undefined = mainStackDataArray[mainStackDataArrayLength - 1].numberValue;
    let willChangedStackDataArray: StackData[] = [...mainStackDataArray];
    willChangedStackDataArray.pop();

    if (stackIndex !== undefined) {
      if (stackIndex >= willChangedStackDataArray.length) throw "OP_PICK Error: stack index cant be equal and greater than stack array length";
    } else {
      throw "OP_PICK Error: stack index must be a number";
    }

    const addDataArray: StackData[] = stacks.OP_PICK(willChangedStackDataArray, stackIndex);

    const removeLastSize: number = mainStackDataArray.length;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_ROLL") {
    if (mainStackDataArrayLength < 2) throw "OP_ROLL Error: stack data array must include min 2 data!";

    let stackIndex: number | undefined = mainStackDataArray[mainStackDataArrayLength - 1].numberValue;
    let willChangedStackDataArray: StackData[] = [...mainStackDataArray];
    willChangedStackDataArray.pop();

    if (stackIndex !== undefined) {
      if (stackIndex >= willChangedStackDataArray.length) throw "OP_ROLL Error: stack index cant be equal and greater than stack array length";
    } else {
      throw "OP_ROLL Error: stack index must be a number";
    }

    const addDataArray: StackData[] = stacks.OP_ROLL(willChangedStackDataArray, stackIndex);

    const removeLastSize: number = mainStackDataArray.length;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_TUCK") {
    if (mainStackDataArrayLength < 2) throw "OP_TUCK Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = stacks.OP_TUCK(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);

    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  /*
   * Splice
   * 126 - 130
   */
  if (word === "OP_CAT") {
    if (mainStackDataArrayLength < 2) throw "OP_CAT Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = splices.OP_CAT(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_SUBSTR") {
    if (mainStackDataArrayLength < 3) throw "OP_SUBSTR Error: stack data array must include min 3 data!";

    const addDataArray: StackData[] = splices.OP_SUBSTR(
      mainStackDataArray[mainStackDataArrayLength - 3],
      mainStackDataArray[mainStackDataArrayLength - 2],
      mainStackDataArray[mainStackDataArrayLength - 1]
    );
    const removeLastSize: number = 3;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_SIZE") {
    if (mainStackDataArrayLength < 1) throw "OP_SIZE Error: stack data array must include min 1 data!";
    const addDataArray: StackData[] = splices.OP_SIZE(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  /*
   * Bitwise logic
   * 131 - 136
   */

  if (word === "OP_INVERT") {
    if (mainStackDataArrayLength < 1) throw "OP_INVERT Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = OP_INVERT(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_AND") {
    if (mainStackDataArrayLength < 2) throw "OP_AND Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = OP_AND(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_OR") {
    if (mainStackDataArrayLength < 2) throw "OP_OR Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = OP_OR(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_XOR") {
    if (mainStackDataArrayLength < 2) throw "OP_XOR Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = OP_XOR(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_EQUAL") {
    if (mainStackDataArrayLength < 2) throw "OP_EQUAL Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = OP_EQUAL(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_EQUALVERIFY") {
    if (mainStackDataArray.length < 2) throw "OP_EQUALVERIFY Error:  stack data array must include min 2 data!!";

    const isVerify = OP_EQUALVERIFY(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);

    if (isVerify) {
      const addDataArray: StackData[] = [];
      const removeLastSize: number = 2;
      const alt = { removeLastStackData: false };

      return { main: { addDataArray, removeLastSize }, alt };
    } else {
      return { main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false }, isStackFailed: true };
    }
  }

  /*
   * Arithmetic
   * 139 - 165
   */
  if (word === "OP_1ADD") {
    if (mainStackDataArrayLength < 1) throw "OP_1ADD Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = arithmetics.OP_1ADD(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_1SUB") {
    if (mainStackDataArrayLength < 1) throw "OP_1SUB Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = arithmetics.OP_1SUB(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_NEGATE") {
    if (mainStackDataArrayLength < 1) throw "OP_NEGATE Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = arithmetics.OP_NEGATE(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_ABS") {
    if (mainStackDataArrayLength < 1) throw "OP_ABS Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = arithmetics.OP_ABS(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_NOT") {
    if (mainStackDataArrayLength < 1) throw "OP_NOT Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = arithmetics.OP_NOT(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_0NOTEQUAL") {
    if (mainStackDataArrayLength < 1) throw "OP_0NOTEQUAL Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = arithmetics.OP_0NOTEQUAL(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_ADD") {
    if (mainStackDataArrayLength < 2) throw "OP_ADD Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_ADD(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_SUB") {
    if (mainStackDataArrayLength < 2) throw "OP_SUB Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_SUB(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_MUL") {
    if (mainStackDataArrayLength < 2) throw "OP_MUL Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_MUL(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_DIV") {
    if (mainStackDataArrayLength < 2) throw "OP_DIV Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_DIV(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_LSHIFT") {
    if (mainStackDataArrayLength < 2) throw "OP_LSHIFT Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_LSHIFT(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_RSHIFT") {
    if (mainStackDataArrayLength < 2) throw "OP_RSHIFT Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_RSHIFT(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_BOOLAND") {
    if (mainStackDataArrayLength < 2) throw "OP_BOOLAND Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_BOOLAND(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_BOOLOR") {
    if (mainStackDataArrayLength < 2) throw "OP_BOOLOR Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_BOOLOR(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_NUMEQUAL") {
    if (mainStackDataArrayLength < 2) throw "OP_NUMEQUAL Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_NUMEQUAL(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_GREATERTHANOREQUAL") {
    if (mainStackDataArrayLength < 2) throw "OP_GREATERTHANOREQUAL Error: stack data array must include min 2 data!";

    const addDataArray: StackData[] = arithmetics.OP_GREATERTHANOREQUAL(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  /*
   * Crypto
   * 166 - 175
   */
  if (word === "OP_SHA1") {
    if (mainStackDataArrayLength < 1) throw "OP_SHA1 Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = cryptos.OP_SHA1(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_SHA256") {
    if (mainStackDataArrayLength < 1) throw "OP_SHA256 Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = cryptos.OP_SHA256(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_RIPEMD160") {
    if (mainStackDataArrayLength < 1) throw "OP_RIPEMD160 Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = cryptos.OP_RIPEMD160(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_HASH160") {
    if (mainStackDataArrayLength < 1) throw "OP_HASH160 Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = cryptos.OP_HASH160(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_HASH256") {
    if (mainStackDataArrayLength < 1) throw "OP_HASH256 Error: stack data array must include min 1 data!";

    const addDataArray: StackData[] = cryptos.OP_HASH256(mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }
  if (word === "OP_CHECKSIGFROMSTACK") {
    if (mainStackDataArrayLength < 3) throw "OP_CHECKSIGFROMSTACK Error: stack data array must include min 3 data!";

    const addDataArray: StackData[] = cryptos.OP_CHECKSIGFROMSTACK(
      mainStackDataArray[mainStackDataArrayLength - 3],
      mainStackDataArray[mainStackDataArrayLength - 2],
      mainStackDataArray[mainStackDataArrayLength - 1]
    );
    const removeLastSize: number = 3;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  /*
   * Not implemented yet
   */
  throw "Known OP word but not implemented yet!";
};

export default OP;
