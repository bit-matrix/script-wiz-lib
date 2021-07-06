import WizData from "../convertion";

export const add1 = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    const numberValue: number = wizData.number + 1;
    return WizData.fromNumber(numberValue);
  }

  throw "Error: this operation requires 1 valid number wizData";
};

export const sub1 = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    const numberValue: number = wizData.number - 1;
    return WizData.fromNumber(numberValue);
  }

  throw "Error: this operation requires 1 valid number wizData";
};

export const negate = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    const negateValue: number = wizData.number * -1;
    return WizData.fromNumber(negateValue);
  }

  throw "Error: this operation requires 1 valid number wizData";
};

export const abs = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    const absValue: number = Math.abs(wizData.number);
    return WizData.fromNumber(absValue);
  }

  throw "Error: this operation requires 1 valid number wizData";
};

export const not = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    const isfalse: boolean = !wizData.number;

    return WizData.fromNumber(isfalse ? 1 : 0);
  }

  throw "Error: this operation requires 1 valid number wizData";
};

export const notEqual0 = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    const isfalse: boolean = !wizData.number;

    return WizData.fromNumber(isfalse ? 0 : 1);
  }

  throw "Error: this operation requires 1 valid number wizData";
};

export const add = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    const addedValue: number = wizData.number + wizData2.number;
    return WizData.fromNumber(addedValue);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const sub = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    const subValue: number = wizData.number - wizData2.number;
    return WizData.fromNumber(subValue);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const mul = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    const mulValue: number = wizData.number * wizData2.number;
    return WizData.fromNumber(mulValue);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const div = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    if (wizData2.number === 0) throw "Error: dividing can't be eqaul 0.";

    const divValue: number = wizData.number / wizData2.number;
    return WizData.fromNumber(divValue);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const lshift = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    const lShiftValue: number = wizData.number << wizData2.number;
    return WizData.fromNumber(lShiftValue);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const rshift = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    const rShiftValue: number = wizData.number >> wizData2.number;
    return WizData.fromNumber(rShiftValue);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const boolAnd = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    if (wizData.number === 0 || wizData2.number === 0) return WizData.fromNumber(0);
    return WizData.fromNumber(1);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const boolOr = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    if (wizData.number === 0 && wizData2.number === 0) return WizData.fromNumber(0);
    return WizData.fromNumber(1);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const numEqualVerify = (wizData: WizData, wizData2: WizData): boolean => {
  if (wizData.number !== undefined && wizData2.number !== undefined) return wizData.number === wizData2.number;

  throw "Error: this operation requires 2 valid number wizData";
};

export const numEqual = (wizData: WizData, wizData2: WizData): WizData => {
  const equal = numEqualVerify(wizData, wizData2);
  return WizData.fromNumber(equal ? 1 : 0);
};

export const numNotEqual = (wizData: WizData, wizData2: WizData): WizData => {
  const equal = numEqualVerify(wizData, wizData2);
  return WizData.fromNumber(equal ? 0 : 1);
};

export const lessThan = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    return WizData.fromNumber(wizData.number < wizData2.number ? 1 : 0);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

/* 


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
}; */
