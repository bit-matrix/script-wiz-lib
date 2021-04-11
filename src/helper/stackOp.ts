import IStackData from "../model/IStackData";
import stackNumber from "./stackNumber";

const OP_ADD = (input1: IStackData, input2: IStackData): IStackData => {
  if (input1.numberValue && input2.numberValue) {
    const totalValue: number = input1.numberValue + input2.numberValue;
    return stackNumber(totalValue.toString());
  } else {
    console.error("Invalid input: this operation requires a valid Script Number.");
    throw "Invalid input: this operation requires a valid Script Number.";
  }
};

export { OP_ADD };
