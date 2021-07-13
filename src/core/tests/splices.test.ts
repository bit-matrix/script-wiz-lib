// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import { concatenate, substr } from "../splices";

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
