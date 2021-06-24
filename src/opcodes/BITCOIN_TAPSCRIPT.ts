import { Opcode } from "./model/Opcode";
import { opcodesBitcoinSegwit } from "./BITCOIN_SEGWIT";

export const opcodesBitcoinTapscript: Opcode[] = [...opcodesBitcoinSegwit];
