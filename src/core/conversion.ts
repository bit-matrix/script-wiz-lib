import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";

const MAX_INTEGER = new BN("7fffffffffffffff", "hex");

export const numToLE64 = (wizData: WizData): WizData => {
  const inputByteLength = wizData.bytes.length;

  if (inputByteLength > 8) throw "Input byte length must be maximum 8 byte";

  if (inputByteLength < 8) {
    const emptyByte = 8 - inputByteLength;
    let i = 0;
    let emptyBytes = [];

    while (i < emptyByte) {
      emptyBytes.push(0);
      i++;
    }

    let mergedArray = new Uint8Array(inputByteLength + emptyBytes.length);
    mergedArray.set(wizData.bytes);
    mergedArray.set(emptyBytes, inputByteLength);

    return WizData.fromBytes(mergedArray);
  }

  return wizData;
};

export const LE64ToNum = (wizData: WizData): WizData => {
  const inputBytes = wizData.bytes;

  if (inputBytes.length !== 8) throw "Input byte length must be equal 8 byte";

  let resultHex = wizData.hex;

  let i = 7;

  while (i >= 0) {
    if (inputBytes[i] > 0) {
      break;
    }

    resultHex = resultHex.slice(0, -2);
    i--;
  }

  return WizData.fromHex(resultHex);
};

export const LE32toLE64 = (wizData: WizData): WizData => {
  if (wizData.bytes.length !== 4) throw "Input byte length must be equal 4 byte";

  return numToLE64(wizData);
};

export const add64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  const addedValue = bigA.add(bigB);

  if (MAX_INTEGER.cmp(addedValue) === -1) {
    throw "Result value must be less than max integer";
  }
  return WizData.fromHex(addedValue.toString("hex"));
};

// LE64TONum alternative
// export const LE64ToNum = (wizData: WizData): WizData => {
//   const inputBytes = wizData.bytes;

//   if (inputBytes.length !== 8) throw "Input byte length must be equal 8 byte";

//   let result = Array.from(inputBytes);

//   let i = 7;

//   while (i >= 0) {
//     if (inputBytes[i] > 0) {
//       break;
//     }

//     result = result.slice(0, -1);
//     i--;
//   }

//   const finalResult = new Uint8Array(result);

//   return WizData.fromBytes(finalResult);
// };
