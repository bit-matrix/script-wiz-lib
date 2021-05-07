import { StackData } from "../../model";
import stackNumber from "../stackNumber";
import { checkByteValuesEquality } from "../index";
import stackHex from "../stackHex";

const OP_INVERT = (stackData: StackData): StackData[] => {
  return [stackNumber((~Number(stackData.byteValue)).toString())];
};

const OP_AND = (stackData1: StackData, stackData2: StackData): StackData[] => {
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "OP_AND Error: Script attempted a bitwise operation on operands of different lengths.";
  const number1 = stackHex(stackData1.byteValue).numberValue;
  const number2 = stackHex(stackData2.byteValue).numberValue;
  if (number1 && number2) {
    const isNegative = number1 < 0 && number2 < 0;
    let logic = Math.abs(number1) & Math.abs(number2);
    logic = isNegative ? logic * -1 : logic;
    return [stackNumber(logic.toString())];
  }
  throw "OP_AND Error: Counld't convert to number";
};

const OP_OR = (stackData1: StackData, stackData2: StackData): StackData[] => {
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "OP_OR Error: Script attempted a bitwise operation on operands of different lengths.";
  const number1 = stackHex(stackData1.byteValue).numberValue;
  const number2 = stackHex(stackData2.byteValue).numberValue;
  if (number1 && number2) {
    const isNegative = number1 < 0 || number2 < 0;
    let logic = Math.abs(number1) | Math.abs(number2);
    logic = isNegative ? logic * -1 : logic;
    return [stackNumber(logic.toString())];
  }

  throw "OP_OR Error: Counld't convert to number";
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
