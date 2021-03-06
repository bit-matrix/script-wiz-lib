import { WizDataList } from "../model";
import { Opcode } from "../opcodes/model/Opcode";
export declare const opHexToWord: (hex: string, opWordCodes: Opcode[]) => string;
export declare const opcodeToWord: (opcode: number, opWordCodes: Opcode[]) => string;
export declare const opWordToHex: (word: string, opWordCodes: Opcode[]) => string;
export declare const currentScope: (wizDataList: WizDataList) => boolean;
export declare const EMOJI_REGEX: RegExp;
