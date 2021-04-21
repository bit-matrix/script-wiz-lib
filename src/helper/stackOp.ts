import { opcodeToData } from ".";
import { IOpWordCode } from "../constant/opWordCodes";
import { StackData, StackDataResult } from "../model";
import IStackData from "../model/IStackData";
import { hash160, hash256, ripemd160, sha1, sha256 } from "./crypto";
import stackHex from "./stackHex";
import stackNumber from "./stackNumber";

const OP_ADD = (stackData1: IStackData, stackData2: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const totalValue: number = stackData1.numberValue + stackData2.numberValue;
    return [stackNumber(totalValue.toString())];
  }

  throw "OP_ADD Error: this operation requires 2 valid number data";
};

const OP_SUB = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const totalValue: number = stackData2.numberValue - stackData1.numberValue;
    return [stackNumber(totalValue.toString())];
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

const OP_CAT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  const byteValue = "0x";
  let firstByte1 = stackData2.byteValue.substring(2);
  let firstByte2 = stackData1.byteValue.substring(2);

  firstByte1 = firstByte1 === "00" ? "" : firstByte1;
  firstByte2 = firstByte2 === "00" ? "" : firstByte2;

  return [stackHex(byteValue + firstByte1 + firstByte2)];
};

// stackData 2 index  , stackData 1 size
const OP_SUBSTR = (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData3.stringValue !== undefined) {
    if (stackData2.numberValue !== undefined && stackData1.numberValue !== undefined) {
      const resultByteValue = "0x" + stackData3.byteValue.substr(2 + stackData2.numberValue * 2, stackData1.numberValue * 2);
      const stack = stackHex(resultByteValue);
      return [stackHex(resultByteValue)];
    }

    throw "OP_SUBSTR Error: Index and size must be number!";
  }

  throw "OP_SUBSTR Error: Invalid string value for sub string!";
};

const OP_SHA1 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + sha1(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_SHA256 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + sha256(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_RIPEMD160 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + ripemd160(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_HASH160 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + hash160(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_HASH256 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + hash256(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_SWAP = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1, stackData2];

const OP_DROP = (): IStackData[] => [];

const OP_2SWAP = (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData, stackData4: IStackData): IStackData[] => [stackData2, stackData1, stackData4, stackData3];

const OP_2DROP = (): IStackData[] => [];

const OP_OVER = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1, stackData2, stackData1];

const OP_DUP = (stackData1: IStackData): IStackData[] => [stackData1];

const OP_2DUP = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1, stackData2];

const OP_3DUP = (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData): IStackData[] => [stackData1, stackData2, stackData3];

const OP_NIP = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1];

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
    return { dataArray: [{ ...stack, input: word }], removeLastSize: 0 };
  }

  const stackDataArrayLength = stackDataArray.length;
  if (word === "OP_ADD") {
    if (stackDataArrayLength < 2) throw "OP_ADD Error: stack data array must include min 2 data!";
    return { dataArray: OP_ADD(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  if (word === "OP_SUB") {
    if (stackDataArrayLength < 2) throw "OP_SUB Error: stack data array must include min 2 data!";
    return { dataArray: OP_SUB(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  if (word === "OP_CAT") {
    if (stackDataArrayLength < 2) throw "OP_CAT Error: stack data array must include min 2 data!";
    return { dataArray: OP_CAT(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  if (word === "OP_SUBSTR") {
    if (stackDataArrayLength < 3) throw "OP_SUBSTR Error: stack data array must include min 3 data!";
    return {
      dataArray: OP_SUBSTR(stackDataArray[stackDataArrayLength - 3], stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]),
      removeLastSize: 3,
    };
  }

  if (word === "OP_SHA1") {
    if (stackDataArrayLength < 1) throw "OP_SHA1 Error: stack data array must include min 1 data!";
    return { dataArray: OP_SHA1(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }

  if (word === "OP_SHA256") {
    if (stackDataArrayLength < 1) throw "OP_SHA256 Error: stack data array must include min 1 data!";
    return { dataArray: OP_SHA256(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }

  if (word === "OP_RIPEMD160") {
    if (stackDataArrayLength < 1) throw "OP_RIPEMD160 Error: stack data array must include min 1 data!";
    return { dataArray: OP_RIPEMD160(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }

  if (word === "OP_HASH160") {
    if (stackDataArrayLength < 1) throw "OP_HASH160 Error: stack data array must include min 1 data!";
    return { dataArray: OP_HASH160(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }

  if (word === "OP_HASH256") {
    if (stackDataArrayLength < 1) throw "OP_HASH256 Error: stack data array must include min 1 data!";
    return { dataArray: OP_HASH256(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 1 };
  }

  if (word === "OP_SWAP") {
    if (stackDataArrayLength < 2) throw "OP_SWAP Error: stack data array must include min 2 data!";
    return { dataArray: OP_SWAP(stackDataArray[stackDataArrayLength - 1], stackDataArray[stackDataArrayLength - 2]), removeLastSize: 2 };
  }

  if (word === "OP_DROP") {
    if (stackDataArrayLength < 1) throw "OP_DROP Error: stack data array must include min 1 data!";
    return { dataArray: OP_DROP(), removeLastSize: 1 };
  }

  if (word === "OP_2SWAP") {
    if (stackDataArrayLength < 4) throw "OP_2SWAP Error: stack data array must include min 4 data!";
    return {
      dataArray: OP_2SWAP(
        stackDataArray[stackDataArrayLength - 1],
        stackDataArray[stackDataArrayLength - 2],
        stackDataArray[stackDataArrayLength - 3],
        stackDataArray[stackDataArrayLength - 4]
      ),
      removeLastSize: 4,
    };
  }

  if (word === "OP_2DROP") {
    if (stackDataArrayLength < 2) throw "OP_2DROP Error: stack data array must include min 2 data!";
    return { dataArray: OP_2DROP(), removeLastSize: 2 };
  }

  if (word === "OP_OVER") {
    if (stackDataArrayLength < 2) throw "OP_OVER Error: stack data array must include min 2 data!";
    return { dataArray: OP_OVER(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 2 };
  }

  if (word === "OP_DUP") {
    if (stackDataArrayLength < 1) throw "OP_DUP Error: stack data array must include min 1 data!";
    return { dataArray: OP_DUP(stackDataArray[stackDataArrayLength - 1]), removeLastSize: 0 };
  }

  if (word === "OP_2DUP") {
    if (stackDataArrayLength < 2) throw "OP_2DUP Error: stack data array must include min 2 data!";
    return { dataArray: OP_2DUP(stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 0 };
  }

  if (word === "OP_3DUP") {
    if (stackDataArrayLength < 3) throw "OP_3DUP Error: stack data array must include min 3 data!";
    return { dataArray: OP_3DUP(stackDataArray[stackDataArrayLength - 3], stackDataArray[stackDataArrayLength - 2], stackDataArray[stackDataArrayLength - 1]), removeLastSize: 0 };
  }

  if (word === "OP_NIP") {
    if (stackDataArrayLength < 2) throw "OP_OVER Error: stack data array must include min 2 data!";
    return { dataArray: OP_NIP(stackDataArray[stackDataArrayLength - 1], stackDataArray[stackDataArrayLength - 2]), removeLastSize: 2 };
  }

  throw "Unknown OP word!";
};

export default OP;
