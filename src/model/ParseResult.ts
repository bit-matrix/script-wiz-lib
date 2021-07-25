import WizData from "../convertion";

export type ParseResultData = {
  main: {
    addDataArray: WizData[];
    removeLastSize: number;
  };
  alt: {
    addData?: WizData;
    removeLastStackData: boolean;
  };
  flow?: boolean[];
  altFlow?: boolean[];
  isStackFailed?: boolean;
};

export interface ParseResult extends ParseResultData {
  inputHex: string;
  errorMessage?: string;
}
