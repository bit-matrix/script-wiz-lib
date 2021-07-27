import { ParseResult, WizDataList } from "../model";
import { Opcode } from "../opcodes/model/Opcode";
export declare const parse: (input: string, opWordCodes: Opcode[], stackDataList: WizDataList, currentScopeParse: boolean, currentScopeParseException: boolean) => ParseResult;
