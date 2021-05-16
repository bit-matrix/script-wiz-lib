import { StackData } from "../../model";
import stackNumber from "../stackNumber";
import stackHex from "../stackHex";

const OP_INVERT = (stackData: StackData): StackData[] => {
  if (stackData.numberValue !== undefined) return [stackNumber((~Number(stackData.numberValue)).toString())];
  throw "OP_INVERT Error: input is not a number.";
};

const OP_AND = (stackData1: StackData, stackData2: StackData): StackData[] => {
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "OP_AND Error: Script attempted a bitwise operation on operands of different lengths.";
  const number1 = stackData1.numberValue;
  const number2 = stackData2.numberValue;
  if (number1 && number2) {
    const isNegative = number1 < 0 && number2 < 0;
    let logic = Math.abs(number1) & Math.abs(number2);
    logic = isNegative ? logic * -1 : logic;
    return [stackNumber(logic.toString())];
  }
  throw "OP_AND Error: Counld't convert to number";
};

const OP_OR = (stackData1: StackData, stackData2: StackData): StackData[] => {
  const x = stackData1.byteValue;
  const y = stackData2.byteValue;
  if (x.length !== y.length) throw "OP_XOR Error: Script attempted a bitwise operation on operands of different lengths.";

  let resultHex = "0x";

  const xHexArray = x
    .match(/.{1,2}/g)
    ?.slice(1)
    .map((m) => m.toString());
  const yHexArray = y
    .match(/.{1,2}/g)
    ?.slice(1)
    .map((m) => m.toString());
  if (xHexArray && yHexArray) {
    const xorUInt8Array = xHexArray.map((xHex, i) => parseInt(xHex, 16) | parseInt(yHexArray[i], 16));
    const xorHexArray = xorUInt8Array.map((xorUInt8) => xorUInt8.toString(16).padStart(2, "0"));
    resultHex += xorHexArray.join("");
  }
  resultHex = resultHex.padEnd(x.length, "0");

  return [stackHex(resultHex)];
};

/* const OP_OR = (stackData1: StackData, stackData2: StackData): StackData[] => {
  if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "OP_OR Error: Script attempted a bitwise operation on operands of different lengths.";
  const number1 = stackData1.numberValue;
  const number2 = stackData2.numberValue;
  if (number1 && number2) {
    const isNegative = number1 < 0 || number2 < 0;
    let logic = Math.abs(number1) | Math.abs(number2);
    logic = isNegative ? logic * -1 : logic;
    return [stackNumber(logic.toString())];
  }
  throw "OP_OR Error: Counld't convert to number";
}; */

const OP_XOR = (stackData1: StackData, stackData2: StackData): StackData[] => {
  const x = stackData1.byteValue;
  const y = stackData2.byteValue;
  if (x.length !== y.length) throw "OP_XOR Error: Script attempted a bitwise operation on operands of different lengths.";

  let resultHex = "0x";

  const xHexArray = x
    .match(/.{1,2}/g)
    ?.slice(1)
    .map((m) => m.toString());
  const yHexArray = y
    .match(/.{1,2}/g)
    ?.slice(1)
    .map((m) => m.toString());
  if (xHexArray && yHexArray) {
    const xorUInt8Array = xHexArray.map((xHex, i) => parseInt(xHex, 16) ^ parseInt(yHexArray[i], 16));
    const xorHexArray = xorUInt8Array.map((xorUInt8) => xorUInt8.toString(16).padStart(2, "0"));
    resultHex += xorHexArray.join("");
  }
  resultHex = resultHex.padEnd(x.length, "0");

  return [stackHex(resultHex)];
};

// const OP_XOR = (stackData1: StackData, stackData2: StackData): StackData[] => {
//   if (stackData1.byteValue.length !== stackData2.byteValue.length) throw "OP_XOR Error: Script attempted a bitwise operation on operands of different lengths.";
//   const number1 = stackData1.numberValue;
//   const number2 = stackData2.numberValue;

//   if (number1 !== undefined && number2 !== undefined) {
//     const isNegative = number1 * number2 < 0;

//     let logic = Math.abs(number1) ^ Math.abs(number2);
//     logic = isNegative ? logic * -1 : logic;

//     let logicByteValue = stackNumber(logic.toString()).byteValue;

//     //higher than byte
//     if (stackData1.byteValue.length > 4 && stackData1.byteValue.length !== logicByteValue.length) {
//       logicByteValue = logicByteValue + "00";
//     }

//     return [stackHex(logicByteValue)];
//   }
//   throw "OP_XOR Error: Counld't convert to number";
// };

const OP_EQUAL = (stackData1: StackData, stackData2: StackData): StackData[] => {
  const expression = stackData1.byteValue === stackData2.byteValue;

  if (expression) {
    return [stackNumber("1")];
  }

  return [stackNumber("0")];
};

const OP_EQUALVERIFY = (stackData1: StackData, stackData2: StackData): boolean => stackData1.byteValue === stackData2.byteValue;

export { OP_INVERT, OP_AND, OP_OR, OP_XOR, OP_EQUAL, OP_EQUALVERIFY };
