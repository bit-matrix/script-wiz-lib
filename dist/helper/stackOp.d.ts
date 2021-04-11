import { StackDataResult } from "../model";
import IStackData from "../model/IStackData";
declare const OP: (opCode: string, stackData1: IStackData, stackData2: IStackData, stackData3?: IStackData | undefined) => StackDataResult;
export default OP;
