const numberTestData = [
  { inputNumber: -2147483650, numberValue: false, byteLength: 5, hexValue: "0x0200008080" },
  { inputNumber: -2147483649, numberValue: false, byteLength: 5, hexValue: "0x0100008080" },
  { inputNumber: -2147483648, numberValue: false, byteLength: 5, hexValue: "0x0000008080" },

  // MIN_INTEGER
  { inputNumber: -2147483647, numberValue: true, byteLength: 4, hexValue: "0xffffffff" },
  { inputNumber: -2147483646, numberValue: true, byteLength: 4, hexValue: "0xfeffffff" },

  { inputNumber: -8388609, numberValue: true, byteLength: 4, hexValue: "0x01008080" },
  { inputNumber: -8388608, numberValue: true, byteLength: 4, hexValue: "0x00008080" },
  { inputNumber: -8388607, numberValue: true, byteLength: 3, hexValue: "0xffffff" },
  { inputNumber: -8388606, numberValue: true, byteLength: 3, hexValue: "0xfeffff" },

  { inputNumber: -32769, numberValue: true, byteLength: 3, hexValue: "0x018080" },
  { inputNumber: -32768, numberValue: true, byteLength: 3, hexValue: "0x008080" },
  { inputNumber: -32767, numberValue: true, byteLength: 2, hexValue: "0xffff" },
  { inputNumber: -32766, numberValue: true, byteLength: 2, hexValue: "0xfeff" },
  { inputNumber: -32765, numberValue: true, byteLength: 2, hexValue: "0xfdff" },

  { inputNumber: -257, numberValue: true, byteLength: 2, hexValue: "0x0181" },
  { inputNumber: -256, numberValue: true, byteLength: 2, hexValue: "0x0081" },
  { inputNumber: -255, numberValue: true, byteLength: 2, hexValue: "0xff80" },
  { inputNumber: -254, numberValue: true, byteLength: 2, hexValue: "0xfe80" },

  { inputNumber: -129, numberValue: true, byteLength: 2, hexValue: "0x8180" },
  { inputNumber: -128, numberValue: true, byteLength: 2, hexValue: "0x8080" },

  { inputNumber: -127, numberValue: true, byteLength: 1, hexValue: "0xff" },

  { inputNumber: -126, numberValue: true, byteLength: 1, hexValue: "0xfe" },

  { inputNumber: -2, numberValue: true, byteLength: 1, hexValue: "0x82" },
  { inputNumber: -1, numberValue: true, byteLength: 1, hexValue: "0x81" },

  { inputNumber: 0, numberValue: true, byteLength: 0, hexValue: "0x" },

  { inputNumber: 1, numberValue: true, byteLength: 1, hexValue: "0x01" },
  { inputNumber: 2, numberValue: true, byteLength: 1, hexValue: "0x02" },

  { inputNumber: 126, numberValue: true, byteLength: 1, hexValue: "0x7e" },
  { inputNumber: 127, numberValue: true, byteLength: 1, hexValue: "0x7f" },
  { inputNumber: 128, numberValue: true, byteLength: 2, hexValue: "0x8000" },
  { inputNumber: 129, numberValue: true, byteLength: 2, hexValue: "0x8100" },

  { inputNumber: 255, numberValue: true, byteLength: 2, hexValue: "0xff00" },
  { inputNumber: 256, numberValue: true, byteLength: 2, hexValue: "0x0001" },
  { inputNumber: 257, numberValue: true, byteLength: 2, hexValue: "0x0101" },
  { inputNumber: 258, numberValue: true, byteLength: 2, hexValue: "0x0201" },

  { inputNumber: 32766, numberValue: true, byteLength: 2, hexValue: "0xfe7f" },
  { inputNumber: 32767, numberValue: true, byteLength: 2, hexValue: "0xff7f" },
  { inputNumber: 32768, numberValue: true, byteLength: 3, hexValue: "0x008000" },
  { inputNumber: 32769, numberValue: true, byteLength: 3, hexValue: "0x018000" },

  { inputNumber: 8388606, numberValue: true, byteLength: 3, hexValue: "0xfeff7f" },
  { inputNumber: 8388607, numberValue: true, byteLength: 3, hexValue: "0xffff7f" },

  { inputNumber: 8388607, numberValue: true, byteLength: 3, hexValue: "0xffff7f" },
  { inputNumber: 8388608, numberValue: true, byteLength: 4, hexValue: "0x00008000" },
  { inputNumber: 8388609, numberValue: true, byteLength: 4, hexValue: "0x01008000" },

  { inputNumber: 2147483646, numberValue: true, byteLength: 4, hexValue: "0xfeffff7f" },
  { inputNumber: 2147483647, numberValue: true, byteLength: 4, hexValue: "0xffffff7f" },
  // MAX_INTEGER

  { inputNumber: 2147483648, numberValue: false, byteLength: 5, hexValue: "0x0000008000" },
  { inputNumber: 2147483649, numberValue: false, byteLength: 5, hexValue: "0x0100008000" },
  { inputNumber: 2147483650, numberValue: false, byteLength: 5, hexValue: "0x0200008000" },
];

export default numberTestData;
