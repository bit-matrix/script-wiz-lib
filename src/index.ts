import { StackData, StackDataResult } from "./model";
import parseToStack from "./parse";

let stackDataArray: StackData[] = [];

const parse = (input: string): StackData[] => {
  const stackDataResult: StackDataResult = parseToStack(input, stackDataArray);
  if (stackDataResult.removeLastSize > 0) {
    stackDataArray = stackDataArray.slice(0, stackDataArray.length - stackDataResult.removeLastSize);
  }
  stackDataArray.push(stackDataResult.data);
  return stackDataArray;
};

const clearStack = () => {
  stackDataArray = [];
};

export { parse, clearStack, stackDataArray };
