import { StackData } from "../model";

const maxInteger = 2147483647;

const hexNumber = (number: number): string => {
  let numberHexString = number.toString(16);

  if (numberHexString.length > 1) {
    numberHexString = "0" + numberHexString;
  }

  return numberHexString;
};

const hexString = (data: string): string => {
  let i: number;

  let result = "";
  for (i = 0; i < data.length; i++) {
    const hex = data.charCodeAt(i).toString(16);
    result += ("0" + hex).slice(-2);
  }

  return result;
};

const hexLittleEndian = (hex: string): string => {
  if (hex.length % 2 === 0) {
    let str = "0x";
    let j = 0;

    if (hex.startsWith("0x")) {
      j = 2;
    }

    for (let i = hex.length; i > j; i -= 2) {
      str += hex.substring(i - 2, i);
    }

    return str;
  } else {
    console.warn("its odd");
    return "something went wrong";
  }
};

const fillStackDataByte = (byteInput: string): StackData => {
  // byteInput
  // 0x1234

  const littleEndianByteData = hexLittleEndian(byteInput);
  // 0x3412
};

const parseInput = (input: string): StackData => {
  // 0x1245
  // "hello"
  // 12
  // OP_...

  if (input.startsWith("0x")) {
    // byte data
    return fillStackDataByte(input);
  } else if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    // string data
  } else if (input.startsWith("OP_")) {
    // op functions
  } else if (!isNaN(input as any)) {
    // number
  } else {
    throw "it is not a valid input";
  }
};

const hexInput = (input: string): StackData => {
  let value: number;
  let display: string;

  if (typeof input === "number") {
    if (input > maxInteger) {
      display = input;
    } else {
    }
    const hexValue = hexNumber(input);
    display = hexLittleEndian(hexValue);
    value = input;
  } else {
    display = input;
    // value = hexString(input);
  }

  return { input, value, display };
};

export { hexLittleEndian, hexNumber, hexString };
