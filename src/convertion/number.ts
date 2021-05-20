const BIT_8 = 8;
const BIT_16 = 16;
const BIT_32 = 32;

const log = (base: number, x: number) => Math.log(x) / Math.log(base);

const numberByteLength = (x: number) => {
  if (x === 0) return 0;
  else if (0 < x) return Math.ceil((log(2, x + 1) + 1) / 8);
  else if (x < 0) return Math.floor((log(2, -x) + 1) / 8 + 1);
  return 0;
};

const resizeBytes = (uint8Array: Uint8Array, byteLength: number): Uint8Array => {
  const resizedUint8Array = new Uint8Array(byteLength);
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
  const baseNumber = Math.pow(2, BIT_8);
  let lastValue = value;
  const numeralArray: number[] = [];

  while (lastValue >= baseNumber) {
    const { numeral, nextValue } = numeralNextValue(lastValue, baseNumber);
    numeralArray.push(numeral);
    lastValue = nextValue;
  }

  if (lastValue > 0) numeralArray.push(lastValue);
  const result = Uint8Array.from(numeralArray);
  return result;
};

export const numberToBytes = (value: number): Uint8Array => {
  const byteLength = numberByteLength(value);
  const inputNumber = value < 0 ? Math.pow(2, 8 * byteLength - 1) - value : value;
  const uint8NumberBytes = uint8NumberToBytes(inputNumber);
  return resizeBytes(uint8NumberBytes, byteLength);
};
