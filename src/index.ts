import { StackDataList, StackDataResult } from "./model";
import parseToStack from "./parse";

const initialStackDataList: StackDataList = { main: [], alt: [] };
let stackDataList: StackDataList = initialStackDataList;

const parse = (input: string): StackDataList => {
  const stackDataResult: StackDataResult = parseToStack(input, stackDataList.main);
  if (stackDataResult.removeLastSize > 0) {
    stackDataList = { ...stackDataList, main: stackDataList.main.slice(0, stackDataList.main.length - stackDataResult.removeLastSize) };
  }

  stackDataList = { ...stackDataList, main: stackDataList.main.concat(stackDataResult.dataArray) };
  return stackDataList;
};

const clearStack = () => {
  stackDataList = initialStackDataList;
};

export { parse, clearStack, stackDataList };
