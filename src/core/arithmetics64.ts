import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";
import { numToLE64 } from "./conversion";

const MAX_INTEGER = new BN("7fffffffffffffff", "hex");
const MIN_INTEGER = new BN("8000000000000000", "hex");
const BN_ZERO = new BN(0);

export const add64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  if ((bigA.gt(BN_ZERO) && bigB.gt(MAX_INTEGER.sub(bigA))) || (bigA.lt(BN_ZERO) && bigB.lt(MIN_INTEGER.sub(bigA)))) {
    throw "Input values must be greater than min integer and less than max integer";
  } else {
    const addedValue = bigA.add(bigB);

    if (MAX_INTEGER.cmp(addedValue) === -1) {
      throw "Result value must be less than max integer";
    }
    return WizData.fromHex(addedValue.toString("hex"));
  }
};

export const sub64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  if ((bigB.gt(BN_ZERO) && bigA.lt(MIN_INTEGER.add(bigB))) || (bigB.lt(BN_ZERO) && bigA.gt(MAX_INTEGER.add(bigB)))) {
    throw "Input values must be greater than min integer and less than max integer";
  } else {
    const subValue = bigA.sub(bigB);

    if (MAX_INTEGER.cmp(subValue) === -1) {
      throw "Result value must be less than max integer";
    }
    return WizData.fromHex(subValue.toString("hex"));
  }
};

// export const mul64 = (wizData: WizData, wizData2: WizData): WizData => {
//   if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

//   const a = numToLE64(wizData);
//   const b = numToLE64(wizData2);

//   const bigA = new BN(wizData.hex, "hex");
//   const bigB = new BN(wizData.hex, "hex");

//   console.log("bigA", bigA.toString("hex"));
//   console.log("bigB", bigB.toString("hex"));

//   if (
//     (bigA.gt(BN_ZERO) && bigB.gt(BN_ZERO) && bigA.gt(MAX_INTEGER.div(bigB))) ||
//     (bigA.gt(BN_ZERO) && bigB.lt(BN_ZERO) && bigB.lt(MIN_INTEGER.div(bigA))) ||
//     (bigA.lt(BN_ZERO) && bigB.gt(BN_ZERO) && bigA.lt(MIN_INTEGER.div(bigB))) ||
//     (bigA.lt(BN_ZERO) && bigB.lt(BN_ZERO) && bigB.lt(MAX_INTEGER.div(bigA)))
//   ) {
//     throw "Input values must be greater than min integer and less than max integer";
//   } else {
//     const mulValue = bigA.mul(bigB);
//     console.log("mulValue", mulValue.toString("hex"));

//     if (MAX_INTEGER.cmp(mulValue) === -1) {
//       throw "Result value must be less than max integer";
//     }
//     return WizData.fromHex(mulValue.toString("hex"));
//   }
// };

export const lessThan64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.lt(bigB) ? 1 : 0);
};

export const lessThanOrEqual64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.lte(bigB) ? 1 : 0);
};

export const greaterThan64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.gt(bigB) ? 1 : 0);
};

export const greaterThanOrEqual64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.gte(bigB) ? 1 : 0);
};
