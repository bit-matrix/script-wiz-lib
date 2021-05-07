import IStackData from "../../model/IStackData";
import stackNumber from "../stackNumber";

const OP_1ADD = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    const totalValue: number = stackData.numberValue + 1;
    return [stackNumber(totalValue.toString())];
  }

  throw "OP_1ADD Error: this operation requires 1 valid number data";
};

const OP_1SUB = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    const totalValue: number = stackData.numberValue - 1;
    return [stackNumber(totalValue.toString())];
  }

  throw "OP_1SUB Error: this operation requires 1 valid number data";
};

const OP_NEGATE = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    const totalValue: number = stackData.numberValue * -1;
    return [stackNumber(totalValue.toString())];
  }

  throw "OP_NEGATE Error: this operation requires 1 valid number data";
};

const OP_ABS = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    const totalValue: number = Math.abs(stackData.numberValue);

    return [stackNumber(totalValue.toString())];
  }

  throw "OP_ABS Error: this operation requires 1 valid number data";
};

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

const OP_MUL = (stackData1: IStackData, stackData2: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    const mulValue: number = stackData1.numberValue * stackData2.numberValue;
    return [stackNumber(mulValue.toString())];
  }

  throw "OP_MUL Error: this operation requires 2 valid number data";
};

const OP_DIV = (stackData1: IStackData, stackData2: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData2.numberValue === 0) throw "OP_DIV Error: dividing can't be eqaul 0.";

    const divValue: number = stackData1.numberValue / stackData2.numberValue;
    return [stackNumber(divValue.toString())];
  }

  throw "OP_DIV Error: this operation requires 2 valid number data";
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

const OP_GREATERTHANOREQUAL = (stackData1: IStackData, stackData2: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData1.numberValue >= stackData2.numberValue) {
      return [stackNumber("1")];
    }

    return [stackNumber("0")];
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

export { OP_1ADD, OP_1SUB, OP_NEGATE, OP_ABS, OP_ADD, OP_SUB, OP_MUL, OP_DIV, OP_LSHIFT, OP_RSHIFT, OP_GREATERTHANOREQUAL };
