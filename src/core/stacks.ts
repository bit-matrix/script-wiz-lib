import WizData from "@script-wiz/wiz-data";

export const fromAltStack = (wizData: WizData): WizData => wizData;

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

export const dup = (wizData: WizData): WizData => wizData;

export const ifDup = (wizData: WizData): WizData | {} => {
  if (wizData.number !== undefined && wizData.number === 0) {
    return {};
  }

  return wizData;
};

export const nip = (wizData: WizData): WizData => wizData;

export const over = (wizData: WizData): WizData => wizData;

export const pick = (wizDataArray: WizData[], stackIndex: number): WizData[] => [...wizDataArray, wizDataArray.reverse()[stackIndex]];

export const roll = (wizDataArray: WizData[], stackIndex: number): WizData[] => {
  const newWizDataArray: WizData[] = [...wizDataArray].reverse();
  const currentItem: WizData = newWizDataArray[stackIndex];

  newWizDataArray.splice(stackIndex, 1);
  newWizDataArray.unshift(currentItem);

  return newWizDataArray.reverse();
};

export const swap = (wizData: WizData, wizData2: WizData): WizData[] => [wizData, wizData2];

export const tuck = (wizData: WizData, wizData2: WizData): WizData[] => [wizData2, wizData, wizData2];
