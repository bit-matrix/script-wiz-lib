import WizData from "../convertion";
import * as segwit_addr from "./segwit_addr";

test("xxx", () => {
  const x = "f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c";

  const data = WizData.fromHex(x).bytes;

  const result = segwit_addr.encode("bc", 1, data);
});
