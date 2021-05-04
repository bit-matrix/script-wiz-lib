import IStackData from "../../model/IStackData";
declare const OP_RIPEMD160: (stackData: IStackData) => IStackData[];
declare const OP_SHA1: (stackData: IStackData) => IStackData[];
declare const OP_SHA256: (stackData: IStackData) => IStackData[];
declare const OP_HASH160: (stackData: IStackData) => IStackData[];
declare const OP_HASH256: (stackData: IStackData) => IStackData[];
declare const OP_CHECKSIGFROMSTACK: (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData) => IStackData[];
export { OP_RIPEMD160, OP_SHA1, OP_SHA256, OP_HASH160, OP_HASH256, OP_CHECKSIGFROMSTACK };
