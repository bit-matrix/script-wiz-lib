import { Opcode } from "./model/Opcode";
import { opcodesBitcoinTapscript } from "./BITCOIN_TAPSCRIPT";
import { opcodesLiquidSegwit } from "./LIQUID_SEGWIT";

export const opcodesLiquidTapscript: Opcode[] = [...opcodesBitcoinTapscript, ...opcodesLiquidSegwit];
