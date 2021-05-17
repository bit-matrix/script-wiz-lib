import { EMOJI_REGEX } from "./constant";
import { opWordToHex } from "./helper";
import stackHex from "./helper/stackHex";
import stackNumber from "./helper/stackNumber";
import stackString from "./helper/stackString";
import { StackData } from "./model";

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

  // EMOJI INPUT
  if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    if (input.match(EMOJI_REGEX)) {
      const formattedInput = input.substr(1, input.length - 2);
      // const byteValueDisplay = input.replace(/'/g, "");
      // const charCode = input.charCodeAt(0);
      return [{ input, byteValue: "0xf09f8c8e", byteValueDisplay: formattedInput }];
    }
  }

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

export default parseFinalInput;
