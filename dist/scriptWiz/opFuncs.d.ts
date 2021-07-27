import { ParseResultData, WizDataList } from "../model";
import { Opcode } from "../opcodes/model/Opcode";
export declare const opFuncs: (word: string, stackDataList: WizDataList, opCodes: Opcode[]) => ParseResultData;
