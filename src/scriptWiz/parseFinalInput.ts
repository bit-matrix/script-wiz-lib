import WizData from "../convertion";
import { EMOJI_REGEX } from "../utils";

export const parseFinalInput = (input: string): WizData => {
  // 0x1245
  // :D
  // "hello"
  // OP_...
  // 12

  // HEX DATA INPUT
  if (input.startsWith("0x")) {
    return WizData.fromHex(input);
  }

  // EMOJI INPUT
  if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    if (input.match(EMOJI_REGEX)) {
      const formattedInput = input.substr(1, input.length - 2);
      return WizData.fromHex("f09f8c8e");
    }
  }

  // STRING INPUT
  if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    const formattedInput = input.substr(1, input.length - 2);
    return WizData.fromText(formattedInput);
  }

  // OP_DATA INPUT
  // if (input.startsWith("OP_")) {
  //   const hex = opWordToHex(input);
  //   if (hex === "") throw "ParseFinalInput Error: it is not a valid op word!";
  //   if (hex === "0x00") return { byteValue: "0x00", input: "0x00", byteValueDisplay: "0" };

  //   return stackHex(hex);
  // }

  // NUMBER INPUT
  if (!isNaN(input as any)) {
    return WizData.fromNumber(Number(input));
  }

  throw "ParseFinalInput Error: it is not a valid final input string!";
};
