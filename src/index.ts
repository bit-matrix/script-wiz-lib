import { StackDataList, ParseResult } from "./model";
import parseToStack from "./parse";

const initialStackDataList: StackDataList = { main: [], alt: [] };
let stackDataList: StackDataList = initialStackDataList;

const parse = (input: string): StackDataList => {
  const parseResult: ParseResult = parseToStack(input, stackDataList.main);
  if (parseResult.main.removeLastSize > 0) {
    stackDataList = { ...stackDataList, main: stackDataList.main.slice(0, stackDataList.main.length - parseResult.main.removeLastSize) };
  }

  stackDataList = { ...stackDataList, main: stackDataList.main.concat(parseResult.main.addDataArray) };
  return stackDataList;
};

const clearStack = () => {
  stackDataList = initialStackDataList;
};

export { parse, clearStack, stackDataList };
