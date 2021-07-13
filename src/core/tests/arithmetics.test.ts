// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import {
  abs,
  add,
  add1,
  boolAnd,
  boolOr,
  div,
  graterThan,
  graterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  lshift,
  max,
  min,
  mul,
  negate,
  not,
  notEqual0,
  numEqual,
  numEqualVerify,
  numNotEqual,
  rshift,
  sub,
  sub1,
  withIn,
} from "../arithmetics";
import { getRandomNumber } from "./helper";

test("Arithmetic add1 test", () => {
  const wizData: WizData = WizData.fromNumber(12);
  const add1WizData: WizData = add1(wizData);

  expect(add1WizData.number).toBe(13);
  expect(wizData.text).toBe(undefined);
});

test("Arithmetic sub1 test", () => {
  const wizData: WizData = WizData.fromNumber(12);
  const sub1WizData: WizData = sub1(wizData);
  expect(sub1WizData.number).toBe(11);
  expect(wizData.text).toBe(undefined);

  const wizData2: WizData = WizData.fromNumber(-999);
  const sub1WizData2: WizData = sub1(wizData2);
  expect(sub1WizData2.number).toBe(-1000);
  expect(wizData2.text).toBe(undefined);
});

test("Arithmetic negate test", () => {
  const wizData: WizData = WizData.fromNumber(12);
  const negateWizData: WizData = negate(wizData);
  expect(negateWizData.number).toBe(-12);
  expect(wizData.text).toBe(undefined);

  const wizData2: WizData = WizData.fromNumber(-890);
  const negateWizData2: WizData = negate(wizData2);
  expect(negateWizData2.number).toBe(890);
  expect(wizData2.text).toBe(undefined);

  const wizData3: WizData = WizData.fromNumber(0);
  const negateWizData3: WizData = negate(wizData3);
  expect(negateWizData3.number === 0).toEqual(true);
  expect(wizData3.text).toBe(undefined);
});

test("Arithmetic absolute test", () => {
  const wizData: WizData = WizData.fromNumber(-12);
  const wizData2: WizData = WizData.fromNumber(5);

  const absoluteResult: WizData = abs(wizData);
  const absoluteResult2: WizData = abs(wizData2);

  expect(absoluteResult.number).toBe(12);
  expect(absoluteResult2.number).toBe(5);
  expect(wizData.text).toBe(undefined);
});

test("Arithmetic not test", () => {
  const firstWizData: WizData = WizData.fromNumber(0);
  const secondWizData: WizData = WizData.fromNumber(getRandomNumber(1));

  const firstWizDataResult: WizData = not(firstWizData);
  const secondWizDataResult: WizData = not(secondWizData);

  expect(firstWizDataResult.number).toBe(1);
  expect(secondWizDataResult.number).toBe(0);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic notEqual0 test", () => {
  const firstWizData: WizData = WizData.fromNumber(0);
  const secondWizData: WizData = WizData.fromNumber(getRandomNumber(1));

  const firstWizDataResult: WizData = notEqual0(firstWizData);
  const secondWizDataResult: WizData = notEqual0(secondWizData);

  expect(firstWizDataResult.number).toBe(0);
  expect(secondWizDataResult.number).toBe(1);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic add test", () => {
  const firstWizData: WizData = WizData.fromNumber(12);
  const secondWizData: WizData = WizData.fromNumber(13);

  const negateFirstWizData: WizData = WizData.fromNumber(-12);
  const negateSecondWizData: WizData = WizData.fromNumber(-13);

  const addResult: WizData = add(firstWizData, secondWizData);
  const negateAddResult: WizData = add(negateFirstWizData, negateSecondWizData);

  expect(addResult.number).toBe(25);
  expect(negateAddResult.number).toBe(-25);
  expect(firstWizData.text).toBe(undefined);
  expect(negateAddResult.text).toBe(undefined);
});

test("Arithmetic sub test", () => {
  const firstWizData: WizData = WizData.fromNumber(11);
  const secondWizData: WizData = WizData.fromNumber(13);

  const subResult: WizData = sub(firstWizData, secondWizData);

  expect(subResult.number).toBe(-2);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic mul test", () => {
  const firstWizData: WizData = WizData.fromNumber(9);
  const secondWizData: WizData = WizData.fromNumber(11);

  const mulResult: WizData = mul(firstWizData, secondWizData);

  expect(mulResult.number).toBe(99);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic div test", () => {
  const firstWizData: WizData = WizData.fromNumber(12);
  const secondWizData: WizData = WizData.fromNumber(3);

  const divResult: WizData = div(firstWizData, secondWizData);

  expect(divResult.number).toBe(4);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic lshift test", () => {
  const firstWizData: WizData = WizData.fromNumber(5);
  const secondWizData: WizData = WizData.fromNumber(2);

  const lshiftResult: WizData = lshift(firstWizData, secondWizData);

  expect(lshiftResult.number).toBe(20);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic rshift test", () => {
  const firstWizData: WizData = WizData.fromNumber(5);
  const secondWizData: WizData = WizData.fromNumber(2);

  const rshiftResult: WizData = rshift(firstWizData, secondWizData);

  expect(rshiftResult.number).toBe(1);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic boolAnd test", () => {
  const firstWizData: WizData = WizData.fromNumber(5);
  const secondWizData: WizData = WizData.fromNumber(2);
  const thirdWizData: WizData = WizData.fromNumber(0);

  const firstResult: WizData = boolAnd(firstWizData, secondWizData);
  const secondResult: WizData = boolAnd(thirdWizData, secondWizData);

  expect(firstResult.number).toBe(1);
  expect(secondResult.number).toBe(0);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.text).toBe(undefined);
});

