import { hexLittleEndian } from "./index";
import { MAX_INTEGER } from "../constant";
import { StackData } from "../model";

const stackHex = (byteInput: string): StackData => {
  // TO DO
  //

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
  const hexNumberValue = parseInt(littleEndianValue);

  if (hexNumberValue <= MAX_INTEGER) {
    finalNumberValue = hexNumberValue;
    byteValue = hexNumberValue;
  } else byteValue = formattedInput;

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
