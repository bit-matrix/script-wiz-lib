import IStackData from "../../model/IStackData";
import stackNumber from "../stackNumber";

const OP_TOALTSTACK = (): IStackData[] => [];

const OP_FROMALTSTACK = (stackData: IStackData): IStackData[] => [stackData];

const OP_2DROP = (): IStackData[] => [];

const OP_2DUP = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1, stackData2];

const OP_3DUP = (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData): IStackData[] => [stackData1, stackData2, stackData3];

const OP_2OVER = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1, stackData2];

const OP_2SWAP = (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData, stackData4: IStackData): IStackData[] => [stackData2, stackData1, stackData4, stackData3];

const OP_DEPTH = (stackDataArrayLenght: number) => [stackNumber(stackDataArrayLenght.toString())];

const OP_DROP = (): IStackData[] => [];

const OP_DUP = (stackData1: IStackData): IStackData[] => [stackData1];

const OP_NIP = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1];

const OP_OVER = (stackData: IStackData): IStackData[] => [stackData];

const OP_SWAP = (stackData1: IStackData, stackData2: IStackData): IStackData[] => [stackData1, stackData2];

export { OP_TOALTSTACK, OP_FROMALTSTACK, OP_2DROP, OP_2DUP, OP_3DUP, OP_2OVER, OP_2SWAP, OP_DEPTH, OP_DROP, OP_DUP, OP_NIP, OP_OVER, OP_SWAP };
