import { MAX_INTEGER } from "../../convertion";

export const getRandomNumber = (min?: number, max?: number): number => {
  let minValue = min || 0;
  let maxValue = max || MAX_INTEGER;

  return Math.random() * (maxValue - minValue) + minValue;
};
