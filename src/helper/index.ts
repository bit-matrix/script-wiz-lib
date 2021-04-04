import { StackData } from "../model";

const maxInteger = 2147483647;

const hexNumber = (number: number): string => {
  let numberHexString = number.toString(16);

  if (numberHexString.length % 2 === 1) {
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

  // 0x123 formatted input => 0x1203
  let formattedInput: string = byteInput;
  if (byteInput.length % 2 === 1) {
    formattedInput = byteInput.substr(0, byteInput.length - 1) + "0" + byteInput.substr(byteInput.length - 1, 1);
  }

  let byteValue: number | string;
  let finalNumberValue: number | undefined = undefined;

  const littleEndianValue = hexLittleEndian(formattedInput);
  const hexNumberValue = parseInt(littleEndianValue);

  if (hexNumberValue <= maxInteger) {
    finalNumberValue = hexNumberValue;
    byteValue = hexNumberValue;
  } else byteValue = formattedInput;

  return { input: byteInput, numberValue: finalNumberValue, byteValue: formattedInput, byteValueDisplay: byteValue.toString() };
};

const fillStackDataNumber = (input: string): StackData => {
  // input      =>  hexNumber     =>  le           =>  display        =>  byteValueDisplay  => byteValue    => numberValue
  // 1          =>  0x01          =>  0x01         =>  1              =>  1                 => 0x01         => 1
  // 2147483647 =>  0x7fffffff    =>  0xffffff7f   =>  2147483647     =>  2147483647        => 0xffffff7f   => 2147483647
  // 2147483648 =>  0x80000000    =>  0x00000080   =>  0x00000008000  =>  0x0000008000      => 0x0000008000 => undefined

  const inputNumber = Number(input);
  const inputHexNumber = hexNumber(inputNumber);
  const littleEndianNumber = hexLittleEndian(inputHexNumber);

  let byteValue: string | number;
  let numberValue: number | undefined = undefined;
  let byteValueDisplay = littleEndianNumber;
  if (inputNumber <= maxInteger) {
    byteValueDisplay = input;
    byteValue = littleEndianNumber;
    numberValue = inputNumber;
  } else {
    byteValueDisplay = littleEndianNumber + "00";
    byteValue = littleEndianNumber + "00";
  }

  return { input, numberValue, byteValueDisplay, byteValue };
};

const fillStackDataString = (input: string): StackData => {
  //  input =>  bytevalue   => byteValueDisplay => inputNumber
  //  ahmet => 0x61686d6574 => ahmet   => 418363827572 // set undefined
  //  umut  => 0x756d7574   => umut    => 1970107764

  const inputHexString = "0x" + hexString(input);
  const inputHexNumber = parseInt(inputHexString);
  let inputNumberValue: number | undefined = undefined;

  if (inputHexNumber <= maxInteger) {
    inputNumberValue = inputHexNumber;
  }

  return { input, byteValue: inputHexString, byteValueDisplay: input, numberValue: inputNumberValue };
};

const parseInput = (input: string): StackData => {
  // 0x1245
  // "hello"
  // 12
  // OP_...

  if (input.startsWith("0x")) {
    console.log("byte data input");
    // byte data
    return fillStackDataByte(input);
  } else if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    // string data

    const formattedInput = input.substr(1, input.length - 2);
    return fillStackDataString(formattedInput);
  } else if (input.startsWith("OP_")) {
    console.log("op data input");
    // op functions
  } else if (!isNaN(input as any)) {
    console.log("number data input");
    // number
    return fillStackDataNumber(input);
  } else {
    console.log("what happend");
    throw "it is not a valid input";
  }

  return { input: "", byteValue: "", byteValueDisplay: "" };
};

// const hexInput = (input: string): StackData => {
//   let value: number;
//   let display: string;

//   if (typeof input === "number") {
//     if (input >= maxInteger) {
//       display = input;
//     } else {
//     }
//     const hexValue = hexNumber(input);
//     display = hexLittleEndian(hexValue);
//     value = input;
//   } else {
//     display = input;
//     // value = hexString(input);
//   }

//   return { input, value, display };
// };

export { fillStackDataByte, fillStackDataNumber, fillStackDataString, hexLittleEndian, hexNumber, hexString, parseInput };
