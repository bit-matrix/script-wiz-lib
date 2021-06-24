import { VM, VM_NETWORK, VM_NETWORK_VERSION } from "./model/VM";
import { Opcode } from "./model/Opcode";
import { opcodesBitcoinSegwit } from "./BITCOIN_SEGWIT";
import { opcodesBitcoinTapscript } from "./BITCOIN_TAPSCRIPT";
import { opcodesLiquidSegwit } from "./LIQUID_SEGWIT";
import { opcodesLiquidTapscript } from "./LIQUID_TAPSCRIPT";

export const opCodes = (vm: VM): Opcode[] => {
  if (vm.network === VM_NETWORK.BTC) {
    if (vm.ver === VM_NETWORK_VERSION.SEGWIT) return opcodesBitcoinSegwit;
    // else if(vm.ver === VM_NETWORK_VERSION.TAPSCRIPT)
    return opcodesBitcoinTapscript;
  }
  // else {
  // if (vm.network === VM_NETWORK.LIQUID) {
  if (vm.ver === VM_NETWORK_VERSION.SEGWIT) return opcodesLiquidSegwit;
  // else if(vm.ver === VM_NETWORK_VERSION.TAPSCRIPT)
  return opcodesLiquidTapscript;
  // }
  // }
};
