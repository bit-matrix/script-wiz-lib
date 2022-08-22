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
    parseHex: (input: string, isWitnessElement?: boolean) => void;
    parseNumber: (input: number, isWitnessElement?: boolean) => void;
    parseText: (input: string, isWitnessElement?: boolean) => void;
    parseBin: (input: string, isWitnessElement?: boolean) => void;
    parseOpcode: (input: string, isWitnessElement?: boolean) => void;
    parseTxData: (input?: TxData | undefined) => void;
    assignLabel: (label: string) => void;
    compile: () => string;
    private parseInput;
    private parseResultCommit;
}
