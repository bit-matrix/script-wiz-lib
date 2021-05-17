import IStackData from "./IStackData";
interface IStackDataList {
    inputHexes: string[];
    main: IStackData[];
    alt: IStackData[];
    flow: boolean[];
    altFlow: boolean[];
    isStackFailed: boolean;
}
export default IStackDataList;
