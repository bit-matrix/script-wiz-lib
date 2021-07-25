import { WizDataList } from "../model";

export const flipbits = (str: string): string => {
  return str
    .split("")
    .map((b: any) => (1 - b).toString())
    .join("");
};

// supports all opcodes
export const currentScope = (wizDataList: WizDataList): boolean => wizDataList.flow[wizDataList.flow.length - 1];
