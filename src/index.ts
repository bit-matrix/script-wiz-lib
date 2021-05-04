import { StackDataList, ParseResult } from "./model";
import parseToStack from "./parse";

const initialStackDataList: StackDataList = { main: [], alt: [], flow: [true] };
let stackDataList: StackDataList = initialStackDataList;

const parse = (input: string): StackDataList => {
  const parseResult: ParseResult = parseToStack(input, stackDataList);

  // remove item(s) from main stack
  if (parseResult.main.removeLastSize > 0) {
    stackDataList = { ...stackDataList, main: stackDataList.main.slice(0, stackDataList.main.length - parseResult.main.removeLastSize) };
  }

  // remove last item from alternate stack
  if (parseResult.alt.removeLastStackData) {
    stackDataList = { ...stackDataList, alt: stackDataList.alt.slice(0, stackDataList.alt.length - 1) };
  }

  // add item array to main stack
  stackDataList = { ...stackDataList, main: stackDataList.main.concat(parseResult.main.addDataArray) };

  // add item to alternate stack
  if (parseResult.alt.addData) stackDataList = { ...stackDataList, alt: [...stackDataList.alt, parseResult.alt.addData] };

  return stackDataList;
};

const clearStack = () => {
  stackDataList = initialStackDataList;
};

export { parse, clearStack, stackDataList };
