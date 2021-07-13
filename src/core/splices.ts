import WizData from "../convertion";

export const concatenate = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.hex === "" && wizData2.hex === "") return WizData.fromNumber(0);

  return WizData.fromHex(wizData.hex + wizData2.hex);
};

export const substr = (wizData: WizData, wizData2: WizData, wizData3: WizData): WizData => {
  const message = wizData.hex;
  const index = wizData2.number;
  const size = wizData3.number;

  if (index !== undefined && size !== undefined) {
    const result = message.substr(index * 2, size * 2);

    return WizData.fromHex(result);
  }

  throw "Index and size must be number!";
};

const OP_SUBSTR = (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData2.numberValue !== undefined && stackData1.numberValue !== undefined) {
    const resultByteValue = "0x" + stackData3.byteValue.substr(2 + stackData2.numberValue * 2, stackData1.numberValue * 2);

    return [stackHex(resultByteValue)];
  }

  throw "OP_SUBSTR Error: Index and size must be number!";
};

const OP_RIGHT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined) {
    const data = stackData2.byteValue.substr(2);
    const size = stackData1.numberValue * 2;

    if (size < 0) throw "OP_RIGHT Error: Size can't be negative integer!";
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

    if (size < 0) throw "OP_LEFT Error: Size can't be negative integer.!";
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

const OP_SUBSTR_LAZY = (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData2.numberValue !== undefined && stackData1.numberValue !== undefined) {
    let start = stackData2.numberValue * 2;
    let length = stackData1.numberValue * 2;
    const data = stackData3.byteValue.substr(2);
    const dataSize = data.length;

    if (start < 0) start = 0;

    if (length < 0) length = 0;

    if (start >= dataSize) return [stackNumber("0")];

    if (start + length > dataSize) {
      length = dataSize - start;
    }

    const resultByteValue = "0x" + data.substr(start, length);

    return [stackHex(resultByteValue)];
  }

  throw "OP_SUBSTR Error: Index and size must be number!";
};

export { OP_SUBSTR, OP_RIGHT, OP_LEFT, OP_SIZE, OP_SUBSTR_LAZY };
