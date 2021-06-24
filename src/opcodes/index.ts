import { VM, VM_NETWORK, VM_NETWORK_VERSION } from "./model/VM";
import { Opcode } from "./model/Opcode";
import { opcodesBitcoinSegwit } from "./BITCOIN_SEGWIT";
import { opcodesBitcoinTapscript } from "./BITCOIN_TAPSCRIPT";
import { opcodesLiquidSegwit } from "./LIQUID_SEGWIT";
import { opcodesLiquidTapscript } from "./LIQUID_TAPSCRIPT";

const opcodes = (vm: VM): Opcode[] => {
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

export class Opcodes {
  vm: VM;
  data: Opcode[];

  constructor(vm: VM) {
    this.vm = vm;
    this.data = opcodes(vm);
  }

  wordData = (word: string): Opcode | undefined => this.data.find((d) => d.word === word);
  wordCode = (word: string): number => {
    const code = this.wordData(word)?.opcode;
    return code === undefined ? -1 : code;
  };
  wordHex = (word: string): string => this.wordData(word)?.hex || "";

  codeData = (code: number): Opcode | undefined => this.data.find((d) => d.opcode === code);
  codeWord = (code: number): string => this.codeData(code)?.word || "";
}
