import { StackData } from "../../model";
import stackNumber from "../stackNumber";

const OP_EQUAL = (stackData1: StackData, stackData2: StackData): StackData[] => {
  const expression: boolean = Number(stackData1.byteValue) === Number(stackData2.byteValue);
  if (expression) {
    return [stackNumber("1")];
  }

  return [stackNumber("0")];
};

export { OP_EQUAL };
