import WizData from "../convertion";
import { sha256 } from "../core/crypto";
import { toHexString } from "../utils";
import * as secp256k1 from "secp256k1";

export const tagHash = (tag: string, data: Uint8Array) => {
  let hashedTag = sha256(WizData.fromText(tag)).toString();

  hashedTag = hashedTag.concat(hashedTag);

  hashedTag = hashedTag.concat(toHexString(data));

  return sha256(WizData.fromHex(hashedTag)).toString();
};

export const treeHelper = (script: string) => {
  const versionData = "c0";
  const scriptLength = WizData.fromNumber(script.length / 2).hex;

  const scriptData = versionData + scriptLength + script;

  const h = tagHash("TapLeaf", WizData.fromHex(scriptData).bytes);

  return { data: versionData + scriptLength + script, h };
};

export const tapRoot = (pubKey: string, script: string) => {
  const { h } = treeHelper(script);
  const tweak = tagHash("TapTweak", WizData.fromHex(pubKey + h).bytes);
};

export const tweakAdd = (pubkey: Uint8Array, tweak: Uint8Array): string => {
  const tweaked = secp256k1.publicKeyTweakAdd(pubkey, tweak);
  return toHexString(tweaked);
};
