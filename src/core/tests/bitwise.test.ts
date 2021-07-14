// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import { and, invert } from "../bitwise";

test("bitwise invert test", () => {
  const wizData: WizData = WizData.fromNumber(5);

  const result: WizData = invert(wizData);
  expect(result.hex).toBe("fa");
});

test("bitwise and test", () => {
  const wizData: WizData = WizData.fromText("ahmet");
  const wizData2: WizData = WizData.fromText("husey");

  const result: WizData = and(wizData, wizData2);

  console.log(result);
});
