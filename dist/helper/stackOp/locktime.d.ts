import IStackData from "../../model/IStackData";
declare const OP_CHECKLOCKTIMEVERIFY: (stackData: IStackData) => IStackData[];
declare const OP_CHECKSEQUENCEVERIFY: (stackData: IStackData) => IStackData[];
export { OP_CHECKLOCKTIMEVERIFY, OP_CHECKSEQUENCEVERIFY };
