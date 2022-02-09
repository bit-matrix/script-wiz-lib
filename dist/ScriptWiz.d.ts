import { WizDataList } from "./model";
import { Opcodes } from "./opcodes";
import { VM } from "./opcodes/model/VM";
import { TxData } from "@script-wiz/lib-core";
export declare class ScriptWiz {
    vm: VM;
    opCodes: Opcodes;
    stackDataList: WizDataList;
    constructor(vm: VM);
    clearStackDataList: () => void;
    parseHex: (input: string, isStackElement?: boolean) => void;
    parseNumber: (input: number, isStackElement?: boolean) => void;
    parseText: (input: string, isStackElement?: boolean) => void;
    parseBin: (input: string, isStackElement?: boolean) => void;
    parseOpcode: (input: string, isStackElement?: boolean) => void;
    parseTxData: (input: TxData) => void;
    compile: () => string;
    private parseInput;
    private parseResultCommit;
}
