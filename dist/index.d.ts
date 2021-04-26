import { StackDataList } from "./model";
declare let stackDataList: StackDataList;
declare const parse: (input: string) => StackDataList;
declare const clearStack: () => void;
export { parse, clearStack, stackDataList };
