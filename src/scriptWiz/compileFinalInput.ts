import WizData from "../convertion";

export const compileFinalInput = (input: string): WizData => {
  // HEX DATA INPUT
  if (input.startsWith("0x")) {
    return WizData.fromHex(input);
  }

  if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    const formattedInput = input.substr(1, input.length - 2);
    return WizData.fromText(formattedInput);
  }

  // NUMBER INPUT
  if (!isNaN(input as any)) {
    return WizData.fromNumber(Number(input));
  }

  throw "Compile Final Input Error: it is not a valid final input string!";
};
