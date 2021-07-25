import WizData from "../convertion";

export const toAltStack = () => {};

export const fromAltStack = (wizData: WizData): WizData => wizData;

export const twoDrop = () => {};

export const twoDup = (wizData: WizData, wizData2: WizData): WizData[] => [wizData, wizData2];

export const threeDup = (wizData: WizData, wizData2: WizData, wizData3: WizData): WizData[] => [wizData, wizData2, wizData3];

export const twoOver = (wizData: WizData, wizData2: WizData): WizData[] => [wizData, wizData2];

export const rot = (wizData: WizData, wizData2: WizData, wizData3: WizData): WizData[] => [wizData2, wizData3, wizData];

export const twoRot = (wizData: WizData, wizData2: WizData, wizData3: WizData, wizData4: WizData, wizData5: WizData, wizData6: WizData): WizData[] => [
  wizData3,
  wizData4,
  wizData5,
  wizData6,
  wizData,
  wizData2,
];

export const twoSwap = (wizData: WizData, wizData2: WizData, wizData3: WizData, wizData4: WizData): WizData[] => [wizData2, wizData, wizData4, wizData3];

export const depth = (length: number): WizData => WizData.fromNumber(length);

export const drop = () => [];

export const dup = (wizData: WizData): WizData => wizData;

export const ifDup = (wizData: WizData): WizData | {} => {
  if (wizData.number !== undefined && wizData.number === 0) {
    return {};
  }

  return wizData;
};

export const nip = (wizData: WizData): WizData => wizData;

export const over = (wizData: WizData): WizData => wizData;

// const OP_PICK = (stackDataArray: IStackData[], stackIndex: number): IStackData[] => [...stackDataArray, stackDataArray.reverse()[stackIndex]];

// const OP_ROLL = (stackDataArray: IStackData[], stackIndex: number): IStackData[] => {
//   const newStackDataArray: IStackData[] = [...stackDataArray].reverse();
//   const currentItem: IStackData = newStackDataArray[stackIndex];

//   newStackDataArray.splice(stackIndex, 1);

//   newStackDataArray.unshift(currentItem);

//   return newStackDataArray.reverse();
// };

export const swap = (wizData: WizData, wizData2: WizData): WizData[] => [wizData, wizData2];

export const tuck = (wizData: WizData, wizData2: WizData): WizData[] => [wizData2, wizData, wizData2];
