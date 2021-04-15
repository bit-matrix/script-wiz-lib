import { opcodeToWord, opWordToCode } from "./helper";
import stackHex from "./helper/stackHex";
import stackNumber from "./helper/stackNumber";
import OP from "./helper/stackOp";
import stackString from "./helper/stackString";
import { StackData, StackDataResult } from "./model";

const parseFinalInput = (input: string): StackData => {
  // 0x1245
  // :D
  // "hello"
  // OP_...
  // 12

  // HEX DATA INPUT
  if (input.startsWith("0x")) {
    return stackHex(input);
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
    return stackString(formattedInput);
  }

  // OP_DATA INPUT
  if (input.startsWith("OP_")) {
    const opcode = opWordToCode(input);
    if (opcode === -1) throw "ParseFinalInput Error: it is not a valid op word!";
    if (opcode === 0) return { byteValue: "0x00", input: "0x00", numberValue: 0, byteValueDisplay: "0" };

    return stackNumber(opcode.toString());
  }

  // NUMBER INPUT
  if (!isNaN(input as any)) {
    return stackNumber(input);
  }

  throw "ParseFinalInput Error: it is not a valid final input string!";
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
