import { WizDataList } from "../model";
import { Opcode } from "../opcodes/model/Opcode";
import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";
import { convert64 } from "../core/conversion";

export const flipbits = (str: string): string => {
  return str
    .split("")
    .map((b: any) => (1 - b).toString())
    .join("");
};

export const opHexToWord = (hex: string, opWordCodes: Opcode[]): string => {
  const word = opWordCodes.find((owc) => owc.hex === hex)?.word;
  return word || "";
};

export const opcodeToWord = (opcode: number, opWordCodes: Opcode[]): string => {
  return opWordCodes.find((owc) => owc.opcode === opcode)?.word || "";
};

export const opWordToHex = (word: string, opWordCodes: Opcode[]): string => {
  const hex = opWordCodes.find((owc) => owc.word === word)?.hex.substr(2);
  return hex || "";
};

export const toHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

// supports all opcodes
export const currentScope = (wizDataList: WizDataList): boolean => wizDataList.flow[wizDataList.flow.length - 1];
export const EMOJI_REGEX = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;

export const ZERO_64 = new BN(convert64(WizData.fromHex("00")).bin, 2);
export const MAX_INTEGER_64 = new BN("1111111111111111111111111111111111111111111111111111111101111111", 2);
export const MIN_INTEGER_64 = new BN("0000000000000000000000000000000000000000000000000000000010000000", 2);
export const NEGATIVE_1_64 = new BN("0000000000000000000000000000000000000000000000000000000010000001", 2);
