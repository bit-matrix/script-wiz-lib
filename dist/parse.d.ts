import WizData from "@script-wiz/wiz-data";
import { ParseResult, WizDataList } from "./model";
import { Opcode } from "./opcodes/model/Opcode";
import { VM } from "./opcodes/model/VM";
export declare const parse: (opWordCodes: Opcode[], stackDataList: WizDataList, currentScopeParse: boolean, currentScopeParseException: boolean, inputHexParam?: string | undefined, inputNumberParam?: number | undefined, inputTextParam?: string | undefined, inputBinParam?: string | undefined, inputOpCodeParam?: string | undefined, version?: VM | undefined, isStackElement?: boolean | undefined) => ParseResult;
export declare const parseValueInputs: (inputHexParam?: string | undefined, inputNumberParam?: number | undefined, inputTextParam?: string | undefined, inputBinParam?: string | undefined) => WizData;
