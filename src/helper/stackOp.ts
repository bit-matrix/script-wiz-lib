import IStackData from "../model/IStackData";
import stackHex from "./stackHex";
import stackNumber from "./stackNumber";

const OP_ADD = (stackData1: IStackData, stackData2: IStackData): IStackData => {
  if (stackData1.numberValue && stackData2.numberValue) {
    const totalValue: number = stackData1.numberValue + stackData2.numberValue;
    return stackNumber(totalValue.toString());
  } else {
    console.error("Invalid input: this operation requires a valid Script Number.");
    throw "Invalid input: this operation requires a valid Script Number.";
  }
};

const OP_SUB = (stackData1: IStackData, stackData2: IStackData): IStackData => {
  if (stackData1.numberValue && stackData2.numberValue) {
    const totalValue: number = stackData1.numberValue - stackData2.numberValue;
    return stackNumber(totalValue.toString());
  } else {
    console.error("Invalid input: this operation requires a valid Script Number.");
    throw "Invalid input: this operation requires a valid Script Number.";
  }
};

const OP_CAT = (stackData1: IStackData, stackData2: IStackData): IStackData => {
  const byteValue = "0x" + stackData1.byteValue.substring(2) + stackData2.byteValue.substring(2);
  return stackHex(byteValue);
};

const OP = (opCode: string, stackData1: IStackData, stackData2: IStackData): IStackData => {
  if (opCode === "OP_ADD") {
    return OP_ADD(stackData1, stackData2);
  } else if (opCode === "OP_SUB") {
    return OP_SUB(stackData1, stackData2);
  } else if (opCode === "OP_CAT") {
    return OP_CAT(stackData1, stackData2);
  } else {
    throw "Invalid OP code!";
  }
};

export default OP;
