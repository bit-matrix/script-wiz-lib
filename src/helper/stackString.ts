import { MAX_INTEGER } from "../constant";
import { StackData } from "../model";

const hexString = (data: string): string => {
  let i: number;

  let result = "";
  for (i = 0; i < data.length; i++) {
    const hex = data.charCodeAt(i).toString(16);
    result += ("0" + hex).slice(-2);
  }

  return result;
};

const stackString = (input: string): StackData => {
  //  input =>  bytevalue   => byteValueDisplay => inputNumber
  //  ahmet => 0x61686d6574 => ahmet   => 418363827572 // set undefined
  //  umut  => 0x756d7574   => umut    => 1970107764

  const inputHexString = "0x" + hexString(input);
  const inputHexNumber = parseInt(inputHexString);
  let inputNumberValue: number | undefined = undefined;

  if (inputHexNumber <= MAX_INTEGER) {
    inputNumberValue = inputHexNumber;
  }

  return {
    input,
    byteValue: inputHexString,
    byteValueDisplay: input,
    numberValue: inputNumberValue,
    stringValue: input,
  };
};

// const fillStackDataEmoji = (input: string): StackData => {
//   const byteValueDisplay = input.replace(/'/g, "");
//   const charCode = input.charCodeAt(0);
//   return {
//     input,
//     byteValueDisplay,
//     byteValue: "",
//   };
// };

export default stackString;
