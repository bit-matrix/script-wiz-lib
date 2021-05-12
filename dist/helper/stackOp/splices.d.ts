import IStackData from "../../model/IStackData";
declare const OP_CAT: (stackData2: IStackData, stackData1: IStackData) => IStackData[];
declare const OP_SUBSTR: (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData) => IStackData[];
declare const OP_RIGHT: (stackData2: IStackData, stackData1: IStackData) => IStackData[];
declare const OP_LEFT: (stackData2: IStackData, stackData1: IStackData) => IStackData[];
declare const OP_SIZE: (stackData: IStackData) => IStackData[];
declare const OP_SUBSTR_LAZY: (stackData3: IStackData, stackData2: IStackData, stackData1: IStackData) => IStackData[];
export { OP_CAT, OP_SUBSTR, OP_RIGHT, OP_LEFT, OP_SIZE, OP_SUBSTR_LAZY };
