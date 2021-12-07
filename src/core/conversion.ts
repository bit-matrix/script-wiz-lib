import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";

export const convert64 = (wizData: WizData): WizData => {
  const isNegate = wizData.bin.charAt(0) === "1";

  let input = new BN(wizData.bin, 2);

  if (!isNegate) {
    const input64 = input.toString(2, 64);

    return WizData.fromBin(input64);
  } else {
    if (wizData.number) input = new BN(wizData.number || 0);

    const negateValue = input.abs().neg();

    const twosNegateValue = negateValue.toTwos(64);

    const twosNegateValue64 = twosNegateValue.toString(2, 64);

    return WizData.fromBin(twosNegateValue64);
  }
};

export const numToLE64 = (wizData: WizData): WizData => {
  const inputByteLength = wizData.bytes.length;

  if (inputByteLength > 8) throw "Input byte length must be maximum 8 byte";

  return convert64(wizData);
};

export const LE64ToNum = (wizData: WizData): WizData => {
  const inputBytes = wizData.bytes;

  if (inputBytes.length !== 8) throw "Input byte length must be equal 8 byte";

  const inputBN = new BN(wizData.bin, 2);

  const inputBnByteLength = inputBN.byteLength();

  if (wizData.bin.charAt(0) === "1") {
    const binputPos = inputBN.fromTwos(64).abs();

    const inputWizData = WizData.fromBin(binputPos.toString(2, binputPos.byteLength() * 8));

    if (inputWizData.number) {
      return WizData.fromNumber(inputWizData.number * -1);
    }

    return inputWizData;
  }

  return WizData.fromBin(inputBN.toString(2, inputBnByteLength * 8));
};

export const LE32toLE64 = (wizData: WizData): WizData => {
  if (wizData.bytes.length !== 4) throw "Input byte length must be equal 4 byte";

  return numToLE64(wizData);
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
