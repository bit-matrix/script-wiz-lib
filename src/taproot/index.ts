import WizData from "../convertion";
import { sha256 } from "../core/crypto";
import { toHexString } from "../utils";

export const tagHash = (tag: string, data: Uint8Array) => {
  let hashedTag = sha256(WizData.fromText(tag)).toString();

  hashedTag = hashedTag.concat(hashedTag);

  // let versionData = WizData.fromHex("c0").hex;

  // hashedTag = hashedTag.concat(versionData);

  // let scriptLength = WizData.fromNumber(data.length).hex;

  // hashedTag = hashedTag.concat(scriptLength);

  hashedTag = hashedTag.concat(toHexString(data));

  return sha256(WizData.fromHex(hashedTag)).toString();
};
