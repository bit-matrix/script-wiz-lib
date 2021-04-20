import { IOpWordCode } from "../constant/opWordCodes";
declare const hexLittleEndian: (hex: string) => string;
declare const opcodeToData: (word: string) => IOpWordCode | undefined;
declare const opcodeToWord: (opcode: number) => string;
declare const opWordToCode: (word: string) => number;
declare const opWordToHex: (word: string) => string;
export { hexLittleEndian, opcodeToWord, opcodeToData, opWordToCode, opWordToHex };
