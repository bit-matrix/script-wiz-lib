import { Opcode } from "./model/Opcode";
import { opcodesBitcoinTapscript } from "./BITCOIN_TAPSCRIPT";
import { opcodesLiquidSegwit } from "./LIQUID_SEGWIT";

export const opcodesLiquidTapscript: Opcode[] = [
  ...opcodesBitcoinTapscript,
  ...opcodesLiquidSegwit,
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
