import WizData from "../convertion";
import { sha256 } from "../core/crypto";
import { toHexString } from "../utils";
import * as secp256k1 from "secp256k1";
import { commonOpcodes } from "../opcodes/common";
import { Taproot } from "./model";

export const tweakAdd = (pubkey: Uint8Array, tweak: Uint8Array): WizData => {
  const tweaked = secp256k1.publicKeyTweakAdd(pubkey, tweak);
  return WizData.fromHex(toHexString(tweaked));
};

export const tagHash = (tag: string, data: WizData) => {
  let hashedTag = sha256(WizData.fromText(tag)).toString();

  hashedTag = hashedTag.concat(hashedTag);

  hashedTag = hashedTag.concat(toHexString(data.bytes));

  return sha256(WizData.fromHex(hashedTag)).toString();
};

export const treeHelper = (script: WizData, version: string) => {
  const scriptLength = WizData.fromNumber(script.hex.length / 2).hex;

  const scriptData = version + scriptLength + script.hex;

  const h = tagHash("TapLeaf", WizData.fromHex(scriptData));

  return { data: version + scriptLength + script.hex, h };
};

// export const getVersionTaggedPubKey = (pubkey: WizData): WizData => {
//   const logic = pubkey.bytes[0] & 1;

//   console.log("logic", logic);
//   if (logic === 1) {
//     return WizData.fromHex("00");
//   }

//   return WizData.fromNumber(1);
// };

export const tapRoot = (pubKey: WizData, script: WizData, version: string = "c0"): Taproot => {
  const { h } = treeHelper(script, version);

  const tweak = tagHash("TapTweak", WizData.fromHex(pubKey.hex + h));

  const tweaked = tweakAdd(pubKey.bytes, WizData.fromHex(tweak).bytes);

  const finalTweaked = tweaked.hex.substr(2);

  const op1Hex = commonOpcodes.find((co) => co.word === "OP_1")?.hex.substr(2);

  return { scriptPubKey: WizData.fromHex(op1Hex + WizData.fromNumber(finalTweaked.length / 2).hex + finalTweaked), tweak: tweaked };
};
