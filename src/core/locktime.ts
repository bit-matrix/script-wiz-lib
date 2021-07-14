import WizData from "../convertion";

export const checkLockTimeVerify = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    return WizData.fromNumber(1);
  }

  throw "Error: Invalid input: this operation requires a valid Script Number";
};

export const checkSequenceVerify = (wizData: WizData): WizData => {
  if (wizData.number !== undefined) {
    return WizData.fromNumber(1);
  }

  throw "Error: Invalid input: this operation requires a valid Script Number";
};
