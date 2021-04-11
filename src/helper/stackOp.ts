import { StackDataResult } from "../model";
import IStackData from "../model/IStackData";
import stackHex from "./stackHex";
import stackNumber from "./stackNumber";
import stackString from "./stackString";

const OP_ADD = (stackData1: IStackData, stackData2: IStackData): IStackData => {
  if (stackData1.numberValue && stackData2.numberValue) {
    const totalValue: number = stackData1.numberValue + stackData2.numberValue;
    return stackNumber(totalValue.toString());
  } else {
    console.error("Invalid input: this operation requires a valid Script Number.");
    throw "Invalid input: this operation requires a valid Script Number.";
  }
};

const OP_SUB = (stackData2: IStackData, stackData1: IStackData): IStackData => {
  if (stackData2.numberValue && stackData1.numberValue) {
    const totalValue: number = stackData2.numberValue - stackData1.numberValue;
    return stackNumber(totalValue.toString());
  } else {
    console.error("Invalid input: this operation requires a valid Script Number.");
    throw "Invalid input: this operation requires a valid Script Number.";
  }
};

const OP_CAT = (stackData2: IStackData, stackData1: IStackData): IStackData => {
  const byteValue = "0x" + stackData2.byteValue.substring(2) + stackData1.byteValue.substring(2);
  return stackHex(byteValue);
};

// stackData 2 index  , stackData 1 size
const OP_SUBSTR = (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData): IStackData => {
  if (stackData3.stringValue !== undefined) {
    if (stackData2.numberValue && stackData1.numberValue) {
      const resultString: string = stackData3.stringValue.substr(stackData2.numberValue, stackData1.numberValue);
      return stackString(resultString);
    } else {
      console.error("Index and size must be number !");
      throw "Index and size must be number !";
    }
  } else {
    console.error("Data string value undefined !");
    throw "Data string value undefined !";
  }
};

const OP = (opCode: string, stackData1: IStackData, stackData2: IStackData, stackData3?: IStackData): StackDataResult => {
  if (opCode === "OP_ADD") {
    return { data: OP_ADD(stackData2, stackData1), removeLastSize: 2 };
  } else if (opCode === "OP_SUB") {
    return { data: OP_SUB(stackData2, stackData1), removeLastSize: 2 };
  } else if (opCode === "OP_CAT") {
    return { data: OP_CAT(stackData2, stackData1), removeLastSize: 2 };
  } else if (opCode === "OP_SUBSTR" && stackData3) {
    return { data: OP_SUBSTR(stackData3, stackData2, stackData1), removeLastSize: 3 };
  } else {
    throw "Invalid OP code!";
  }
};

export default OP;
