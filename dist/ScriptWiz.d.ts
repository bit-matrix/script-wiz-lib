import { model } from "@script-wiz/lib-core";
import { WizDataList } from "./model";
import { Opcodes } from "./opcodes";
import { VM } from "./opcodes/model/VM";
export declare class ScriptWiz {
    vm: VM;
    opCodes: Opcodes;
    stackDataList: WizDataList;
    constructor(vm: VM);
    clearStackDataList: () => void;
    parseHex: (input: string) => void;
    parseNumber: (input: number) => void;
    parseText: (input: string) => void;
    parseBin: (input: string) => void;
    parseOpcode: (input: string) => void;
    parseTxData: (input: model.TxData) => void;
    compile: () => string;
    private parseInput;
    private parseResultCommit;
}
