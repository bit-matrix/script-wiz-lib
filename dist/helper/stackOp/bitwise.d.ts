import { StackData } from "../../model";
declare const OP_INVERT: (stackData: StackData) => StackData[];
declare const OP_EQUAL: (stackData1: StackData, stackData2: StackData) => StackData[];
declare const OP_EQUALVERIFY: (stackData1: StackData, stackData2: StackData) => boolean;
export { OP_INVERT, OP_EQUAL, OP_EQUALVERIFY };
