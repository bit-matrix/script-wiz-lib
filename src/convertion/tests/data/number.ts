export const numberTestData = [
  { inputNumber: -2147483650, numberValue: false, byteLength: 5, hexValue: "0x0200008080", binValue: "0b1000000010000000000000000000000000000010" },
  { inputNumber: -2147483649, numberValue: false, byteLength: 5, hexValue: "0x0100008080", binValue: "0b1000000010000000000000000000000000000001" },
  { inputNumber: -2147483648, numberValue: false, byteLength: 5, hexValue: "0x0000008080", binValue: "0b1000000010000000000000000000000000000000" },

  // MIN_INTEGER
  { inputNumber: -2147483647, numberValue: true, byteLength: 4, hexValue: "0xffffffff", binValue: "0b11111111111111111111111111111111" },
  { inputNumber: -2147483646, numberValue: true, byteLength: 4, hexValue: "0xfeffffff", binValue: "0b11111111111111111111111111111110" },

  { inputNumber: -8388609, numberValue: true, byteLength: 4, hexValue: "0x01008080", binValue: "0b10000000100000000000000000000001" },
  { inputNumber: -8388608, numberValue: true, byteLength: 4, hexValue: "0x00008080", binValue: "0b10000000100000000000000000000000" },

  { inputNumber: -8388607, numberValue: true, byteLength: 3, hexValue: "0xffffff", binValue: "0b111111111111111111111111" },
  { inputNumber: -8388606, numberValue: true, byteLength: 3, hexValue: "0xfeffff", binValue: "0b111111111111111111111110" },

  { inputNumber: -32769, numberValue: true, byteLength: 3, hexValue: "0x018080", binValue: "0b100000001000000000000001" },
  { inputNumber: -32768, numberValue: true, byteLength: 3, hexValue: "0x008080", binValue: "0b100000001000000000000000" },

  { inputNumber: -32767, numberValue: true, byteLength: 2, hexValue: "0xffff", binValue: "0b1111111111111111" },
  { inputNumber: -32766, numberValue: true, byteLength: 2, hexValue: "0xfeff", binValue: "0b1111111111111110" },
  { inputNumber: -32765, numberValue: true, byteLength: 2, hexValue: "0xfdff", binValue: "0b1111111111111101" },

  { inputNumber: -257, numberValue: true, byteLength: 2, hexValue: "0x0181", binValue: "0b1000000100000001" },
  { inputNumber: -256, numberValue: true, byteLength: 2, hexValue: "0x0081", binValue: "0b1000000100000000" },
  { inputNumber: -255, numberValue: true, byteLength: 2, hexValue: "0xff80", binValue: "0b1000000011111111" },
  { inputNumber: -254, numberValue: true, byteLength: 2, hexValue: "0xfe80", binValue: "0b1000000011111110" },

  { inputNumber: -129, numberValue: true, byteLength: 2, hexValue: "0x8180", binValue: "0b1000000010000001" },
  { inputNumber: -128, numberValue: true, byteLength: 2, hexValue: "0x8080", binValue: "0b1000000010000000" },

  { inputNumber: -127, numberValue: true, byteLength: 1, hexValue: "0xff", binValue: "0b11111111" },
  { inputNumber: -126, numberValue: true, byteLength: 1, hexValue: "0xfe", binValue: "0b11111110" },

  { inputNumber: -2, numberValue: true, byteLength: 1, hexValue: "0x82", binValue: "0b10000010" },
  { inputNumber: -1, numberValue: true, byteLength: 1, hexValue: "0x81", binValue: "0b10000001" },

  { inputNumber: 0, numberValue: true, byteLength: 0, hexValue: "0x", binValue: "0b" },

  { inputNumber: 1, numberValue: true, byteLength: 1, hexValue: "0x01", binValue: "0b00000001" },
  { inputNumber: 2, numberValue: true, byteLength: 1, hexValue: "0x02", binValue: "0b00000010" },

  { inputNumber: 126, numberValue: true, byteLength: 1, hexValue: "0x7e", binValue: "0b01111110" },
  { inputNumber: 127, numberValue: true, byteLength: 1, hexValue: "0x7f", binValue: "0b01111111" },
  { inputNumber: 128, numberValue: true, byteLength: 2, hexValue: "0x8000", binValue: "0b0000000010000000" },
  { inputNumber: 129, numberValue: true, byteLength: 2, hexValue: "0x8100", binValue: "0b0000000010000001" },

  { inputNumber: 255, numberValue: true, byteLength: 2, hexValue: "0xff00", binValue: "0b0000000011111111" },
  { inputNumber: 256, numberValue: true, byteLength: 2, hexValue: "0x0001", binValue: "0b0000000100000000" },
  { inputNumber: 257, numberValue: true, byteLength: 2, hexValue: "0x0101", binValue: "0b0000000100000001" },
  { inputNumber: 258, numberValue: true, byteLength: 2, hexValue: "0x0201", binValue: "0b0000000100000010" },

  { inputNumber: 32766, numberValue: true, byteLength: 2, hexValue: "0xfe7f", binValue: "0b0111111111111110" },
  { inputNumber: 32767, numberValue: true, byteLength: 2, hexValue: "0xff7f", binValue: "0b0111111111111111" },
  { inputNumber: 32768, numberValue: true, byteLength: 3, hexValue: "0x008000", binValue: "0b000000001000000000000000" },
  { inputNumber: 32769, numberValue: true, byteLength: 3, hexValue: "0x018000", binValue: "0b000000001000000000000001" },

  { inputNumber: 8388606, numberValue: true, byteLength: 3, hexValue: "0xfeff7f", binValue: "0b011111111111111111111110" },
  { inputNumber: 8388607, numberValue: true, byteLength: 3, hexValue: "0xffff7f", binValue: "0b011111111111111111111111" },
  { inputNumber: 8388608, numberValue: true, byteLength: 4, hexValue: "0x00008000", binValue: "0b00000000100000000000000000000000" },
  { inputNumber: 8388609, numberValue: true, byteLength: 4, hexValue: "0x01008000", binValue: "0b00000000100000000000000000000001" },

  { inputNumber: 2147483646, numberValue: true, byteLength: 4, hexValue: "0xfeffff7f", binValue: "0b01111111111111111111111111111110" },
  { inputNumber: 2147483647, numberValue: true, byteLength: 4, hexValue: "0xffffff7f", binValue: "0b01111111111111111111111111111111" },
  // MAX_INTEGER

  { inputNumber: 2147483648, numberValue: false, byteLength: 5, hexValue: "0x0000008000", binValue: "0b0000000010000000000000000000000000000000" },
  { inputNumber: 2147483649, numberValue: false, byteLength: 5, hexValue: "0x0100008000", binValue: "0b0000000010000000000000000000000000000001" },
  { inputNumber: 2147483650, numberValue: false, byteLength: 5, hexValue: "0x0200008000", binValue: "0b0000000010000000000000000000000000000010" },
];
