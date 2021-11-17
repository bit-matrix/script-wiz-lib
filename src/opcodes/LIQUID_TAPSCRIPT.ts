import { Opcode } from "./model/Opcode";
import { opcodesBitcoinTapscript } from "./BITCOIN_TAPSCRIPT";
import { opcodesLiquidSegwit } from "./LIQUID_SEGWIT";

export const opcodesLiquidTapscript: Opcode[] = [
  ...opcodesBitcoinTapscript,
  ...opcodesLiquidSegwit,

  /*
   * Conversion
   */
  {
    word: "OP_ADD64",
    opcode: 215,
    hex: "0xd7",
    description:
      " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a + b onto the stack. Push 1 CScriptNum if there is no overflow. Overflow behavior defined above.",
  }, //	liquid network feature.
  {
    word: "OP_SUB64",
    opcode: 216,
    hex: "0xd8",
    description:
      " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a - b onto the stack. Push 1 CScriptNum if there is no overflow. Overflow behavior defined above.",
  }, //	liquid network feature.
  // {
  //   word: "OP_MUL64",
  //   opcode: 217,
  //   hex: "0xd9",
  //   description:
  //     " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a*b onto the stack. Push 1 CScriptNum if there is no overflow. Overflow behavior defined above.",
  // }, //	liquid network feature.
  {
    word: "OP_LESSTHAN64",
    opcode: 220,
    hex: "0xdc",
    description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a < b.",
  }, //	liquid network feature.
  {
    word: "OP_LESSTHANOREQUAL64",
    opcode: 221,
    hex: "0xdd",
    description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a <= b.",
  }, //	liquid network feature.
  {
    word: "OP_GREATERTHAN64",
    opcode: 222,
    hex: "0xde",
    description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a > b.",
  }, //	liquid network feature.
  {
    word: "OP_GREATERTHANOREQUAL64",
    opcode: 223,
    hex: "0xdf",
    description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a >= b.",
  }, //	liquid network feature.
  {
    word: "OP_SCRIPTNUMTOLE64",
    opcode: 224,
    hex: "0xe0",
    description: " pop the stack as minimal CSciptNum, push 8 byte signed LE corresponding to that number.",
  }, //	liquid network feature.
  {
    word: "OP_LE64TOSCRIPTNUM",
    opcode: 225,
    hex: "0xe1",
    description: "pop the stack as a 8 byte signed LE. Convert to CScriptNum and push it, abort on fail.",
  }, //	liquid network feature.
  {
    word: "OP_LE32TOLE64",
    opcode: 226,
    hex: "0xe2",
    description:
      "pop the stack as a 4 byte unsigned LE. Push the corresponding 8 byte signed LE number. Cannot fail, useful for operating of version, locktime, sequence, number of inputs, number of outputs, weight etc.",
  }, //	liquid network feature.

  /*
   * Crypto
   */
  {
    word: "OP_TWEAKVERIFY",
    opcode: 228,
    hex: "0xe4",
    description:
      "Pop the three elements as: 1) 32 byte X-only internal key P, 2) a 32 byte big endian, unsigned scalar k, and 3) 33 byte compressed point Q. Abort if P, Q is invalid or k is not 32 bytes and outside of secp256k1 curve order. Abort if Q != P + k*G where G is the generator for secp256k1.",
  }, //	liquid network feature.
];
