// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import {
  concatenate,
  left,
  right,
  size,
  substr,
  substr_lazy,
} from "../splices";

test("Splices concatenate test", () => {
  const wizData: WizData = WizData.fromHex("0001");
  const wizData2: WizData = WizData.fromHex("00");

  const wizDataNumber: WizData = WizData.fromNumber(11);
  const wizDataNumber2: WizData = WizData.fromNumber(22);

  const result: WizData = concatenate(wizData, wizData2);
  const numberResult: WizData = concatenate(wizDataNumber, wizDataNumber2);

  expect(result.hex).toBe("000100");
  expect(numberResult.hex).toBe("0b16");
  expect(numberResult.number).toBe(5643);
});

test("Splices substr test", () => {
  const message: WizData = WizData.fromText("scriptwiz");
  const index: WizData = WizData.fromNumber(1);
  const size: WizData = WizData.fromNumber(3);

  const result: WizData = substr(message, index, size);

  expect(result.hex).toBe("637269");
});

test("Splices right test", () => {
  const message: WizData = WizData.fromText("scriptwiz");
  const size: WizData = WizData.fromNumber(3);

  const result: WizData = right(message, size);

  expect(result.hex).toBe("77697a");
});

test("Splices left test", () => {
  const message: WizData = WizData.fromText("scriptwiz");
  const size: WizData = WizData.fromNumber(3);

  const result: WizData = left(message, size);

  expect(result.hex).toBe("736372");
});

test("Splices size test", () => {
  const message: WizData = WizData.fromText("scriptwiz");

  const result: WizData = size(message);

  expect(result.number).toBe(9);
});

test("Splices substr_lazy test", () => {
  const message: WizData = WizData.fromText("scriptwiz");
  const index: WizData = WizData.fromNumber(2);
  const size: WizData = WizData.fromNumber(3);

  const result: WizData = substr_lazy(message, index, size);

  expect(result.hex).toBe("726970");
});
