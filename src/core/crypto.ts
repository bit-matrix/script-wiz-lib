import CryptoJS from "crypto-js";
import elliptic from "elliptic";
import BN from "bn.js";
import WizData from "../convertion";

export const ripemd160 = (wizData: WizData): CryptoJS.lib.WordArray => {
  return CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(wizData.hex));
};

export const sha1 = (wizData: WizData): CryptoJS.lib.WordArray => {
  return CryptoJS.SHA1(CryptoJS.enc.Hex.parse(wizData.hex));
};

export const sha256 = (wizData: WizData): CryptoJS.lib.WordArray => {
  return CryptoJS.SHA256(CryptoJS.enc.Hex.parse(wizData.hex));
};

export const hash160 = (wizData: WizData): CryptoJS.lib.WordArray => {
  const dataWithSha256Hashed = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(wizData.hex));
  const dataWithRipemd160Hashed = CryptoJS.RIPEMD160(dataWithSha256Hashed);
  return dataWithRipemd160Hashed;
};

export const hash256 = (wizData: WizData): CryptoJS.lib.WordArray => {
  const firstSHAHash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(wizData.hex));
  const secondSHAHash = CryptoJS.SHA256(firstSHAHash);

  return secondSHAHash;
};

export const ecdsaVerify = (sig: WizData, msg: WizData, pubkey: WizData): WizData => {
  const secp256k1 = new elliptic.ec("secp256k1");
  const hashedMessage = sha256(msg).toString();
  const publicKey = pubkey.hex;
  const signature = sig.hex;

  if (publicKey.length !== 66) throw "ECDSA Verify error : invalid public key length";

  if (!signature.startsWith("30")) throw "ECDSA Verify error : signature must start with 0x30";

  const rAndSDataSize = Number("0x" + signature.substr(2, 2));

  const signatureStringLength = rAndSDataSize * 2 + 4;

  if (signature.length !== signatureStringLength) throw "ECDSA Verify error : signature length invalid";

  const rDataSize = Number("0x" + signature.substr(6, 2));

  const rValue = signature.substr(8, rDataSize * 2);

  const sDataSize = Number("0x" + signature.substr(10 + rDataSize * 2, 2));

  const sValue = signature.substr(10 + rDataSize * 2 + 2, sDataSize * 2);

  const rBn = new BN(rValue, "hex");
  const sBn = new BN(sValue, "hex");

  try {
    return WizData.fromNumber(secp256k1.verify(hashedMessage, { r: rBn, s: sBn }, secp256k1.keyFromPublic(publicKey, "hex")) ? 1 : 0);
  } catch {
    throw "ECDSA Verify error : something went wrong";
  }
};

export const checkSig = (wizData: WizData, wizData2: WizData): WizData => {
  // stackData 1 = signature
  // stackData 2 = pubkey
  const signature = wizData.hex;
  const publicKey = wizData2.hex;

  if (publicKey.length !== 68) return WizData.fromNumber(0);

  if (!signature.startsWith("0x30")) return WizData.fromNumber(0);

  const rAndSDataSize = Number("0x" + signature.substr(4, 2));

  const signatureStringLength = rAndSDataSize * 2 + 6;

  if (signature.length !== signatureStringLength) return WizData.fromNumber(0);

  return WizData.fromNumber(1);
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
