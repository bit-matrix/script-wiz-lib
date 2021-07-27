import { init, parseInput } from "..";
import { VM, VM_NETWORK, VM_NETWORK_VERSION } from "../../opcodes/model/VM";

beforeAll(() => {
  const testVm: VM = { network: VM_NETWORK.LIQUID, ver: VM_NETWORK_VERSION.SEGWIT };

  init(testVm);
});

test("Scrip wiz index test", () => {
  const init = parseInput("OP_15");
  console.log(init);
});
