import { hexLittleEndian } from "./index";
import { MAX_INTEGER } from "../constant";
import { StackData } from "../model";

const stackHex = (byteInput: string): StackData => {
  // byteInput
  // 0x1234

  // 0x123 formatted input => 0x1203
  let formattedInput: string = byteInput;
  if (byteInput.length % 2 === 1) {
    formattedInput = byteInput.substr(0, byteInput.length - 1) + "0" + byteInput.substr(byteInput.length - 1, 1);
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

export default stackHex;
