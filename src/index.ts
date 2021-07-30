import WizData from "./convertion";
import { WizDataList } from "./model";
import { VM, VM_NETWORK, VM_NETWORK_VERSION } from "./opcodes/model/VM";
import { ScriptWiz } from "./scriptWiz";
import { compileFinalInput } from "./scriptWiz/compileFinalInput";

// TO-DO compilefinalinput will remove
export { compileFinalInput, ScriptWiz, WizData, WizDataList, VM, VM_NETWORK, VM_NETWORK_VERSION };
