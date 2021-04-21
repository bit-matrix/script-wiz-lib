import { opcodeToData } from ".";
import { IOpWordCode } from "../constant/opWordCodes";
import { StackData, StackDataResult } from "../model";

import * as constants from "./stackOp/constants";
import * as stacks from "./stackOp/stacks";
import * as splices from "./stackOp/splices";
import * as arithmetics from "./stackOp/arithmetics";
import * as cryptos from "./stackOp/cryptos";

const OP = (word: string, stackDataArray: StackData[]): StackDataResult => {
  const opData: IOpWordCode | undefined = opcodeToData(word);
  if (opData === undefined) throw "Unknown OP word!";
  const stackDataArrayLength = stackDataArray.length;

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
    return { dataArray: constants.OP_NUMBER(word, opData), removeLastSize: 0 };
  }

  /*
   * Stack
   * * 107 - 125
   */
  if (word === "OP_2DROP") {
    if (stackDataArrayLength < 2) throw "OP_2DROP Error: stack data array must include min 2 data!";
    return { dataArray: stacks.OP_2DROP(), removeLastSize: 2 };
  }
  if (word === "OP_2DUP") {
    if (stackDataArrayLength < 2) throw "OP_2DUP Error: stack data array must include min 2 data!";
    return { dataArray: stacks.OP_2DUP(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 0 };
  }
  if (word === "OP_3DUP") {
    if (stackDataArrayLength < 3) throw "OP_3DUP Error: stack data array must include min 3 data!";
    return {
      dataArray: stacks.OP_3DUP(stackDataArray[stackDataArrayLength - 3], stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]),
      removeLastSize: 0,
    };
  }
  if (word === "OP_2OVER") {
    if (stackDataArrayLength < 4) throw "OP_2OVER Error: stack data array must include min 4 data!";
    return { dataArray: stacks.OP_2OVER(stackDataArray[stackDataArrayLength - 4], stackDataArray[stackDataArrayLength - 3]), removeLastSize: 0 };
  }
  if (word === "OP_2SWAP") {
    if (stackDataArrayLength < 4) throw "OP_2SWAP Error: stack data array must include min 4 data!";
    return {
      dataArray: stacks.OP_2SWAP(
        stackDataArray[stackDataArrayLength - 1],
        stackDataArray[stackDataArrayLength - 2],
        stackDataArray[stackDataArrayLength - 3],
        stackDataArray[stackDataArrayLength - 4]
      ),
      removeLastSize: 4,
    };
  }
  if (word === "OP_DROP") {
    if (stackDataArrayLength < 1) throw "OP_DROP Error: stack data array must include min 1 data!";
    return { dataArray: stacks.OP_DROP(), removeLastSize: 1 };
  }
  if (word === "OP_DUP") {
    if (stackDataArrayLength < 1) throw "OP_DUP Error: stack data array must include min 1 data!";
    return { dataArray: stacks.OP_DUP(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 0 };
  }
  if (word === "OP_NIP") {
    if (stackDataArrayLength < 2) throw "OP_NIP Error: stack data array must include min 2 data!";
    return { dataArray: stacks.OP_NIP(stackDataArray[stackDataArrayLength - 1], stackDataArray[stackDataArrayLength - 2]), removeLastSize: 2 };
  }
  if (word === "OP_OVER") {
    if (stackDataArrayLength < 2) throw "OP_OVER Error: stack data array must include min 2 data!";
    return { dataArray: stacks.OP_OVER(stackDataArray[stackDataArrayLength - 2]), removeLastSize: 0 };
  }
  if (word === "OP_SWAP") {
    if (stackDataArrayLength < 2) throw "OP_SWAP Error: stack data array must include min 2 data!";
    return { dataArray: stacks.OP_SWAP(stackDataArray[stackDataArrayLength - 1], stackDataArray[stackDataArrayLength - 2]), removeLastSize: 2 };
  }

  /*
   * Splice
   * 126 - 130
   */
  if (word === "OP_CAT") {
    if (stackDataArrayLength < 2) throw "OP_CAT Error: stack data array must include min 2 data!";
    return { dataArray: splices.OP_CAT(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }
  if (word === "OP_SUBSTR") {
    if (stackDataArrayLength < 3) throw "OP_SUBSTR Error: stack data array must include min 3 data!";
    return {
      dataArray: splices.OP_SUBSTR(stackDataArray[stackDataArrayLength - 3], stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]),
      removeLastSize: 3,
    };
  }

  /*
   * Arithmetic
   * 139 - 165
   */
  if (word === "OP_ADD") {
    if (stackDataArrayLength < 2) throw "OP_ADD Error: stack data array must include min 2 data!";
    return { dataArray: arithmetics.OP_ADD(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }
  if (word === "OP_SUB") {
    if (stackDataArrayLength < 2) throw "OP_SUB Error: stack data array must include min 2 data!";
    return { dataArray: arithmetics.OP_SUB(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  /*
   * Crypto
   * 166 - 175
   */
  if (word === "OP_SHA1") {
    if (stackDataArrayLength < 1) throw "OP_SHA1 Error: stack data array must include min 1 data!";
    return { dataArray: cryptos.OP_SHA1(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }
  if (word === "OP_SHA256") {
    if (stackDataArrayLength < 1) throw "OP_SHA256 Error: stack data array must include min 1 data!";
    return { dataArray: cryptos.OP_SHA256(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }
  if (word === "OP_RIPEMD160") {
    if (stackDataArrayLength < 1) throw "OP_RIPEMD160 Error: stack data array must include min 1 data!";
    return { dataArray: cryptos.OP_RIPEMD160(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }
  if (word === "OP_HASH160") {
    if (stackDataArrayLength < 1) throw "OP_HASH160 Error: stack data array must include min 1 data!";
    return { dataArray: cryptos.OP_HASH160(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }
  if (word === "OP_HASH256") {
    if (stackDataArrayLength < 1) throw "OP_HASH256 Error: stack data array must include min 1 data!";
    return { dataArray: cryptos.OP_HASH256(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }

  /*
   * Not implemented yet
   */
  throw "Known OP word but not implemented yet!";
};

export default OP;
