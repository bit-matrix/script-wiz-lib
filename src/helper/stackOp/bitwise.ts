import { StackData } from "../../model";
import stackNumber from "../stackNumber";
import { checkByteValuesEquality } from "../index";
import stackHex from "../stackHex";

const OP_INVERT = (stackData: StackData): StackData[] => {
  if (stackData.numberValue !== undefined) return [stackNumber((~Number(stackData.numberValue)).toString())];
  throw "OP_INVERT Error: input is not a number.";
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
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "OP_XOR Error: Script attempted a bitwise operation on operands of different lengths.";
  const number1 = stackData1.numberValue;
  const number2 = stackData2.numberValue;

  if (number1 !== undefined && number2 !== undefined) {
    const isNegative = number1 * number2 < 0;

    let logic = Math.abs(number1) ^ Math.abs(number2);
    logic = isNegative ? logic * -1 : logic;

    let logicByteValue = stackNumber(logic.toString()).byteValue;

    //higher than byte
    if (stackData1.byteValue.length > 4 && stackData1.byteValue.length !== logicByteValue.length) {
      logicByteValue = logicByteValue + "00";
    }

    return [stackHex(logicByteValue)];
  }
  throw "OP_XOR Error: Counld't convert to number";
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
function hexNumber(logic: number) {
  throw new Error("Function not implemented.");
}
