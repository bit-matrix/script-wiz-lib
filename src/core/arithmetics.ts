import WizData from "@script-wiz/wiz-data";

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

    let divValue: number = wizData.number / wizData2.number;

    divValue = divValue > 0 ? Math.floor(divValue) : Math.ceil(divValue);
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

export const numEqual = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    return WizData.fromNumber(wizData.number === wizData2.number ? 1 : 0);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const numEqualVerify = (wizData: WizData, wizData2: WizData): WizData => {
  return numEqual(wizData, wizData2);
};

export const numNotEqual = (wizData: WizData, wizData2: WizData): WizData => {
  const equal = numEqual(wizData, wizData2).number === 1;
  return WizData.fromNumber(equal ? 0 : 1);
};

export const lessThan = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    return WizData.fromNumber(wizData.number < wizData2.number ? 1 : 0);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const graterThan = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    return WizData.fromNumber(wizData.number > wizData2.number ? 1 : 0);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const lessThanOrEqual = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    return WizData.fromNumber(wizData.number <= wizData2.number ? 1 : 0);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const graterThanOrEqual = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    return WizData.fromNumber(wizData.number >= wizData2.number ? 1 : 0);
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const min = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    if (wizData.number >= wizData2.number) return wizData2;

    if (wizData2.number > wizData.number) return wizData;
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const max = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.number !== undefined && wizData2.number !== undefined) {
    if (wizData.number >= wizData2.number) return wizData;

    if (wizData2.number > wizData.number) return wizData2;
  }

  throw "Error: this operation requires 2 valid number wizData";
};

export const withIn = (wizData: WizData, wizData2: WizData, wizData3: WizData): WizData => {
  const currentNumber = wizData.number;
  const minValue = wizData2.number;
  const maxValue = wizData3.number;

  if (currentNumber !== undefined && minValue !== undefined && maxValue !== undefined) {
    if (currentNumber >= minValue && currentNumber <= maxValue) return WizData.fromNumber(1);

    return WizData.fromNumber(0);
  }

  throw "Error: this operation requires 3 valid number wizData";
};
