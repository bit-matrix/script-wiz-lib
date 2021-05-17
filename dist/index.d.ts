import { StackDataList } from "./model";
import opWordCodes from "./constant/opWordCodes";
import parseFinalInput from "./parseFinalInput";
import compileFinalInput from "./compileFinalInput";
import { compileData, compileJoin } from "./compileAll";
declare let stackDataList: StackDataList;
declare const parse: (input: string) => StackDataList;
declare const compileScript: () => string;
declare const clearStack: () => void;
export { compileFinalInput, parse, parseFinalInput, clearStack, opWordCodes, stackDataList, compileData, compileJoin, compileScript };
