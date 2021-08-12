import { Opcode } from "./model/Opcode";
import { commonOpcodes } from "./common";

export const opcodesBitcoinSegwit: Opcode[] = [
  ...commonOpcodes,
  { word: "OP_EQUAL", opcode: 135, hex: "0x87", description: "Returns 1 if the inputs are exactly equal, 0 otherwise." },
]; //	x1 x2	True / false	Returns 1 if the inputs are exactly equal, 0 otherwise.];
