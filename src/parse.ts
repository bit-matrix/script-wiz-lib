import { opcodeToWord, opWordToHex } from "./helper";
import stackHex from "./helper/stackHex";
import stackNumber from "./helper/stackNumber";
import OP from "./helper/stackOp";
import stackString from "./helper/stackString";
import { StackData, StackDataResult } from "./model";

const parseFinalInput = (input: string): StackData[] => {
  // 0x1245
  // :D
  // "hello"
  // OP_...
  // 12

  // HEX DATA INPUT
  if (input.startsWith("0x")) {
    return [stackHex(input)];
  }

  // EMOJI BY AHMET :)
  // if (input.match(EMOJI_REGEX)) {
  //   const byteValueDisplay = input.replace(/'/g, "");
  //   const charCode = input.charCodeAt(0);
  //   return {
  //     input,
  //     byteValueDisplay,
  //     byteValue: "",
  //   };
  // }

  // STRING INPUT
  if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    const formattedInput = input.substr(1, input.length - 2);
    return [stackString(formattedInput)];
  }

  // OP_DATA INPUT
  if (input.startsWith("OP_")) {
    const hex = opWordToHex(input);
    if (hex === "") throw "ParseFinalInput Error: it is not a valid op word!";
    if (hex === "0x00") return [{ byteValue: "0x00", input: "0x00", byteValueDisplay: "0" }];

    return [stackHex(hex)];
  }

  // NUMBER INPUT
  if (!isNaN(input as any)) {
    return [stackNumber(input)];
  }

  throw "ParseFinalInput Error: it is not a valid final input string!";
};

const parse = (input: string, stackDataArray: StackData[]): StackDataResult => {
  try {
    // Data
    if (input.startsWith("<") && input.endsWith(">")) {
      const finalInput = input.substr(1, input.length - 2);
      const dataArray = parseFinalInput(finalInput);
      return { dataArray, removeLastSize: 0 };
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
  } catch (ex) {
    console.error(ex);
  }

  throw "it is not a valid input script";
};

export default parse;
