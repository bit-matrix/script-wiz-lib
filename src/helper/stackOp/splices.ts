import IStackData from "../../model/IStackData";
import stackHex from "../stackHex";
import stackNumber from "../stackNumber";

const OP_CAT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  const byteValue = "0x";
  const emptyByte = "0x00";

  let firstByte1 = stackData2.byteValue.substring(2);
  let firstByte2 = stackData1.byteValue.substring(2);

  firstByte1 = stackData2.byteValue !== emptyByte && firstByte1 === "00" ? "" : firstByte1;

  firstByte2 = stackData1.byteValue !== emptyByte && firstByte2 === "00" ? "" : firstByte2;

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

const OP_RIGHT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined) {
    const data = stackData2.byteValue.substr(2);
    const size = stackData1.numberValue * 2;

    if (size < 0) throw "OP_RIGHT Error: Size must be integer!";
    if (data.length < size) throw "OP_RIGHT Error: Size can't higher than data length!";
    if (size === 0) return [stackNumber("0")];

    const resultByteValue = "0x" + data.slice(size * -1);

    return [stackHex(resultByteValue)];
  }

  throw "OP_RIGHT Error: Size must be number!";
};

const OP_LEFT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined) {
    const data = stackData2.byteValue.substr(2);
    const size = stackData1.numberValue * 2;

    if (size < 0) throw "OP_LEFT Error: Size must be integer!";
    if (data.length < size) throw "OP_LEFT Error: Size can't higher than data length!";
    if (size === 0) return [stackNumber("0")];

    const resultByteValue = "0x" + data.substr(0, size);

    return [stackHex(resultByteValue)];
  }

  throw "OP_LEFT Error: Size must be number!";
};

const OP_SIZE = (stackData: IStackData): IStackData[] => {
  const numberValue = stackData.byteValue.substr(2).length / 2;
  return [stackNumber(numberValue.toString())];
};

export { OP_CAT, OP_SUBSTR, OP_RIGHT, OP_LEFT, OP_SIZE };
