import { WizDataList } from "./model";
import { Opcodes } from "./opcodes";
import { VM } from "./opcodes/model/VM";
import { TxData } from "@script-wiz/lib-core";
export declare class ScriptWiz {
    vm: VM;
    opCodes: Opcodes;
    stackDataList: WizDataList;
    extension: any;
    constructor(vm: VM, extension?: any);
    clearStackDataList: () => void;
    parseHex: (input: string, isWitnessElement: boolean | undefined, compileScript: string) => void;
    parseNumber: (input: number, isWitnessElement: boolean | undefined, compileScript: string) => void;
    parseText: (input: string, isWitnessElement: boolean | undefined, compileScript: string) => void;
    parseBin: (input: string, isWitnessElement: boolean | undefined, compileScript: string) => void;
    parseOpcode: (input: string, isWitnessElement: boolean | undefined, compileScript: string) => void;
    parseTxData: (input?: TxData | undefined) => void;
    assignLabel: (label: string) => void;
    compile: () => string;
    private parseInput;
    private parseResultCommit;
}
