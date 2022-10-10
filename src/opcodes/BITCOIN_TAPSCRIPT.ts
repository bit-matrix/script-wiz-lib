import { Opcode } from "./model/Opcode";
import { opcodesBitcoinSegwit } from "./BITCOIN_SEGWIT";

export const opcodesBitcoinTapscript: Opcode[] = [
  ...opcodesBitcoinSegwit,
  {
    word: "OP_CHECKSIGADD",
    opcode: 186,
    hex: "0xba",
    description:
      "The entire transaction's outputs, inputs, and script (from the most recently-executed OP_CODESEPARATOR to the end) are hashed. The signature used by OP_CHECKSIGADD must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.",
  },
];
