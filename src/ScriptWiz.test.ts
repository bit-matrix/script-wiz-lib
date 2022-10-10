import { ScriptWiz } from "./ScriptWiz";
import { VM, VM_NETWORK, VM_NETWORK_VERSION } from "./opcodes/model/VM";

let scriptWiz: ScriptWiz;

beforeAll(() => {
  const testVm: VM = { network: VM_NETWORK.LIQUID, ver: VM_NETWORK_VERSION.SEGWIT };

  scriptWiz = new ScriptWiz(testVm);
});

test("ScripWiz class test", () => {
  scriptWiz.parseHex("4655", false, "aa");
  console.log(scriptWiz.vm);
  console.log(scriptWiz.opCodes);
  console.log(scriptWiz.stackDataList);
});
