import { tagHash, tapRoot, treeHelper, tweakAdd } from ".";
import WizData from "../convertion";

test("xxx", () => {
  const x = "038a759932b19c2bf441e4e37a0243f03364df38cec1c658743dffa56c334dfb2d";

  const data = WizData.fromHex(x);

  console.log(data.bytes[0] & 1);
});

test("taghash test", () => {
  let byteArrayData = new Uint8Array(1);
  byteArrayData[0] = 10;

  const tag = "TapLeaf";

  const result = tagHash(
    "TapTweak",
    WizData.fromHex("03e3c4cda9de3c372bba88dc68d680adf3beee6c3067deedfb9991758ad0bcdeaf" + "0f20d41260bd81c46f4ee8a388b0f139d107f707e38fb2525f191b83a49c5013")
  );

  expect(result).toBe("9aacaf264e5801ce3fb094dedd7435977f6ebb9e5a0d99a70406525158cf9244");
});

test("tree helper test", () => {
  const data = "55935787";
  const result = treeHelper(WizData.fromHex(data), "c0");

  expect(result.data).toBe("c00455935787");
  expect(result.h).toBe("0f20d41260bd81c46f4ee8a388b0f139d107f707e38fb2525f191b83a49c5013");

  WizData.fromHex("021dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624").bytes,
    WizData.fromHex("542d433b81daf3e28069bccbb0d951d7d9ca57cc0f563f2de126e91deba7d6a6").bytes;
});

test("tweakAdd test", () => {
  const pubkey = WizData.fromHex("021dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624").bytes;
  const tweak = WizData.fromHex("542d433b81daf3e28069bccbb0d951d7d9ca57cc0f563f2de126e91deba7d6a6").bytes;

  const result = tweakAdd(pubkey, tweak);

  expect(result.hex).toBe("0326fef75b96729c1753eeac93309ae90c8a06192ea5b1b13175e239743ec11c4a");
});

test("taproot test", () => {
  const pubkey = "021dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624";
  const script = "515293";

  const result = tapRoot(WizData.fromHex(pubkey), WizData.fromHex(script));
  console.log(result);
});
