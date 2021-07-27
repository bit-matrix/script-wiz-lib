import { WizDataList } from "../model";
import { Opcode } from "../opcodes/model/Opcode";
import { VM } from "../opcodes/model/VM";
export declare let opWordCodes: Opcode[];
export declare const init: (version: VM) => void;
export declare const parseInput: (input: string) => WizDataList;
export declare const compileScript: () => string;
export declare const clearStack: () => void;
