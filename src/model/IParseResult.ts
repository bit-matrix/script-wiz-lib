import IStackData from "./IStackData";

interface IParseResultData {
  main: {
    addDataArray: IStackData[];
    removeLastSize: number;
  };
  alt: {
    addData?: IStackData;
    removeLastStackData: boolean;
  };
  flow?: boolean[];
  altFlow?: boolean[];
  isStackFailed?: boolean;
}

interface IParseResult extends IParseResultData {
  inputHex: string;
}

export { IParseResultData, IParseResult };
