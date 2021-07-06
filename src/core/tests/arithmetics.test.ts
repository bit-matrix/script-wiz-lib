// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import { add1 } from "../arithmetics";

test("Arithmetic add1 test", () => {
  const wizData: WizData = WizData.fromNumber(12);
  const add1WizData: WizData = add1(wizData);

  expect(add1WizData.number).toBe(13);
  expect(wizData.text).toBe(undefined);
});
