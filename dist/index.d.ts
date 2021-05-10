import { StackDataList } from "./model";
import opWordCodes from "./constant/opWordCodes";
declare let stackDataList: StackDataList;
declare const parse: (input: string) => StackDataList;
declare const clearStack: () => void;
export { parse, clearStack, opWordCodes, stackDataList };
