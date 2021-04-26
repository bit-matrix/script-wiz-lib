import { StackDataList, StackDataResult } from "./model";
import parseToStack from "./parse";

let stackDataList: StackDataList = { main: [], alts: [] };

const parse = (input: string): StackDataList => {
  const stackDataResult: StackDataResult = parseToStack(input, stackDataList.main);
  if (stackDataResult.removeLastSize > 0) {
    stackDataList = { main: stackDataList.main.slice(0, stackDataList.main.length - stackDataResult.removeLastSize), alts: [] };
  }

  stackDataList = { main: stackDataList.main.concat(stackDataResult.dataArray), alts: [] };
  return stackDataList;
};

const clearStack = () => {
  stackDataList = { main: [], alts: [] };
};

export { parse, clearStack, stackDataList };
