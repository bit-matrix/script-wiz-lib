import { EMOJI_REGEX } from "./constant";
import stackHex from "./helper/stackHex";
import stackNumber from "./helper/stackNumber";
import stackString from "./helper/stackString";
import { StackData } from "./model";

const parseFinalInput = (input: string): StackData => {
  // 0x1245
  // "hello"
  // 12
  // OP_...

  if (input.startsWith("0x")) {
    console.log("byte data input");
    // byte data
    return stackHex(input);
  } else if (input.match(EMOJI_REGEX)) {
    const byteValueDisplay = input.replace(/'/g, "");
    //   const charCode = input.charCodeAt(0);
    //   return {
    //     input,
    //     byteValueDisplay,
    //     byteValue: "",
    //   };
  } else if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    // string data

    const formattedInput = input.substr(1, input.length - 2);
    return stackString(formattedInput);
  } else if (input.startsWith("OP_")) {
    console.log("op data input");
    // op functions
  } else if (!isNaN(input as any)) {
    console.log("number data input");
    // number
    return stackNumber(input);
  } else {
    console.log("what happend");
    throw "it is not a valid input";
  }

  return { input: "", byteValue: "", byteValueDisplay: "" };
};

const parse = (input: string): StackData => {
  let finalInput = undefined;
  if (input.startsWith("<") && input.endsWith(">")) {
    finalInput = input.substr(1, input.length - 2);
  } else if (input.startsWith("OP_")) {
    finalInput = input;
  }

  if (finalInput) return parseFinalInput(finalInput);

  throw "it is not a valid input";
};

export default parse;
