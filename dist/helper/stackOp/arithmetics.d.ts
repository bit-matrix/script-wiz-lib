import IStackData from "../../model/IStackData";
declare const OP_ADD: (stackData1: IStackData, stackData2: IStackData) => IStackData[];
declare const OP_SUB: (stackData2: IStackData, stackData1: IStackData) => IStackData[];
export { OP_ADD, OP_SUB };
