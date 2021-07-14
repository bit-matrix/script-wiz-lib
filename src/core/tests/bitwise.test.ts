// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import { and, equal, invert, or, xor } from "../bitwise";

test("bitwise invert test", () => {
  const wizData: WizData = WizData.fromNumber(5);

  const result: WizData = invert(wizData);
  expect(result.hex).toBe("fa");
});

test("bitwise and test", () => {
  const wizData: WizData = WizData.fromNumber(-99);
  const wizData2: WizData = WizData.fromNumber(11);

  const result: WizData = and(wizData, wizData2);

  expect(result.hex).toBe("03");
  expect(result.bin).toBe("00000011");
});

test("bitwise or test", () => {
  const wizData: WizData = WizData.fromNumber(-99);
  const wizData2: WizData = WizData.fromNumber(11);

  const result: WizData = or(wizData, wizData2);

  expect(result.hex).toBe("eb");
  expect(result.bin).toBe("11101011");
});

test("bitwise xor test", () => {
  const wizData: WizData = WizData.fromNumber(-99);
  const wizData2: WizData = WizData.fromNumber(11);

  const result: WizData = xor(wizData, wizData2);

  expect(result.hex).toBe("e8");
  expect(result.bin).toBe("11101000");
});

test("bitwise equal test", () => {
  const wizData: WizData = WizData.fromText("scriptwiz");
  const wizData2: WizData = WizData.fromHex("73637269707477697a");

  const result: WizData = equal(wizData, wizData2);

  expect(result.number).toBe(1);
});
