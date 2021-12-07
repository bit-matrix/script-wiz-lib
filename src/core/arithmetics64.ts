import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";
import { MAX_INTEGER_64, MIN_INTEGER_64, NEGATIVE_1_64, ZERO_64 } from "../utils";
import { convert64, numToLE64 } from "./conversion";

export const add64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  const isANeg = a.toString(2).charAt(0) === "1";

  if ((!isANeg && b.gt(MAX_INTEGER_64.sub(a))) || (isANeg && b.lt(MIN_INTEGER_64.sub(a)))) {
    return [WizData.fromNumber(0)];
  } else {
    const addedValue = a.add(b);
    const addedValueBin = addedValue.toString(2, 64);
    const modifiedAddedValueBin = addedValueBin.slice(-64);

    return [WizData.fromBin(modifiedAddedValueBin), WizData.fromNumber(1)];
  }
};

export const sub64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  const isBNeg = b.toString(2).charAt(0) === "1";

  if ((!isBNeg && a.lt(MIN_INTEGER_64.add(b))) || (isBNeg && a.gt(MAX_INTEGER_64.add(b)))) {
    return [WizData.fromNumber(0)];
  } else {
    const subValue = a.sub(b);

    let subValueBin = subValue.toString(2, 64);
    if (subValue.isNeg()) subValueBin = subValue.toTwos(64).toString(2, 64);

    const modifiedSubValueBin = subValueBin.slice(-64);

    return [WizData.fromBin(modifiedSubValueBin), WizData.fromNumber(1)];
  }
};

export const mul64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length !== 8 || wizData2.bytes.length !== 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  const isANeg = a.toString(2).charAt(0) === "1";

  if (
    (!isANeg && b.gt(ZERO_64) && a.gt(MAX_INTEGER_64.div(b))) ||
    (!isANeg && b.lt(ZERO_64) && b.lt(MIN_INTEGER_64.div(a))) ||
    (isANeg && b.gt(ZERO_64) && a.lt(MIN_INTEGER_64.div(b))) ||
    (isANeg && b.lt(ZERO_64) && b.lt(MAX_INTEGER_64.div(a)))
  ) {
    return [WizData.fromNumber(0)];
  } else {
    const mulValue = a.mul(b);
    let mulValueBin = mulValue.toString(2, 64);
    const modifiedMulValueBin = mulValueBin.slice(-64);

    return [WizData.fromBin(modifiedMulValueBin), WizData.fromNumber(1)];
  }
};

export const div64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  if (b.eq(ZERO_64) || (b.eq(NEGATIVE_1_64) && a.eq(MIN_INTEGER_64))) {
    return [WizData.fromNumber(0)];
  }

  let r = a.mod(b);
  let q = a.div(b);

  if (r.lt(ZERO_64) && b.gt(ZERO_64)) {
    r = r.add(b);
    q = q.sub(new BN(1));
  } else if (r.lt(ZERO_64) && b.lt(ZERO_64)) {
    r = r.sub(b);
    q = q.add(new BN(1));
  }

  return [WizData.fromBin(r.toString(2, 64)), WizData.fromBin(q.toString(2, 64)), WizData.fromNumber(1)];
};

export const neg64 = (wizData: WizData): WizData[] => {
  if (wizData.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const data = new BN(wizData.bin, 2);

  if (data.eq(MIN_INTEGER_64)) return [WizData.fromNumber(0)];

  const negateValue = data.neg();

  const twosNegateValue = negateValue.toTwos(64);

  const twosNegateValue64 = twosNegateValue.toString(2, 64);

  return [WizData.fromBin(twosNegateValue64), WizData.fromNumber(1)];
};

export const lessThan64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const bigA = new BN(wizData.bin, 2);
  const bigB = new BN(wizData2.bin, 2);

  const isANeg = wizData.bin.charAt(0) === "1";
  const isBNeg = wizData2.bin.charAt(0) === "1";

  if (isANeg && !isBNeg) {
    return WizData.fromNumber(1);
  } else if (!isANeg && isBNeg) {
    return WizData.fromNumber(0);
  } else if (isANeg && isBNeg) {
    return WizData.fromNumber(bigB.neg().lt(bigA.neg()) ? 1 : 0);
  }

  return WizData.fromNumber(bigA.lt(bigB) ? 1 : 0);
};

export const lessThanOrEqual64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const bigA = new BN(wizData.bin, 2);
  const bigB = new BN(wizData2.bin, 2);

  const isANeg = wizData.bin.charAt(0) === "1";
  const isBNeg = wizData2.bin.charAt(0) === "1";

  if (isANeg && !isBNeg) {
    return WizData.fromNumber(1);
  } else if (!isANeg && isBNeg) {
    return WizData.fromNumber(0);
  } else if (isANeg && isBNeg) {
    return WizData.fromNumber(bigB.neg().lte(bigA.neg()) ? 1 : 0);
  }

  return WizData.fromNumber(bigA.lte(bigB) ? 1 : 0);
};

export const greaterThan64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const bigA = new BN(wizData.bin, 2);
  const bigB = new BN(wizData2.bin, 2);

  const isANeg = wizData.bin.charAt(0) === "1";
  const isBNeg = wizData2.bin.charAt(0) === "1";

  if (isANeg && !isBNeg) {
    return WizData.fromNumber(0);
  } else if (!isANeg && isBNeg) {
    return WizData.fromNumber(1);
  } else if (isANeg && isBNeg) {
    console.log(bigA.toTwos(64).toString(2));
    console.log(bigB.toString(2));
    return WizData.fromNumber(bigB.neg().gt(bigA.neg()) ? 1 : 0);
  }

  return WizData.fromNumber(bigA.gt(bigB) ? 1 : 0);
};

export const greaterThanOrEqual64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const bigA = new BN(wizData.bin, 2);
  const bigB = new BN(wizData2.bin, 2);

  const isANeg = wizData.bin.charAt(0) === "1";
  const isBNeg = wizData2.bin.charAt(0) === "1";

  if (isANeg && !isBNeg) {
    return WizData.fromNumber(0);
  } else if (!isANeg && isBNeg) {
    return WizData.fromNumber(1);
  } else if (isANeg && isBNeg) {
    return WizData.fromNumber(bigB.neg().gte(bigA.neg()) ? 1 : 0);
  }

  return WizData.fromNumber(bigA.gte(bigB) ? 1 : 0);
};
