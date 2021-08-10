import WizData from "../convertion";
import { sha256 } from "../core/crypto";
import { toHexString } from "../utils";

export const tagHash = (tag: string, data: Uint8Array) => {
  let hashedTag = sha256(WizData.fromText(tag)).toString();

  hashedTag = hashedTag.concat(hashedTag);

  hashedTag = hashedTag.concat(toHexString(data));

  return sha256(WizData.fromHex(hashedTag)).toString();
};

export const treeHelper = (script: string): string => {
  const versionData = "c0";
  const scriptLength = WizData.fromNumber(script.length / 2).hex;

  return versionData + scriptLength + script;
};
