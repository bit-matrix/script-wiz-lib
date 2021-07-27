import { VM } from "./model/VM";
import { Opcode } from "./model/Opcode";
export declare class Opcodes {
    vm: VM;
    data: Opcode[];
    constructor(vm: VM);
    wordData: (word: string) => Opcode | undefined;
    wordCode: (word: string) => number;
    wordHex: (word: string) => string;
    codeData: (code: number) => Opcode | undefined;
    codeWord: (code: number) => string;
}
