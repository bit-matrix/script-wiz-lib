import IStackData from "../../model/IStackData";
declare const OP_CAT: (stackData2: IStackData, stackData1: IStackData) => IStackData[];
declare const OP_SUBSTR: (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData) => IStackData[];
export { OP_CAT, OP_SUBSTR };
