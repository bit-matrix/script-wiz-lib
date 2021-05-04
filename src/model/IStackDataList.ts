import IStackData from "./IStackData";

interface IStackDataList {
  main: IStackData[];
  alt: IStackData[];
  flow: boolean[];
}

export default IStackDataList;
