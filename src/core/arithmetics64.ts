import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";
import { numToLE64 } from "./conversion";

const MAX_INTEGER = new BN("7fffffffffffffff", "hex");
const MIN_INTEGER = new BN("8000000000000000", "hex");
const BN_ZERO = new BN(0);
const NEGATIVE_1 = new BN(-1);

export const add64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  if ((bigA.gt(BN_ZERO) && bigB.gt(MAX_INTEGER.sub(bigA))) || (bigA.lt(BN_ZERO) && bigB.lt(MIN_INTEGER.sub(bigA)))) {
    // return WizData.fromNumber(0) false
    throw "Result value must be greater than min integer and less than max integer";
  } else {
    const addedValue = bigA.add(bigB);
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
    // return WizData.fromNumber(0) false
    throw "Result values must be greater than min integer and less than max integer";
  } else {
    const subValue = bigA.sub(bigB);
    return WizData.fromHex(subValue.toString("hex"));
  }
};

export const mul64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);
  console.log("a", a.hex);
  console.log("b", b.hex);
  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");
  console.log("xxx", new BN("0002", "hex").toString("hex"));

  console.log("bigA", bigA.toString("hex"));
  console.log("bigB", bigB.toString("hex"));
  console.log("mulValue", bigA.mul(bigB).toString("hex"));

  if (
    (bigA.gt(BN_ZERO) && bigB.gt(BN_ZERO) && bigA.gt(MAX_INTEGER.div(bigB))) ||
    (bigA.gt(BN_ZERO) && bigB.lt(BN_ZERO) && bigB.lt(MIN_INTEGER.div(bigA))) ||
    (bigA.lt(BN_ZERO) && bigB.gt(BN_ZERO) && bigA.lt(MIN_INTEGER.div(bigB))) ||
    (bigA.lt(BN_ZERO) && bigB.lt(BN_ZERO) && bigB.lt(MAX_INTEGER.div(bigA)))
  ) {
    throw "Result value must be greater than min integer and less than max integer";
  } else {
    const mulValue = bigA.mul(bigB);
    console.log("mulValue", mulValue.fromTwos(64));
    const a = WizData.fromHex(mulValue.toString("hex"));
    return numToLE64(a);
  }
};

export const div64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  if (bigB.eq(BN_ZERO) || (bigB.eq(NEGATIVE_1) && bigA.eq(MIN_INTEGER))) {
    throw "Result value must be greater than min integer and less than max integer";
  }
  let r = bigA.mod(bigB);
  let q = bigA.div(bigB);
  if (r.lt(BN_ZERO) && bigB.gt(BN_ZERO)) {
    r = bigB.add(r);
    q = q.sub(new BN(1));
    return WizData.fromHex(q.toString("hex"));
  } else {
    r = r.sub(bigB);
    q = q.add(new BN(1));
    // const bigR = numToLE64(r);
    // const bigQ = numToLE64(q);
    return WizData.fromHex(q.toString("hex"));
  }
};

export const neg64 = (wizData: WizData): WizData => {
  if (wizData.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const bigA = new BN(a.hex, "hex");

  if (bigA.eq(MIN_INTEGER)) throw "Input value must be not equal min integer.";
  console.log("bigA", bigA.toString("hex"));

  const negative1_64 = numToLE64(WizData.fromNumber(-1));
  console.log("negative1_64", negative1_64);

  const negateValue = bigA.mul(new BN(negative1_64.hex, "hex"));

  console.log("negateValue", negateValue.toString());

  console.log("MAX_INTEGER", MAX_INTEGER.toString("hex"));

  return WizData.fromHex(negateValue.toString("hex"));
};

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
