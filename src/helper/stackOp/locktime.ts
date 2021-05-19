import IStackData from "../../model/IStackData";
import stackNumber from "../stackNumber";

const OP_CHECKLOCKTIMEVERIFY = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    return [stackNumber("1")];
  }

  throw "OP_CHECKLOCKTIMEVERIFY Error: Invalid input: this operation requires a valid Script Number";
};

const OP_CHECKSEQUENCEVERIFY = (stackData: IStackData): IStackData[] => {
  if (stackData.numberValue !== undefined) {
    return [stackNumber("1")];
  }

  throw "OP_CHECKSEQUENCEVERIFY Error: Invalid input: this operation requires a valid Script Number";
};

export { OP_CHECKLOCKTIMEVERIFY, OP_CHECKSEQUENCEVERIFY };
