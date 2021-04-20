import { opcodeToData } from ".";
import { IOpWordCode } from "../constant/opWordCodes";
import { StackData, StackDataResult } from "../model";
import IStackData from "../model/IStackData";
import stackHex from "./stackHex";
import stackNumber from "./stackNumber";

const OP_ADD = (stackData1: IStackData, stackData2: IStackData): IStackData => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const totalValue: number = stackData1.numberValue + stackData2.numberValue;
    return stackNumber(totalValue.toString());
  }

  throw "OP_ADD Error: this operation requires 2 valid number data";
};

const OP_SUB = (stackData2: IStackData, stackData1: IStackData): IStackData => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const totalValue: number = stackData2.numberValue - stackData1.numberValue;
    return stackNumber(totalValue.toString());
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

const OP_CAT = (stackData2: IStackData, stackData1: IStackData): IStackData => {
  const byteValue = "0x";
  let firstByte1 = stackData2.byteValue.substring(2);
  let firstByte2 = stackData1.byteValue.substring(2);

  firstByte1 = firstByte1 === "00" ? "" : firstByte1;
  firstByte2 = firstByte2 === "00" ? "" : firstByte2;

  return stackHex(byteValue + firstByte1 + firstByte2);
};

// stackData 2 index  , stackData 1 size
const OP_SUBSTR = (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData): IStackData => {
  if (stackData3.stringValue !== undefined) {
    if (stackData2.numberValue !== undefined && stackData1.numberValue !== undefined) {
      const resultByteValue = "0x" + stackData3.byteValue.substr(2 + stackData2.numberValue * 2, stackData1.numberValue * 2);
      const stack = stackHex(resultByteValue);
      return stackHex(resultByteValue);
    }

    throw "OP_SUBSTR Error: Index and size must be number!";
  }

  throw "OP_SUBSTR Error: Invalid string value for sub string!";
};

const OP = (word: string, stackDataArray: StackData[]): StackDataResult => {
  const opData: IOpWordCode | undefined = opcodeToData(word);
  if (opData === undefined) throw "Unknown OP word!";

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
    const outputNumber: number = opData.output || 0;
    const stack = stackNumber(outputNumber.toString());
    return { data: { ...stack, input: word }, removeLastSize: 0 };
  }

  const stackDataArrayLength = stackDataArray.length;
  if (word === "OP_ADD") {
    if (stackDataArrayLength < 2) throw "OP_ADD Error: stack data array must include min 2 data!";
    return { data: OP_ADD(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  if (word === "OP_SUB") {
    if (stackDataArrayLength < 2) throw "OP_SUB Error: stack data array must include min 2 data!";
    return { data: OP_SUB(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  if (word === "OP_CAT") {
    if (stackDataArrayLength < 2) throw "OP_CAT Error: stack data array must include min 2 data!";
    return { data: OP_CAT(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  if (word === "OP_SUBSTR") {
    if (stackDataArrayLength < 3) throw "OP_SUBSTR Error: stack data array must include min 3 data!";
    return { data: OP_SUBSTR(stackDataArray[stackDataArrayLength - 3], stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 3 };
  }

  throw "Unknown OP word!";
};

export default OP;
