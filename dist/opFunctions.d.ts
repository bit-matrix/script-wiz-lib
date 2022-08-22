import { ParseResultData, WizDataList } from "./model";
import { Opcode } from "./opcodes/model/Opcode";
import { VM } from ".";
export declare const opFunctions: (word: string, stackDataList: WizDataList, opCodes: Opcode[], vm?: VM | undefined, extension?: any) => ParseResultData;
