import { StackData } from "../../model";
import stackNumber from "../stackNumber";
import { checkByteValuesEquality, invertBits } from "../index";
import stackHex from "../stackHex";

const OP_INVERT = (stackData: StackData): StackData[] => {
  const currentByteValue = stackData.byteValue.substr(2);
  const currentByteValueArray: string[] | null = currentByteValue.match(/..|./g);
  const finalByteValueArray: number[] = [];

  if (currentByteValueArray !== null) {
    currentByteValueArray.forEach((byteValue) => {
      finalByteValueArray.push(invertBits(Number("0x" + byteValue)));
    });
  }

  const finalValue = "0x" + finalByteValueArray.join("");

  return [stackHex(finalValue)];
};

const OP_AND = (stackData1: StackData, stackData2: StackData): StackData[] => {
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "Script attempted a bitwise operation on operands of different lengths.";
  const logic = Number(stackData1.byteValue) & Number(stackData2.byteValue);
  return [stackNumber(logic.toString())];
};

const OP_OR = (stackData1: StackData, stackData2: StackData): StackData[] => {
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "Script attempted a bitwise operation on operands of different lengths.";
  const logic = Number(stackData1.byteValue) | Number(stackData2.byteValue);
  return [stackNumber(logic.toString())];
};

const OP_XOR = (stackData1: StackData, stackData2: StackData): StackData[] => {
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "Script attempted a bitwise operation on operands of different lengths.";
  const logic = Number(stackData1.byteValue) ^ Number(stackData2.byteValue);
  return [stackNumber(logic.toString())];
};

const OP_EQUAL = (stackData1: StackData, stackData2: StackData): StackData[] => {
  const expression = checkByteValuesEquality(stackData1.byteValue, stackData2.byteValue);

  if (expression) {
    return [stackNumber("1")];
  }

  return [stackNumber("0")];
};

const OP_EQUALVERIFY = (stackData1: StackData, stackData2: StackData): boolean => checkByteValuesEquality(stackData1.byteValue, stackData2.byteValue);

export { OP_INVERT, OP_AND, OP_OR, OP_XOR, OP_EQUAL, OP_EQUALVERIFY };
