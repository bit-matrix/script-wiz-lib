import { StackData } from "../../model";
import stackNumber from "../stackNumber";
import { checkByteValuesEquality } from "../index";

const OP_EQUAL = (stackData1: StackData, stackData2: StackData): StackData[] => {
  const expression = checkByteValuesEquality(stackData1.byteValue, stackData2.byteValue);

  if (expression) {
    return [stackNumber("1")];
  }

  return [stackNumber("0")];
};

const OP_EQUALVERIFY = (stackData1: StackData, stackData2: StackData): boolean => checkByteValuesEquality(stackData1.byteValue, stackData2.byteValue);

export { OP_EQUAL, OP_EQUALVERIFY };
