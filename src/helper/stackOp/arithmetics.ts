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

const OP_NOT = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    const isNotTrue: boolean = !stackData.numberValue;

    if (isNotTrue) return [stackNumber("1")];
    return [stackNumber("0")];
  }

  throw "OP_NOT Error: this operation requires 1 valid number data";
};

const OP_0NOTEQUAL = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    const isNotTrue: boolean = !stackData.numberValue;

    if (!isNotTrue) return [stackNumber("1")];
    return [stackNumber("0")];
  }

  throw "OP_0NOTEQUAL Error: this operation requires 1 valid number data";
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

const OP_BOOLAND = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData1.numberValue === 0 || stackData2.numberValue === 0) {
      return [stackNumber("0")];
    }
    return [stackNumber("1")];
  }

  throw "OP_BOOLAND Error: this operation requires 2 valid number data";
};

const OP_BOOLOR = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData1.numberValue === 0 && stackData2.numberValue === 0) {
      return [stackNumber("0")];
    }
    return [stackNumber("1")];
  }

  throw "OP_BOOLOR Error: this operation requires 2 valid number data";
};

const OP_NUMEQUAL = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData1.numberValue === stackData2.numberValue) {
      return [stackNumber("1")];
    }
    return [stackNumber("0")];
  }

  throw "OP_NUMEQUAL Error: this operation requires 2 valid number data";
};

const OP_NUMEQUALVERIFY = (stackData2: IStackData, stackData1: IStackData): boolean => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    return stackData1.numberValue === stackData2.numberValue;
  }

  throw "OP_NUMEQUALVERIFY Error: this operation requires 2 valid number data";
};

const OP_NUMNOTEQUAL = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData1.numberValue !== stackData2.numberValue) {
      return [stackNumber("1")];
    }
    return [stackNumber("0")];
  }

  throw "OP_NUMNOTEQUAL Error: this operation requires 2 valid number data";
};

const OP_LESSTHAN = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData1.numberValue > stackData2.numberValue) {
      return [stackNumber("1")];
    }
    return [stackNumber("0")];
  }

  throw "OP_LESSTHAN Error: this operation requires 2 valid number data";
};

const OP_GREATERTHAN = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData2.numberValue > stackData1.numberValue) {
      return [stackNumber("1")];
    }
    return [stackNumber("0")];
  }

  throw "OP_GREATERTHAN Error: this operation requires 2 valid number data";
};

const OP_LESSTHANOREQUAL = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData1.numberValue >= stackData2.numberValue) {
      return [stackNumber("1")];
    }

    return [stackNumber("0")];
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

const OP_GREATERTHANOREQUAL = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData2.numberValue >= stackData1.numberValue) {
      return [stackNumber("1")];
    }

    return [stackNumber("0")];
  }

  throw "OP_SUB Error: this operation requires 2 valid number data";
};

const OP_MIN = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData2.numberValue >= stackData1.numberValue) return [stackData1];

    if (stackData1.numberValue > stackData2.numberValue) return [stackData2];
  }

  throw "OP_MIN Error: this operation requires 2 valid number data";
};

const OP_MAX = (stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  if (stackData1.numberValue !== undefined && stackData2.numberValue !== undefined) {
    if (stackData2.numberValue >= stackData1.numberValue) return [stackData2];

    if (stackData1.numberValue > stackData2.numberValue) return [stackData1];
  }

  throw "OP_MAX Error: this operation requires 2 valid number data";
};

const OP_WITHIN = (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData): IStackData[] => {
  const currentNumber = stackData3.numberValue;
  const minValue = stackData2.numberValue;
  const maxValue = stackData1.numberValue;

  if (currentNumber !== undefined && minValue !== undefined && maxValue !== undefined) {
    if (currentNumber >= minValue && currentNumber <= maxValue) return [stackNumber("1")];

    return [stackNumber("0")];
  }

  throw "OP_WITHIN Error: this operation requires 3 valid number data";
};

export {
  OP_1ADD,
  OP_1SUB,
  OP_NEGATE,
  OP_ABS,
  OP_NOT,
  OP_0NOTEQUAL,
  OP_ADD,
  OP_SUB,
  OP_MUL,
  OP_DIV,
  OP_LSHIFT,
  OP_RSHIFT,
  OP_BOOLAND,
  OP_BOOLOR,
  OP_NUMEQUAL,
  OP_NUMEQUALVERIFY,
  OP_NUMNOTEQUAL,
  OP_LESSTHAN,
  OP_GREATERTHAN,
  OP_LESSTHANOREQUAL,
  OP_GREATERTHANOREQUAL,
  OP_MIN,
  OP_MAX,
  OP_WITHIN,
};
