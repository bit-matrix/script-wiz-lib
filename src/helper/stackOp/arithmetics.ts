import IStackData from "../../model/IStackData";
import stackNumber from "../stackNumber";

const OP_ADD = (stackData1: IStackData, stackData2: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const totalValue: number = stackData1.numberValue + stackData2.numberValue;
    return [stackNumber(totalValue.toString())];
  }

  throw "OP_ADD Error: this operation requires 2 valid number data";
};

const OP_SUB = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const totalValue: number = stackData2.numberValue - stackData1.numberValue;
    return [stackNumber(totalValue.toString())];
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

const OP_LSHIFT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const lShiftValue: number = stackData2.numberValue << stackData1.numberValue;
    return [stackNumber(lShiftValue.toString())];
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

const OP_RSHIFT = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const rShiftValue: number = stackData2.numberValue >> stackData1.numberValue;
    return [stackNumber(rShiftValue.toString())];
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

export { OP_ADD, OP_SUB, OP_LSHIFT, OP_RSHIFT };
