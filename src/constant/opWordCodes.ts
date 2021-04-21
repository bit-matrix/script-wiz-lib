interface IOpWordCode {
  word: string;
  opcode: number;
  hex: string;
  output?: number;
}

const opWordCodes: IOpWordCode[] = [
  // Constants
  { word: "OP_0", opcode: 0, hex: "0x00", output: 0 },
  { word: "OP_FALSE", opcode: 0, hex: "0x00", output: 0 },
  { word: "OP_TRUE", opcode: 81, hex: "0x51", output: 1 },
  { word: "OP_1", opcode: 81, hex: "0x51", output: 1 },
  { word: "OP_2", opcode: 82, hex: "0x52", output: 2 },
  { word: "OP_3", opcode: 83, hex: "0x53", output: 3 },
  { word: "OP_4", opcode: 84, hex: "0x54", output: 4 },
  { word: "OP_5", opcode: 85, hex: "0x55", output: 5 },
  { word: "OP_6", opcode: 86, hex: "0x56", output: 6 },
  { word: "OP_7", opcode: 87, hex: "0x57", output: 7 },
  { word: "OP_8", opcode: 88, hex: "0x58", output: 8 },
  { word: "OP_9", opcode: 89, hex: "0x59", output: 9 },
  { word: "OP_10", opcode: 90, hex: "0x60", output: 10 },
  { word: "OP_11", opcode: 91, hex: "0x61", output: 11 },
  { word: "OP_12", opcode: 92, hex: "0x62", output: 12 },
  { word: "OP_13", opcode: 93, hex: "0x63", output: 13 },
  { word: "OP_14", opcode: 94, hex: "0x64", output: 14 },
  { word: "OP_15", opcode: 95, hex: "0x65", output: 15 },
  { word: "OP_16", opcode: 96, hex: "0x66", output: 16 },

  //splice
  { word: "OP_CAT", opcode: 126, hex: "0x7e" },
  { word: "OP_SUBSTR", opcode: 127, hex: "0x7f" },

  // Arithmetic
  { word: "OP_ADD", opcode: 147, hex: "0x93" },
  { word: "OP_SUB", opcode: 148, hex: "0x94" },

  // Crypto
  { word: "OP_RIPEMD160", opcode: 166, hex: "0xa6" },
  { word: "OP_SHA1", opcode: 167, hex: "0xa7" },
  { word: "OP_SHA256", opcode: 168, hex: "0xa8" },
  { word: "OP_HASH160", opcode: 169, hex: "0xa9" },
  { word: "OP_HASH256", opcode: 170, hex: "0xaa" },

  // Stack
  { word: "OP_2DROP", opcode: 109, hex: "0x6d" },
  { word: "OP_DROP", opcode: 117, hex: "0x75" },
  { word: "OP_OVER", opcode: 120, hex: "0x78" },
  { word: "OP_SWAP", opcode: 124, hex: "0x7c" },
  { word: "OP_2SWAP", opcode: 114, hex: "0x72" },
];

export default opWordCodes;
export { IOpWordCode };
