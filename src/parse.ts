import { opcodeToWord } from "./helper";
import stackHex from "./helper/stackHex";
import stackNumber from "./helper/stackNumber";
import OP from "./helper/stackOp";
import stackString from "./helper/stackString";
import { StackData, StackDataResult } from "./model";

const parseFinalInput = (input: string): StackData => {
  // 0x1245
  // "hello"
  // 12
  // OP_...

  // HEX DATA INPUT
  if (input.startsWith("0x")) {
    console.log("byte data input");
    return stackHex(input);
  }
  // else if (input.match(EMOJI_REGEX)) {
  //   const byteValueDisplay = input.replace(/'/g, "");
  //   const charCode = input.charCodeAt(0);
  //   return {
  //     input,
  //     byteValueDisplay,
  //     byteValue: "",
  //   };
  // }
  // STRING INPUT
  else if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    // string data

    const formattedInput = input.substr(1, input.length - 2);
    return stackString(formattedInput);
  }
  // OP_DATA INPUT
  else if (input.startsWith("OP_")) {
    //
    // get number value of OP_ code from const array.
    //
  }
  // NUMBER INPUT
  if (!isNaN(input as any)) {
    console.log("number data input");
    // number
    return stackNumber(input);
  } else {
    console.log("what happend");
    throw "it is not a valid input";
  }

  return { input: "", byteValue: "", byteValueDisplay: "" };
};

const parse = (input: string, stackDataArray: StackData[]): StackDataResult => {
  // Data
  if (input.startsWith("<") && input.endsWith(">")) {
    const finalInput = input.substr(1, input.length - 2);
    const data = parseFinalInput(finalInput);
    return { data, removeLastSize: 0 };
  }

  // OP Word or OP Code
  if (input.startsWith("OP_") || !isNaN(input as any)) {
    // OP Word
    let word = input;
    // Op Code
    if (!isNaN(input as any)) {
      word = opcodeToWord(Number(input));
      if (word === "") throw "Unknown OP code number";
    }

    return OP(word, stackDataArray);
  }

  throw "it is not a valid input script";
};

export default parse;
