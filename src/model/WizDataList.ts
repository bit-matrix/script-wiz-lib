import WizData from "../convertion";

export type WizDataList = {
  inputHexes: string[];
  main: WizData[];
  alt: WizData[];
  flow: boolean[];
  altFlow: boolean[];
  isStackFailed: boolean;
  errorMessage?: string;
};
