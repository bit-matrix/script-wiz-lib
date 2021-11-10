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
