import { hexLE } from "./hex";

const BIT_8 = 8;
const BIT_16 = 16;
const BIT_32 = 32;

const log = (base: number, x: number): number => Math.log(x) / Math.log(base);

const numberByteLength = (x: number): number => {
  if (x === 0) return 0;
  else if (0 < x) return Math.ceil((log(2, x + 1) + 1) / 8);
  else if (x < 0) return Math.floor((log(2, -x) + 1) / 8 + 1);
  return 0;
};

const resizeBytes = (uint8Array: Uint8Array, byteLength: number): Uint8Array => {
  const resizedUint8Array: Uint8Array = new Uint8Array(byteLength);
  if (uint8Array.length > byteLength) {
    const maxNumber: number = Math.pow(2, BIT_8) - 1;
    resizedUint8Array.fill(maxNumber);
  } else {
    resizedUint8Array.set(uint8Array);
  }
  return resizedUint8Array;
};

const numeralNextValue = (value: number, base: number): { numeral: number; nextValue: number } => {
  const numeral: number = value % base;
  const nextValue: number = (value - numeral) / base;
  return { numeral, nextValue };
};

const uint8NumberToBytes = (value: number): Uint8Array => {
  const baseNumber: number = Math.pow(2, BIT_8);
  let lastValue: number = value;
  const numeralArray: number[] = [];

  while (lastValue >= baseNumber) {
    const { numeral, nextValue } = numeralNextValue(lastValue, baseNumber);
    numeralArray.push(numeral);
    lastValue = nextValue;
  }

  if (lastValue > 0) numeralArray.push(lastValue);
  const result: Uint8Array = Uint8Array.from(numeralArray);
  return result;
};

export const numberToBytes = (value: number): Uint8Array => {
  const byteLength: number = numberByteLength(value);
  const inputNumber: number = value < 0 ? Math.pow(2, 8 * byteLength - 1) - value : value;
  const uint8NumberBytes: Uint8Array = uint8NumberToBytes(inputNumber);
  return resizeBytes(uint8NumberBytes, byteLength);
};

export const numberIsValid = (hex: string, byteLength: number): boolean => {
  const numberHex: number = parseInt(hexLE(hex), 16);

  // 1 byte
  // n = 0x00
  // n = 0x80
  if (byteLength === 1) if (0x00 == numberHex || 0x80 == numberHex) return false;

  // 2 byte
  // 0x0001 <= n <= 0x007f
  // 0x8000 <= n <= 0x807f
  if (byteLength === 2) if ((0x0001 <= numberHex && numberHex <= 0x007f) || (0x8000 <= numberHex && numberHex <= 0x807f)) return false;

  // 3 byte
  // 0x000001 <= n <= 0x007fff
  // 0x800000 <= n <= 0x807fff
  if (byteLength === 3) if ((0x000001 <= numberHex && numberHex <= 0x007fff) || (0x800000 <= numberHex && numberHex <= 0x807fff)) return false;

  // 4 byte
  // 0x00000001 <= n <= 0x007fffff
  // 0x80000000 <= n <= 0x807fffff
  if (byteLength === 4) if ((0x00000001 <= numberHex && numberHex <= 0x007fffff) || (0x80000000 <= numberHex && numberHex <= 0x807fffff)) return false;

  return true;
};
