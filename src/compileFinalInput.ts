import stackHex from "./helper/stackHex";
import stackNumber from "./helper/stackNumber";
import stackString from "./helper/stackString";

const compileFinalInput = (input: string): string => {
  // HEX DATA INPUT
  if (input.startsWith("0x")) {
    return stackHex(input).byteValue;
  }

  if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    const formattedInput = input.substr(1, input.length - 2);
    return stackString(formattedInput).byteValue;
  }

  // NUMBER INPUT
  if (!isNaN(input as any)) {
    return stackNumber(input).byteValue;
  }

  throw "Compile Final Input Error: it is not a valid final input string!";
};

export default compileFinalInput;
