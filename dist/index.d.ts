import { StackDataList } from "./model";
import opWordCodes from "./constant/opWordCodes";
import parseFinalInput from "./parseFinalInput";
import compileFinalInput from "./compileFinalInput";
declare let stackDataList: StackDataList;
declare const parse: (input: string) => StackDataList;
declare const clearStack: () => void;
export { compileFinalInput, parse, parseFinalInput, clearStack, opWordCodes, stackDataList };
