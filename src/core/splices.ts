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

export const right = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData2.number !== undefined) {
    const message = wizData.hex;
    const size = wizData2.number * 2;

    if (size < 0) throw "Error: Size can't be negative integer!";
    if (message.length < size) throw "Error: Size can't higher than data length!";
    if (size === 0) return WizData.fromNumber(0);

    const result = message.slice(size * -1);

    return WizData.fromHex(result);
  }

  throw "Size must be number!";
};

export const left = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData2.number !== undefined) {
    const message = wizData.hex;
    const size = wizData2.number * 2;

    if (size < 0) throw "Error: Size can't be negative integer.!";
    if (message.length < size) throw "Error: Size can't higher than data length!";
    if (size === 0) WizData.fromNumber(0);

    const result = message.substr(0, size);

    return WizData.fromHex(result);
  }

  throw "Error: Size must be number!";
};

export const size = (wizData: WizData): WizData => {
  const numberValue = wizData.hex.length / 2;
  return WizData.fromNumber(numberValue);
};

export const substrLazy = (wizData: WizData, wizData2: WizData, wizData3: WizData): WizData => {
  if (wizData2.number !== undefined && wizData3.number !== undefined) {
    const message = wizData.hex;
    let index = wizData2.number * 2;
    let length = wizData3.number * 2;

    const messageSize = message.length;

    if (index < 0) index = 0;

    if (length < 0) length = 0;

    if (index >= messageSize) WizData.fromNumber(0);

    if (index + length > messageSize) {
      length = messageSize - index;
    }

    const result = message.substr(index, length);

    return WizData.fromHex(result);
  }

  throw "Error: Index and size must be number!";
};
