import { WizDataList } from "../model";
import { Opcodes } from "../opcodes";
import { VM } from "../opcodes/model/VM";
export declare class ScriptWiz {
    vm: VM;
    opCodes: Opcodes;
    stackDataList: WizDataList;
    constructor(vm: VM);
    clearStackDataList: () => void;
    compile: () => string;
    parseInput: (input: string) => void;
}
