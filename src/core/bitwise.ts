import WizData from "@script-wiz/wiz-data";
import { flipbits } from "../utils";

export const invert = (wizData: WizData): WizData => {
  const complement = flipbits(wizData.bin);

  return WizData.fromBin(complement);
};

export const and = (wizData: WizData, wizData2: WizData): WizData => {
  const fBinary = wizData.bin;
  const sBinary = wizData2.bin;

  if (fBinary.length === sBinary.length) {
    const fBinaryArray = fBinary.split("").map((x) => +x);
    const sBinaryArray = sBinary.split("").map((x) => +x);
    let resultBinary: string = "";

    for (let i in fBinaryArray) {
      resultBinary += fBinaryArray[i] & sBinaryArray[i];
    }

    return WizData.fromBin(resultBinary);
  }

  // stack bump
  throw "Bitwise operation on operands of different lengths.";
};

export const or = (wizData: WizData, wizData2: WizData): WizData => {
  const fBinary = wizData.bin;
  const sBinary = wizData2.bin;

  if (fBinary.length === sBinary.length) {
    const fBinaryArray = fBinary.split("").map((x) => +x);
    const sBinaryArray = sBinary.split("").map((x) => +x);
    let resultBinary: string = "";

    for (let i in fBinaryArray) {
      resultBinary += fBinaryArray[i] | sBinaryArray[i];
    }

    return WizData.fromBin(resultBinary);
  }

  // stack bump
  throw "Bitwise operation on operands of different lengths.";
};

export const xor = (wizData: WizData, wizData2: WizData): WizData => {
  const fBinary = wizData.bin;
  const sBinary = wizData2.bin;

  if (fBinary.length === sBinary.length) {
    const fBinaryArray = fBinary.split("").map((x) => +x);
    const sBinaryArray = sBinary.split("").map((x) => +x);
    let resultBinary: string = "";

    for (let i in fBinaryArray) {
      resultBinary += fBinaryArray[i] ^ sBinaryArray[i];
    }

    return WizData.fromBin(resultBinary);
  }

  // stack bump
  throw "Bitwise operation on operands of different lengths.";
};

export const equal = (wizData: WizData, wizData2: WizData): WizData => {
  const expression = wizData.hex === wizData2.hex && wizData.bin === wizData2.bin;
  return WizData.fromNumber(expression ? 1 : 0);
};
