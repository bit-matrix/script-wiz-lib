import WizData from "../convertion";
import * as arithmetics from "../core/arithmetics";
import * as crypto from "../core/crypto";
import { ParseResultData, WizDataList } from "../model";
import { Opcode } from "../opcodes/model/Opcode";

export const opFuncs = (word: string, stackDataList: WizDataList, opCodes: Opcode[]): ParseResultData => {
  const mainStackDataArray: WizData[] = stackDataList.main;
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
    const currentOpCode = opCodes.find((oc) => oc.word === word);
    const addDataArray: WizData[] = [WizData.fromNumber(currentOpCode?.output || 0)];

    const removeLastSize: number = 0;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  /*
   * Flow control
   * * 97 - 106
   */
  // if (word === "OP_NOP") {
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray: [], removeLastSize }, alt };
  // }
  // if (word === "OP_IF") {
  //   if (mainStackDataArrayLength < 1) throw "OP_IF Error: stack data array must include min 1 data!";

  //   const flows = OP_IF(stackDataList);
  //   const removeLastSize: number = currentScope(stackDataList) ? 1 : 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  // }
  // if (word === "OP_NOTIF") {
  //   if (mainStackDataArrayLength < 1) throw "OP_NOTIF Error: stack data array must include min 1 data!";

  //   const flows = OP_NOTIF(stackDataList);
  //   const removeLastSize: number = currentScope(stackDataList) ? 1 : 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  // }
  // if (word === "OP_ELSE") {
  //   if (stackDataList.flow.length === 1) throw "OP_ELSE Error: Encountered an OP_ELSE outside of an OP_IF ... OP_ENDIF block.!";

  //   const flows = OP_ELSE(stackDataList);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  // }
  // if (word === "OP_ENDIF") {
  //   if (stackDataList.flow.length === 1) throw "OP_ENDIF Error: Encountered an OP_ENDIF which is not following a matching OP_IF.!";

  //   const flows = OP_ENDIF(stackDataList);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray: [], removeLastSize }, alt, flow: flows.flow, altFlow: flows.altFlow };
  // }
  // if (word === "OP_VERIFY") {
  //   if (mainStackDataArray.length < 1) throw "OP_VERIFY Error:  stack data array must include min 1 data!!";

  //   const isVerify = OP_VERIFY(mainStackDataArray[mainStackDataArray.length - 1]);

  //   if (isVerify) {
  //     const addDataArray: StackData[] = [];
  //     const removeLastSize: number = 1;
  //     const alt = { removeLastStackData: false };

  //     return { main: { addDataArray, removeLastSize }, alt };
  //   } else {
  //     return { main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false }, isStackFailed: true };
  //   }
  // }
  // if (word === "OP_RETURN") {
  //   throw "Program called on OP_RETURN operation";
  // }

  /*
   * Stack
   * * 107 - 125
   */
  // if (word === "OP_TOALTSTACK") {
  //   if (mainStackDataArrayLength < 1) throw "OP_TOALTSTACK Error: stack data array must include min 1 data!";
  //   const addDataArray: StackData[] = stacks.OP_TOALTSTACK();
  //   const removeLastSize: number = 1;
  //   const alt = { addData: mainStackDataArray[mainStackDataArrayLength - 1], removeLastStackData: false };
  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_FROMALTSTACK") {
  //   const altStackDataArrayLength = stackDataList.alt.length;
  //   if (altStackDataArrayLength < 1) throw "OP_FROMALTSTACK Error: tried to read from an empty alternate stack.";
  //   const addDataArray: StackData[] = stacks.OP_FROMALTSTACK(stackDataList.alt[stackDataList.alt.length - 1]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: true };
  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_2DROP") {
  //   if (mainStackDataArrayLength < 2) throw "OP_2DROP Error: stack data array must include min 2 data!";
  //   const addDataArray: StackData[] = stacks.OP_2DROP();
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };
  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_2DUP") {
  //   if (mainStackDataArrayLength < 2) throw "OP_2DUP Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = stacks.OP_2DUP(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };
  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_3DUP") {
  //   if (mainStackDataArrayLength < 3) throw "OP_3DUP Error: stack data array must include min 3 data!";

  //   const addDataArray: StackData[] = stacks.OP_3DUP(
  //     mainStackDataArray[mainStackDataArrayLength - 3],
  //     mainStackDataArray[mainStackDataArrayLength - 2],
  //     mainStackDataArray[mainStackDataArrayLength - 1]
  //   );
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };
  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_2OVER") {
  //   if (mainStackDataArrayLength < 4) throw "OP_2OVER Error: stack data array must include min 4 data!";
  //   const addDataArray: StackData[] = stacks.OP_2OVER(mainStackDataArray[mainStackDataArrayLength - 4], mainStackDataArray[mainStackDataArrayLength - 3]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_2SWAP") {
  //   if (mainStackDataArrayLength < 4) throw "OP_2SWAP Error: stack data array must include min 4 data!";
  //   const addDataArray: StackData[] = stacks.OP_2SWAP(
  //     mainStackDataArray[mainStackDataArrayLength - 1],
  //     mainStackDataArray[mainStackDataArrayLength - 2],
  //     mainStackDataArray[mainStackDataArrayLength - 3],
  //     mainStackDataArray[mainStackDataArrayLength - 4]
  //   );
  //   const removeLastSize: number = 4;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_IFDUP") {
  //   if (mainStackDataArrayLength < 1) throw "OP_IFDUP Error: stack data array must include min 1 data!";

  //   const addDataArray: StackData[] = stacks.OP_IFDUP(mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_DEPTH") {
  //   const addDataArray: StackData[] = stacks.OP_DEPTH(mainStackDataArrayLength);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }

  // if (word === "OP_DROP") {
  //   if (mainStackDataArrayLength < 1) throw "OP_DROP Error: stack data array must include min 1 data!";

  //   const addDataArray: StackData[] = stacks.OP_DROP();
  //   const removeLastSize: number = 1;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_DUP") {
  //   if (mainStackDataArrayLength < 1) throw "OP_DUP Error: stack data array must include min 1 data!";
  //   const addDataArray: StackData[] = stacks.OP_DUP(mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_NIP") {
  //   if (mainStackDataArrayLength < 2) throw "OP_NIP Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = stacks.OP_NIP(mainStackDataArray[mainStackDataArrayLength - 1], mainStackDataArray[mainStackDataArrayLength - 2]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_OVER") {
  //   if (mainStackDataArrayLength < 2) throw "OP_OVER Error: stack data array must include min 2 data!";
  //   const addDataArray: StackData[] = stacks.OP_OVER(mainStackDataArray[mainStackDataArrayLength - 2]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_SWAP") {
  //   if (mainStackDataArrayLength < 2) throw "OP_SWAP Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = stacks.OP_SWAP(mainStackDataArray[mainStackDataArrayLength - 1], mainStackDataArray[mainStackDataArrayLength - 2]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_2ROT") {
  //   if (mainStackDataArrayLength < 6) throw "OP_2ROT Error: stack data array must include min 6 data!";

  //   const addDataArray: StackData[] = stacks.OP_2ROT(
  //     mainStackDataArray[mainStackDataArrayLength - 6],
  //     mainStackDataArray[mainStackDataArrayLength - 5],
  //     mainStackDataArray[mainStackDataArrayLength - 4],
  //     mainStackDataArray[mainStackDataArrayLength - 3],
  //     mainStackDataArray[mainStackDataArrayLength - 2],
  //     mainStackDataArray[mainStackDataArrayLength - 1]
  //   );

  //   const removeLastSize: number = 6;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_ROT") {
  //   if (mainStackDataArrayLength < 3) throw "OP_ROT Error: stack data array must include min 3 data!";

  //   const addDataArray: StackData[] = stacks.OP_ROT(
  //     mainStackDataArray[mainStackDataArrayLength - 3],
  //     mainStackDataArray[mainStackDataArrayLength - 2],
  //     mainStackDataArray[mainStackDataArrayLength - 1]
  //   );

  //   const removeLastSize: number = 3;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_PICK") {
  //   if (mainStackDataArrayLength < 2) throw "OP_PICK Error: stack data array must include min 2 data!";

  //   let stackIndex: number | undefined = mainStackDataArray[mainStackDataArrayLength - 1].numberValue;
  //   let willChangedStackDataArray: StackData[] = [...mainStackDataArray];
  //   willChangedStackDataArray.pop();

  //   if (stackIndex !== undefined) {
  //     if (stackIndex >= willChangedStackDataArray.length) throw "OP_PICK Error: stack index cant be equal and greater than stack array length";
  //   } else {
  //     throw "OP_PICK Error: stack index must be a number";
  //   }

  //   const addDataArray: StackData[] = stacks.OP_PICK(willChangedStackDataArray, stackIndex);

  //   const removeLastSize: number = mainStackDataArray.length;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_ROLL") {
  //   if (mainStackDataArrayLength < 2) throw "OP_ROLL Error: stack data array must include min 2 data!";

  //   let stackIndex: number | undefined = mainStackDataArray[mainStackDataArrayLength - 1].numberValue;
  //   let willChangedStackDataArray: StackData[] = [...mainStackDataArray];
  //   willChangedStackDataArray.pop();

  //   if (stackIndex !== undefined) {
  //     if (stackIndex >= willChangedStackDataArray.length) throw "OP_ROLL Error: stack index cant be equal and greater than stack array length";
  //   } else {
  //     throw "OP_ROLL Error: stack index must be a number";
  //   }

  //   const addDataArray: StackData[] = stacks.OP_ROLL(willChangedStackDataArray, stackIndex);

  //   const removeLastSize: number = mainStackDataArray.length;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_TUCK") {
  //   if (mainStackDataArrayLength < 2) throw "OP_TUCK Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = stacks.OP_TUCK(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);

  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }

  /*
   * Splice
   * 126 - 130
   */
  // if (word === "OP_CAT") {
  //   if (mainStackDataArrayLength < 2) throw "OP_CAT Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = splices.OP_CAT(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_SUBSTR") {
  //   if (mainStackDataArrayLength < 3) throw "OP_SUBSTR Error: stack data array must include min 3 data!";

  //   const addDataArray: StackData[] = splices.OP_SUBSTR(
  //     mainStackDataArray[mainStackDataArrayLength - 3],
  //     mainStackDataArray[mainStackDataArrayLength - 2],
  //     mainStackDataArray[mainStackDataArrayLength - 1]
  //   );
  //   const removeLastSize: number = 3;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_RIGHT") {
  //   if (mainStackDataArrayLength < 2) throw "OP_RIGHT Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = splices.OP_RIGHT(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_LEFT") {
  //   if (mainStackDataArrayLength < 2) throw "OP_LEFT Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = splices.OP_LEFT(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_SIZE") {
  //   if (mainStackDataArrayLength < 1) throw "OP_SIZE Error: stack data array must include min 1 data!";
  //   const addDataArray: StackData[] = splices.OP_SIZE(mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_SUBSTR_LAZY") {
  //   if (mainStackDataArrayLength < 3) throw "OP_SUBSTR_LAZY Error: stack data array must include min 3 data!";

  //   const addDataArray: StackData[] = splices.OP_SUBSTR_LAZY(
  //     mainStackDataArray[mainStackDataArrayLength - 3],
  //     mainStackDataArray[mainStackDataArrayLength - 2],
  //     mainStackDataArray[mainStackDataArrayLength - 1]
  //   );
  //   const removeLastSize: number = 3;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }

  /*
   * Bitwise logic
   * 131 - 136
   */

  // if (word === "OP_INVERT") {
  //   if (mainStackDataArrayLength < 1) throw "OP_INVERT Error: stack data array must include min 1 data!";

  //   const addDataArray: StackData[] = OP_INVERT(mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_AND") {
  //   if (mainStackDataArrayLength < 2) throw "OP_AND Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = OP_AND(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_OR") {
  //   if (mainStackDataArrayLength < 2) throw "OP_OR Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = OP_OR(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_XOR") {
  //   if (mainStackDataArrayLength < 2) throw "OP_XOR Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = OP_XOR(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_EQUAL") {
  //   if (mainStackDataArrayLength < 2) throw "OP_EQUAL Error: stack data array must include min 2 data!";

  //   const addDataArray: StackData[] = OP_EQUAL(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
  //   const removeLastSize: number = 2;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt };
  // }
  // if (word === "OP_EQUALVERIFY") {
  //   if (mainStackDataArray.length < 2) throw "OP_EQUALVERIFY Error:  stack data array must include min 2 data!!";

  //   const isVerify = OP_EQUALVERIFY(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);

  //   if (isVerify) {
  //     const addDataArray: StackData[] = [];
  //     const removeLastSize: number = 2;
  //     const alt = { removeLastStackData: false };

  //     return { main: { addDataArray, removeLastSize }, alt };
  //   } else {
  //     return { main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false }, isStackFailed: true };
  //   }
  // }

  /*
   * Arithmetic
   * 139 - 165
   */
  if (word === "OP_1ADD") {
    if (mainStackDataArrayLength < 1) throw "OP_1ADD Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [arithmetics.add1(mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_1SUB") {
    if (mainStackDataArrayLength < 1) throw "OP_1SUB Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [arithmetics.sub1(mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_NEGATE") {
    if (mainStackDataArrayLength < 1) throw "OP_NEGATE Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [arithmetics.negate(mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_ABS") {
    if (mainStackDataArrayLength < 1) throw "OP_ABS Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [arithmetics.abs(mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_NOT") {
    if (mainStackDataArrayLength < 1) throw "OP_NOT Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [arithmetics.not(mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_0NOTEQUAL") {
    if (mainStackDataArrayLength < 1) throw "OP_0NOTEQUAL Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [arithmetics.notEqual0(mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_ADD") {
    if (mainStackDataArrayLength < 2) throw "OP_ADD Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.add(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_SUB") {
    if (mainStackDataArrayLength < 2) throw "OP_SUB Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.sub(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_MUL") {
    if (mainStackDataArrayLength < 2) throw "OP_MUL Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.mul(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_DIV") {
    if (mainStackDataArrayLength < 2) throw "OP_DIV Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.div(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_LSHIFT") {
    if (mainStackDataArrayLength < 2) throw "OP_LSHIFT Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.lshift(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_RSHIFT") {
    if (mainStackDataArrayLength < 2) throw "OP_RSHIFT Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.rshift(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_BOOLAND") {
    if (mainStackDataArrayLength < 2) throw "OP_BOOLAND Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.boolAnd(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_BOOLOR") {
    if (mainStackDataArrayLength < 2) throw "OP_BOOLOR Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.boolOr(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_NUMEQUAL") {
    if (mainStackDataArrayLength < 2) throw "OP_NUMEQUAL Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.numEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_NUMEQUALVERIFY") {
    if (mainStackDataArrayLength < 2) throw "OP_NUMEQUALVERIFY Error: stack data array must include min 2 data!";

    const isVerifed: boolean = arithmetics.numEqualVerify(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]).number === 1;
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray: [], removeLastSize }, alt, isStackFailed: !isVerifed };
  }

  if (word === "OP_NUMNOTEQUAL") {
    if (mainStackDataArrayLength < 2) throw "OP_NUMNOTEQUAL Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.numNotEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_LESSTHAN") {
    if (mainStackDataArrayLength < 2) throw "OP_LESSTHAN Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.lessThan(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_GREATERTHAN") {
    if (mainStackDataArrayLength < 2) throw "OP_GREATERTHAN Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.graterThan(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_LESSTHANOREQUAL") {
    if (mainStackDataArrayLength < 2) throw "OP_LESSTHANOREQUAL Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.lessThanOrEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_GREATERTHANOREQUAL") {
    if (mainStackDataArrayLength < 2) throw "OP_GREATERTHANOREQUAL Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.graterThanOrEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_MIN") {
    if (mainStackDataArrayLength < 2) throw "OP_MIN Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.min(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_MAX") {
    if (mainStackDataArrayLength < 2) throw "OP_MAX Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [arithmetics.max(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_WITHIN") {
    if (mainStackDataArrayLength < 3) throw "OP_WITHIN Error: stack data array must include min 3 data!";

    const addDataArray: WizData[] = [
      arithmetics.withIn(
        mainStackDataArray[mainStackDataArrayLength - 3], // x
        mainStackDataArray[mainStackDataArrayLength - 2], // min
        mainStackDataArray[mainStackDataArrayLength - 1] // max
      ),
    ];

    const removeLastSize: number = 3;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  /*
   * Crypto
   * 166 - 175
   */
  if (word === "OP_SHA1") {
    if (mainStackDataArrayLength < 1) throw "OP_SHA1 Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [WizData.fromHex(crypto.sha1(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_SHA256") {
    if (mainStackDataArrayLength < 1) throw "OP_SHA256 Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [WizData.fromHex(crypto.sha256(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_RIPEMD160") {
    if (mainStackDataArrayLength < 1) throw "OP_RIPEMD160 Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [WizData.fromHex(crypto.ripemd160(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_HASH160") {
    if (mainStackDataArrayLength < 1) throw "OP_HASH160 Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [WizData.fromHex(crypto.hash160(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_HASH256") {
    if (mainStackDataArrayLength < 1) throw "OP_HASH256 Error: stack data array must include min 1 data!";

    const addDataArray: WizData[] = [WizData.fromHex(crypto.hash256(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
    const removeLastSize: number = 1;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_CHECKSIG") {
    if (mainStackDataArrayLength < 2) throw "OP_CHECKSIG Error: stack data array must include min 2 data!";

    const addDataArray: WizData[] = [crypto.checkSig(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_CHECKSIGVERIFY") {
    if (mainStackDataArrayLength < 2) throw "OP_CHECKSIGVERIFY Error: stack data array must include min 2 data!";

    let isStackFailed: boolean = false;

    const checkSigResult: WizData = crypto.checkSig(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
    const removeLastSize: number = 2;
    const alt = { removeLastStackData: false };

    if (checkSigResult.number === 0) isStackFailed = true;

    return { main: { addDataArray: [], removeLastSize }, alt, isStackFailed };
  }

  if (word === "OP_CHECKSIGFROMSTACK") {
    if (mainStackDataArrayLength < 3) throw "OP_CHECKSIGFROMSTACK Error: stack data array must include min 3 data!";

    const addDataArray: WizData[] = [
      crypto.ecdsaVerify(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]),
    ];

    const removeLastSize: number = 3;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray, removeLastSize }, alt };
  }

  if (word === "OP_CHECKSIGFROMSTACKVERIFY") {
    if (mainStackDataArrayLength < 3) throw "OP_CHECKSIGFROMSTACKVERIFY Error: stack data array must include min 3 data!";
    let isStackFailed: boolean = false;

    const verifyResult: WizData = crypto.ecdsaVerify(
      mainStackDataArray[mainStackDataArrayLength - 3],
      mainStackDataArray[mainStackDataArrayLength - 2],
      mainStackDataArray[mainStackDataArrayLength - 1]
    );

    if (verifyResult.number === 0) isStackFailed = true;

    const removeLastSize: number = 3;
    const alt = { removeLastStackData: false };

    return { main: { addDataArray: [], removeLastSize }, alt, isStackFailed };
  }

  /*
   * Locktime
   * 177 - 178
   */
  // if (word === "OP_CHECKLOCKTIMEVERIFY") {
  //   if (mainStackDataArrayLength < 1) throw "OP_CHECKLOCKTIMEVERIFY Error: stack data array must include min 1 data!";
  //   let isStackFailed: boolean = false;

  //   const addDataArray: StackData[] = locktime.OP_CHECKLOCKTIMEVERIFY(mainStackDataArray[mainStackDataArrayLength - 1]);

  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt, isStackFailed };
  // }

  // if (word === "OP_CHECKSEQUENCEVERIFY") {
  //   if (mainStackDataArrayLength < 1) throw "OP_CHECKSEQUENCEVERIFY Error: stack data array must include min 1 data!";
  //   let isStackFailed: boolean = false;

  //   const addDataArray: StackData[] = locktime.OP_CHECKSEQUENCEVERIFY(mainStackDataArray[mainStackDataArrayLength - 1]);

  //   const removeLastSize: number = 0;
  //   const alt = { removeLastStackData: false };

  //   return { main: { addDataArray, removeLastSize }, alt, isStackFailed };
  // }

  /*
   * Not implemented yet
   */
  throw "Known OP word but not implemented yet!";
};