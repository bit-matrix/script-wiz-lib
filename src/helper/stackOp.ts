import IStackData from "../model/IStackData";
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

const OP = (opCode: string, stackData1: IStackData, stackData2: IStackData): IStackData => {
  if (opCode === "OP_ADD") {
    return OP_ADD(stackData1, stackData2);
  } else {
    throw "Invalid OP code!";
  }
};

export default OP;
