import { hexLittleEndian } from "./index";
import { MAX_INTEGER } from "../constant";
import { StackData } from "../model";

interface NumberBoundries {
  minPos: number;
  maxPos: number;
  minNeg: number;
  maxNeg: number;
}

const hexBoundries = (byteLenght: number): NumberBoundries | undefined => {
  // 2^(8n-9) <= x <= 2^(8n-1) - 1
  // -2(8n-9) >= x >= -2^(8n-1) + 1

  const b1 = Math.pow(2, 8 * byteLenght - 9);
  const b2 = Math.pow(2, 8 * byteLenght - 1);

  if (0 < byteLenght && byteLenght < 5) {
    return {
      minPos: b1,
      maxPos: b2 - 1,
      minNeg: 1 - b2,
      maxNeg: -1 * b1,
    };
  }

  return;
};

const availableNumber = (hexString: string, byteLenght: number): boolean => {
  // TODO

  // N/A

  const numberHex = Number(hexString);

  // 1 byte
  // n = 0x80

  // 2 byte
  // 0x0001 <= n <= 0x007f
  // 0x8000 <= n <= 0x807f

  // 3 byte
  // 0x000001 <= n <= 0x007fff
  // 0x800000 <= n <= 0x807fff

  // 4 byte
  // 0x00000001 <= n <= 0x007fffff
  // 0x80000000 <= n <= 0x807fffff

  if (byteLenght === 2)
    if (
      (0x0001 <= numberHex && numberHex <= 0x007f) ||
      (0x8000 <= numberHex && numberHex <= 0x807f)
    )
      return false;

  return true;
};

const hexToNumber = (inputHex: string): number | undefined => {
  const byteLenght = (inputHex.length - 2) / 2;
  if (byteLenght == 0 || 4 < byteLenght) return;

  if (!availableNumber(inputHex, byteLenght)) return;

  const numberHex: number = Number(inputHex);

  const boundries = hexBoundries(byteLenght);
  if (boundries === undefined) return;

  if (boundries.minPos <= numberHex && numberHex <= boundries.maxPos)
    return numberHex;

  // if (boundries.minNeg <= numberHex && numberHex <= boundries.maxNeg)
  return Math.pow(2, 8 * byteLenght - 1) - numberHex;

  // throw "Hex To Number Error: hex is a available number but not in boundries !";
};

const stackHex = (byteInput: string): StackData => {
  // TO DO
  // Zero check

  // 1. find hex data length
  // Find
  // byteInput
  // 0x1234

  // 0x123 formatted input => 0x1203
  let formattedInput: string = byteInput;
  if (byteInput.length % 2 === 1) {
    formattedInput =
      byteInput.substr(0, byteInput.length - 1) +
      "0" +
      byteInput.substr(byteInput.length - 1, 1);
  }

  let byteValue: number | string;
  let finalNumberValue: number | undefined = undefined;

  const littleEndianValue = hexLittleEndian(formattedInput);
  const hexNumberValue = hexToNumber(littleEndianValue);

  if (hexNumberValue) {
    finalNumberValue = hexNumberValue;
    if (
      finalNumberValue <= MAX_INTEGER &&
      -1 * MAX_INTEGER <= finalNumberValue
    ) {
      byteValue = hexNumberValue;
    } else {
      finalNumberValue = undefined;
      byteValue = formattedInput;
    }
  } else {
    byteValue = formattedInput;
  }

  // if (hexNumberValue <= MAX_INTEGER) {
  //   finalNumberValue = hexNumberValue;
  //   byteValue = hexNumberValue;
  // } else byteValue = formattedInput;

  return {
    input: byteInput,
    numberValue: finalNumberValue,
    byteValue: formattedInput,
    byteValueDisplay: byteValue.toString(),
    stringValue: byteInput,
  };
};

// 0 byte
// h = 0x              =>      0

// 1 byte
// 0x01 <= h <= 0x7f     =>      1 <= x <= 127
// 0x81 <= h <= 0xff     =>     -1 >= x >= -127

// 2 byte
// 0x0080 <= h <= 0x7fff     =>      128 <= x <= 32767
// 0x8080 <= h <= 0xffff     =>     -128 >= x >= -32767

// 3 byte
// 0x008000 <= h <= 0x7fffff     =>      32768 <= x <= 8388607
// 0x808000 <= h <= 0xffffff     =>     -32768 >= x >= -8388607

// 4 byte
// 0x00800000 <= h < 0x7fffffff     =>      8388608 <= x <= 2147483647
// 0x80800000 <= h < 0xffffffff     =>     -8388608 >= x >= -2147483647

// ______________________________________________________________________

// 1 byte
// n = 0x80

// 2 byte
// 0x0001 <= n <= 0x007f
// 0x8000 <= n <= 0x807f

// 3 byte
// 0x000001 <= n <= 0x007fff
// 0x800000 <= n <= 0x807fff

// 4 byte
// 0x00000001 <= n <= 0x007fffff
// 0x80000000 <= n <= 0x807fffff

// ________________________________________________________________________

export default stackHex;
