import { Opcode } from "./model/Opcode";
import { opcodesBitcoinSegwit } from "./BITCOIN_SEGWIT";

export const opcodesLiquidSegwit: Opcode[] = [
  ...opcodesBitcoinSegwit,

  /*
   * Constants
   * * 0 - 96
   */

  /*
   * Flow control
   * * 97 - 106
   */

  /*
   * Stack
   * * 107 - 125
   */

  /*
   * Splice
   * 126 - 130
   */
  { word: "OP_CAT", opcode: 126, hex: "0x7e", description: "Concatenates two strings." }, //	x1 x2	out	Concatenates two strings. disabled.
  { word: "OP_SUBSTR", opcode: 127, hex: "0x7f", description: "Returns a section of a string." }, //	in begin size	out	Returns a section of a string. disabled.
  { word: "OP_LEFT", opcode: 128, hex: "0x80", description: "Keeps only characters left of the specified point in a string." }, //	in size	out	Keeps only characters left of the specified point in a string. disabled.
  { word: "OP_RIGHT", opcode: 129, hex: "0x81", description: "Keeps only characters right of the specified point in a string" }, //	in size	out	Keeps only characters right of the specified point in a string. disabled.

  /*
   * Bitwise logic
   * 131 - 136
   */
  { word: "OP_INVERT", opcode: 131, hex: "0x83", description: "Flips all of the bits in the input." }, //	in	out	Flips all of the bits in the input. disabled.
  { word: "OP_AND", opcode: 132, hex: "0x84", description: "Boolean and between each bit in the inputs." }, //	x1 x2	out	Boolean and between each bit in the inputs. disabled.
  { word: "OP_OR", opcode: 133, hex: "0x85", description: "Boolean or between each bit in the inputs." }, //	x1 x2	out	Boolean or between each bit in the inputs. disabled.
  { word: "OP_XOR", opcode: 134, hex: "0x86", description: "Boolean exclusive or between each bit in the inputs." }, //	x1 x2	out	Boolean exclusive or between each bit in the inputs. disabled.

  /*
   * Arithmetic
   * 139 - 165
   */
  { word: "OP_LSHIFT", opcode: 152, hex: "0x98", description: "Shifts a left b bits, preserving sign." }, //	a b	out	Shifts a left b bits, preserving sign. disabled.
  { word: "OP_RSHIFT", opcode: 153, hex: "0x99", description: "Shifts a right b bits, preserving sign." }, //	a b	out	Shifts a right b bits, preserving sign. disabled.

  /*
   * Crypto
   * 166 - 175
   */

  /*
   * Locktime
   * 177 - 178
   */

  /*
   * Reserved words
   * 80, 98, 101, 102, 137, 138, 176, 179-185
   */

  /*
   * Liquid words
   * 193, 194, 195
   */
  {
    word: "OP_CHECKSIGFROMSTACK",
    opcode: 193,
    hex: "0xc1",
    description:
      "Pop the top 3 items from the stack. Treat the top as a public key, the second as a message, and the third as a signature. If the signature is valid, push a Script Number 1, otherwise push a Script Number 0.",
  },
  {
    word: "OP_CHECKSIGFROMSTACKVERIFY",
    opcode: 194,
    hex: "0xc2",
    description:
      "Pop the top 3 items from the stack. Treat the top as a public key, the second as a message, and the third as a signature. If the signature is valid, push a Script Number 1, otherwise push a Script Number 0.",
  },
  { word: "OP_SUBSTR_LAZY", opcode: 195, hex: "0xc3", description: "Returns a section of a string." }, //	liquid network feature.

  /*
   * Pseudo-words
   * 253 - 255
   */
];
