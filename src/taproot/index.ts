import WizData from "@script-wiz/wiz-data";
import { sha256 } from "../core/crypto";
import { toHexString } from "../utils";
import { commonOpcodes } from "../opcodes/common";
import { Taproot } from "./model";
import * as segwit_addr from "../bech32/segwit_addr";
import bcrypto from "bcrypto";

// type TreeHelper = {
//   data: string;
//   h: string;
// };

export const tweakAdd = (pubkey: WizData, tweak: WizData): WizData => {
  const tweaked = bcrypto.schnorr.publicKeyTweakAdd(Buffer.from(pubkey.hex, "hex"), Buffer.from(tweak.hex, "hex"));
  return WizData.fromHex(tweaked.toString("hex"));
};

export const tagHash = (tag: string, data: WizData) => {
  let hashedTag = sha256(WizData.fromText(tag)).toString();

  hashedTag = hashedTag.concat(hashedTag);

  hashedTag = hashedTag.concat(toHexString(data.bytes));

  return sha256(WizData.fromHex(hashedTag)).toString();
};

export const treeHelper = (scripts: WizData[], version: string): string => {
  let treeHelperResultHex = "";

  scripts.forEach((script) => {
    const scriptLength = WizData.fromNumber(script.hex.length / 2).hex;

    const scriptData = version + scriptLength + script.hex;

    const h = tagHash("TapLeaf", WizData.fromHex(scriptData));

    treeHelperResultHex += h;
  });

  // const tapBranchResult: string = tagHash("TapBranch", WizData.fromHex(treeHelperResultHex));

  return treeHelperResultHex;
};

// export const getVersionTaggedPubKey = (pubkey: WizData): WizData => {
//   const logic = pubkey.bytes[0] & 1;

//   console.log("logic", logic);
//   if (logic === 1) {
//     return WizData.fromHex("00");
//   }

//   return WizData.fromNumber(1);
// };

export const tapRoot = (pubKey: WizData, scripts: WizData[], version: string = "c0"): Taproot => {
  const h: string = treeHelper(scripts, version);
  console.log("tap leaf result", h);

  const tweak = tagHash("TapTweak", WizData.fromHex(pubKey.hex + h));

  console.log("tap tweak result", tweak);

  const tweaked = tweakAdd(pubKey, WizData.fromHex(tweak));

  console.log("tap tweaked result:", tweaked.hex);

  const finalTweaked = tweaked.hex;

  console.log("final tweaked", finalTweaked);

  const op1Hex = commonOpcodes.find((co) => co.word === "OP_1")?.hex.substr(2);

  const bech32 = segwit_addr.encode("bc", 1, WizData.fromHex(finalTweaked).bytes) || "";

  return { scriptPubKey: WizData.fromHex(op1Hex + WizData.fromNumber(finalTweaked.length / 2).hex + finalTweaked), tweak: tweaked, bech32 };
};
