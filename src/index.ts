import { StackData, StackDataResult } from "./model";
import parseToStack from "./parse";

let stackDataArray: StackData[] = [];

const parse = (input: string): StackData[] => {
  const stackDataResult: StackDataResult = parseToStack(input, stackDataArray);
  if (stackDataResult.removeLastTwo) {
    stackDataArray = stackDataArray.slice(0, stackDataArray.length - 2);
  }
  stackDataArray.push(stackDataResult.data);
  return stackDataArray;
};

const clearStack = () => {
  stackDataArray = [];
};

export { parse, clearStack, stackDataArray };
