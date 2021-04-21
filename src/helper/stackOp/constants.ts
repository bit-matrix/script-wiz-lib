import { IOpWordCode } from "../../constant/opWordCodes";
import IStackData from "../../model/IStackData";
import stackNumber from "../stackNumber";

const OP_NUMBER = (word: string, opData: IOpWordCode): IStackData[] => {
  const outputNumber: number = opData.output || 0;
  const stack = stackNumber(outputNumber.toString());
  return [{ ...stack, input: word }];
};

export { OP_NUMBER };
