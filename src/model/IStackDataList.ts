import IStackData from "./IStackData";

interface IStackDataList {
  main: IStackData[];
  alt: IStackData[];
  flow: boolean[];
  altFlow: boolean[];
  isStackFailed: boolean;
}

export default IStackDataList;
