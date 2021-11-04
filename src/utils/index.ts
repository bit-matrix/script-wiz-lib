import { WizDataList } from "../model";
import { Opcode } from "../opcodes/model/Opcode";
import { BigInteger } from "big-integer";
import bigInt from "big-integer";
import WizData from "@script-wiz/wiz-data";

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

export const log2 = (a: BigInteger) => {
  const s = a.toString(16);
  const c = s.charCodeAt(0) - "0".charCodeAt(0);
  if (c <= 0) {
    throw new RangeError();
  }
  return (s.length - 1) * 4 + (31 - Math.clz32(Math.min(c, 8)));
};

// y^2 = x^3 + 7
export const formattedPubkey = (pubkey: string): WizData => {
  if (pubkey.length !== 64) throw "Pubkey length must be equal 32 byte";

  const pubkeyBigInt: BigInteger = bigInt(pubkey, 16);

  const pubkeyPow = pubkeyBigInt.pow(3);

  const addedPubkey = pubkeyPow.add(bigInt(7));

  const log2Result = log2(addedPubkey);

  if (log2Result % 2 === 0) {
    return WizData.fromHex("02" + pubkey);
  }

  return WizData.fromHex("03" + pubkey);
};

// supports all opcodes
export const currentScope = (wizDataList: WizDataList): boolean => wizDataList.flow[wizDataList.flow.length - 1];
export const EMOJI_REGEX = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
