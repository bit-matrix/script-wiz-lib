import IStackData from "../../model/IStackData";
import stackHex from "../stackHex";
import stackNumber from "../stackNumber";

const OP_CAT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  const byteValue = "0x";
  let firstByte1 = stackData2.byteValue.substring(2);
  let firstByte2 = stackData1.byteValue.substring(2);

  firstByte1 = stackData2.byteValue !== "0x00" && firstByte1 === "00" ? "" : firstByte1;

  firstByte2 = stackData1.byteValue !== "0x00" && firstByte2 === "00" ? "" : firstByte2;

  return [stackHex(byteValue + firstByte1 + firstByte2)];
};

const OP_SUBSTR = (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData2.numberValue !== undefined && stackData1.numberValue !== undefined) {
    const resultByteValue = "0x" + stackData3.byteValue.substr(2 + stackData2.numberValue * 2, stackData1.numberValue * 2);
    const stack = stackHex(resultByteValue);
    return [stackHex(resultByteValue)];
  }

  throw "OP_SUBSTR Error: Index and size must be number!";
};

const OP_SIZE = (stackData: IStackData): IStackData[] => {
  const numberValue = stackData.byteValue.substr(2).length / 2;
  return [stackNumber(numberValue.toString())];
};

export { OP_CAT, OP_SUBSTR, OP_SIZE };
