import { ScriptWiz } from "..";
import { VM, VM_NETWORK, VM_NETWORK_VERSION } from "../../opcodes/model/VM";

let scriptWiz: ScriptWiz;

beforeAll(() => {
  const testVm: VM = { network: VM_NETWORK.LIQUID, ver: VM_NETWORK_VERSION.SEGWIT };

  scriptWiz = new ScriptWiz(testVm);
});

test("ScripWiz class test", () => {
  scriptWiz.parseInput("<0x4655>");
  console.log(scriptWiz.vm);
  console.log(scriptWiz.opCodes);
  console.log(scriptWiz.stackDataList);
});
