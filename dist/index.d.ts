import { StackDataList } from "./model";
import * as uu from "./uu/uu";
declare let stackDataList: StackDataList;
declare const parse: (input: string) => StackDataList;
declare const clearStack: () => void;
export { parse, clearStack, stackDataList, uu };
