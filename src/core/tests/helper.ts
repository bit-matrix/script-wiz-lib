import { MAX_INTEGER } from "@script-wiz/wiz-data";

export const getRandomNumber = (min?: number, max?: number): number => {
  let minValue = min || -MAX_INTEGER;
  let maxValue = max || MAX_INTEGER;

  return Math.random() * (maxValue - minValue) + minValue;
};