test("Arithmetic boolOr test", () => {
  const firstWizData: WizData = WizData.fromNumber(5);
  const secondWizData: WizData = WizData.fromNumber(2);
  const thirdWizData: WizData = WizData.fromNumber(0);

  const firstResult: WizData = boolOr(firstWizData, secondWizData);
  const secondResult: WizData = boolOr(thirdWizData, secondWizData);

  expect(firstResult.number).toBe(1);
  expect(secondResult.number).toBe(1);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.text).toBe(undefined);
});

test("Arithmetic numEqualVerify test", () => {
  const firstWizData: WizData = WizData.fromNumber(5);
  const secondWizData: WizData = WizData.fromNumber(abs(WizData.fromNumber(-5)).number || 0);
  const thirdWizData: WizData = WizData.fromText("scriptwiz");

  const firstResult: WizData = numEqualVerify(firstWizData, secondWizData);

  try {
    numEqualVerify(thirdWizData, secondWizData);
  } catch (e) {
    expect(e).toBe("Error: this operation requires 2 valid number wizData");
  }

  expect(firstResult.number).toBe(1);

  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.number).toBe(undefined);
});

test("Arithmetic numEqual test", () => {
  const firstWizData: WizData = WizData.fromNumber(5);
  const secondWizData: WizData = WizData.fromNumber(abs(WizData.fromNumber(-5)).number || 0);
  const thirdWizData: WizData = WizData.fromText("scriptwiz");
  const fourthWizData: WizData = WizData.fromNumber(30);

  const firstResult: WizData = numEqual(firstWizData, secondWizData);

  try {
    numEqual(thirdWizData, secondWizData);
  } catch (e) {
    expect(e).toBe("Error: this operation requires 2 valid number wizData");
  }

  const thirdResult: WizData = numEqual(firstWizData, fourthWizData);

  expect(firstResult.number).toBe(1);
  expect(thirdResult.number).toBe(0);

  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.number).toBe(undefined);
  expect(fourthWizData.text).toBe(undefined);
});

test("Arithmetic numNotEqual test", () => {
  const firstWizData: WizData = WizData.fromNumber(5);
  const secondWizData: WizData = WizData.fromNumber(abs(WizData.fromNumber(-5)).number || 0);
  const thirdWizData: WizData = WizData.fromText("scriptwiz");
  const fourthWizData: WizData = WizData.fromNumber(30);

  const firstResult: WizData = numNotEqual(firstWizData, secondWizData);

  try {
    numNotEqual(thirdWizData, secondWizData);
  } catch (e) {
    expect(e).toBe("Error: this operation requires 2 valid number wizData");
  }

  const thirdResult: WizData = numNotEqual(firstWizData, fourthWizData);

  expect(firstResult.number).toBe(0);
  expect(thirdResult.number).toBe(1);

  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.number).toBe(undefined);
  expect(fourthWizData.text).toBe(undefined);
});

test("Arithmetic lessThan test", () => {
  const firstWizData: WizData = WizData.fromNumber(1);
  const secondWizData: WizData = WizData.fromNumber(2);
  const thirdWizData: WizData = WizData.fromNumber(3);

  const firstResult: WizData = lessThan(firstWizData, secondWizData);
  const secondResult: WizData = lessThan(thirdWizData, firstWizData);

  expect(firstResult.number).toBe(1);
  expect(secondResult.number).toBe(0);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.text).toBe(undefined);
});

test("Arithmetic graterThan test", () => {
  const firstWizData: WizData = WizData.fromNumber(1);
  const secondWizData: WizData = WizData.fromNumber(2);
  const thirdWizData: WizData = WizData.fromNumber(3);

  const firstResult: WizData = graterThan(firstWizData, secondWizData);
  const secondResult: WizData = graterThan(thirdWizData, firstWizData);

  expect(firstResult.number).toBe(0);
  expect(secondResult.number).toBe(1);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.text).toBe(undefined);
});

test("Arithmetic lessThanOrEqual test", () => {
  const firstWizData: WizData = WizData.fromNumber(1);
  const secondWizData: WizData = WizData.fromNumber(2);
  const thirdWizData: WizData = WizData.fromNumber(2);

  const firstResult: WizData = lessThanOrEqual(firstWizData, secondWizData);
  const secondResult: WizData = lessThanOrEqual(secondWizData, thirdWizData);

  expect(firstResult.number).toBe(1);
  expect(secondResult.number).toBe(1);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.text).toBe(undefined);
});

test("Arithmetic graterThanOrEqual test", () => {
  const firstWizData: WizData = WizData.fromNumber(1);
  const secondWizData: WizData = WizData.fromNumber(2);
  const thirdWizData: WizData = WizData.fromNumber(3);

  const firstResult: WizData = graterThanOrEqual(firstWizData, secondWizData);
  const secondResult: WizData = graterThanOrEqual(secondWizData, thirdWizData);

  expect(firstResult.number).toBe(0);
  expect(secondResult.number).toBe(0);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
  expect(thirdWizData.text).toBe(undefined);
});

test("Arithmetic min test", () => {
  const firstWizData: WizData = WizData.fromNumber(10);
  const secondWizData: WizData = WizData.fromNumber(16);

  const result: WizData = min(firstWizData, secondWizData);

  expect(result.number).toBe(10);
  expect(result).toBe(firstWizData);
  expect(firstWizData.text).toBe(undefined);
  expect(secondWizData.text).toBe(undefined);
});

test("Arithmetic withIn test", () => {
  const value: WizData = WizData.fromNumber(1);
  const min: WizData = WizData.fromNumber(0);
  const max: WizData = WizData.fromNumber(2);

  const result: WizData = withIn(value, min, max);

  expect(result.number).toBe(1);
  expect(value.text).toBe(undefined);
  expect(min.text).toBe(undefined);
  expect(max.text).toBe(undefined);
});
