import CryptoJS from "crypto-js";
import elliptic from "elliptic";
import BN from "bn.js";
import WizData from "../convertion";

export const ripemd160 = (wizData: WizData): CryptoJS.lib.WordArray => {
  return CryptoJS.RIPEMD160(wizData.hex);
};

export const sha1 = (wizData: WizData): CryptoJS.lib.WordArray => {
  return CryptoJS.SHA1(wizData.hex);
};

export const sha256 = (wizData: WizData): CryptoJS.lib.WordArray => {
  return CryptoJS.SHA256(wizData.hex);
};

export const hash160 = (wizData: WizData): CryptoJS.lib.WordArray => {
  const dataWithSha256Hashed = CryptoJS.SHA256(wizData.hex);
  const dataWithRipemd160Hashed = CryptoJS.RIPEMD160(dataWithSha256Hashed);
  return dataWithRipemd160Hashed;
};

export const hash256 = (wizData: WizData): CryptoJS.lib.WordArray => {
  const firstSHAHash = CryptoJS.SHA256(wizData.hex);
  const secondSHAHash = CryptoJS.SHA256(firstSHAHash);

  return secondSHAHash;
};

export const ecdsaVerify = (signature: WizData, message: WizData, publicKey: WizData): boolean => {
  const secp256k1 = new elliptic.ec("secp256k1");

  const hashedMessage = sha256(message);

  const publicKeyHex = publicKey.hex;
  const signatrueHex = signature.hex;

  if (publicKeyHex.length !== 66) throw "ECDSA Verify error : invalid public key length";

  if (!signatrueHex.startsWith("30")) throw "ECDSA Verify error : signature must start with 0x30";

  const rAndSDataSize = Number("0x" + signatrueHex.substr(2, 2));

  const signatureStringLength = rAndSDataSize * 2 + 4;

  if (signatrueHex.length !== signatureStringLength) throw "ECDSA Verify error : signature length invalid";

  const rDataSize = Number("0x" + signatrueHex.substr(6, 2));

  const rValue = signatrueHex.substr(10, rDataSize * 2);

  const sDataSize = Number("0x" + signatrueHex.substr(10 + rDataSize * 2, 2));

  const sValue = signatrueHex.substr(12 + rDataSize * 2 + 2, sDataSize * 2);

  console.log(rValue);
  console.log(sValue);

  const rBn = new BN(rValue, "hex");
  const sBn = new BN(sValue, "hex");

  try {
    return secp256k1.verify(hashedMessage.toString(), { r: rBn, s: sBn }, secp256k1.keyFromPublic(publicKey.hex, "hex"));
  } catch {
    throw "ECDSA Verify error : something went wrong";
  }
};

// const ECDSA = (messageHash: string, publicKey: string): string => {
//   const EC = elliptic.ec;

//   // Create and initialize EC context
//   // (better do it once and reuse it)
//   const ec = new EC("secp256k1");

//   // Generate keys
//   const key = ec.genKeyPair();

//   // Sign the message's hash (input must be an array, or a hex-string)
//   const signature = key.sign(messageHash);

//   // Export DER encoded signature in Array
//   const derSign = signature.toDER();

//   return derSign;
// };
