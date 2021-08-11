import WizData from "../convertion";
import { sha256 } from "../core/crypto";
import { toHexString } from "../utils";
import * as secp256k1 from "secp256k1";
import { commonOpcodes } from "../opcodes/common";

export const tagHash = (tag: string, data: Uint8Array) => {
  let hashedTag = sha256(WizData.fromText(tag)).toString();

  hashedTag = hashedTag.concat(hashedTag);

  hashedTag = hashedTag.concat(toHexString(data));

  return sha256(WizData.fromHex(hashedTag)).toString();
};

export const treeHelper = (script: string, version: string) => {
  const versionData = version;
  const scriptLength = WizData.fromNumber(script.length / 2).hex;

  const scriptData = versionData + scriptLength + script;

  const h = tagHash("TapLeaf", WizData.fromHex(scriptData).bytes);

  return { data: versionData + scriptLength + script, h };
};

export const tweakAdd = (pubkey: Uint8Array, tweak: Uint8Array): string => {
  const tweaked = secp256k1.publicKeyTweakAdd(pubkey, tweak);
  return toHexString(tweaked);
};

export const tapRoot = (pubKey: string, script: string, version: string = "c0") => {
  const pubkeyData = WizData.fromHex(pubKey);

  const { h } = treeHelper(script, version);

  const tweak = tagHash("TapTweak", WizData.fromHex(pubKey + h).bytes);

  const tweaked = tweakAdd(pubkeyData.bytes, WizData.fromHex(tweak).bytes);

  // @TODO 00 OR 01
  const finalTweaked = "00" + tweaked.substr(2);

  const op1Hex = commonOpcodes.find((co) => co.word === "OP_1")?.hex.substr(2);

  return op1Hex + WizData.fromNumber(finalTweaked.length / 2).hex + finalTweaked;
};
