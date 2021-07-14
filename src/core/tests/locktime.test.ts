// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import { checkLockTimeVerify, checkSequenceVerify } from "../locktime";

test("LockTime checkLockTimeVerify test", () => {
  const wizData: WizData = WizData.fromNumber(5);

  const result: WizData = checkLockTimeVerify(wizData);
  expect(result.number).toBe(1);
});

test("LockTime checkSequenceVerify test", () => {
  const wizData: WizData = WizData.fromNumber(5);

  const result: WizData = checkLockTimeVerify(wizData);
  expect(result.number).toBe(1);
});
