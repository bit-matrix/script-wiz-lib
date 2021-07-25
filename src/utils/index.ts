import { WizDataList } from "../model";

export const flipbits = (str: string): string => {
  return str
    .split("")
    .map((b: any) => (1 - b).toString())
    .join("");
};

// supports all opcodes
export const currentScope = (wizDataList: WizDataList): boolean => wizDataList.flow[wizDataList.flow.length - 1];
export const EMOJI_REGEX = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
