import CryptoJS from "crypto-js";
import elliptic from "elliptic";
import BN from "bn.js";

const RIPEMD160 = (data: string) => {
  return CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(data.substr(2))).toString();
};

const SHA1 = (data: string) => {
  return CryptoJS.SHA1(CryptoJS.enc.Hex.parse(data.substr(2))).toString();
};

const SHA256 = (data: string) => {
  return CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data.substr(2))).toString();
};

const HASH160 = (data: string) => {
  const dataWithSha256Hashed = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data.substr(2)));
  const dataWithRipemd160Hashed = CryptoJS.RIPEMD160(dataWithSha256Hashed).toString();

  return dataWithRipemd160Hashed;
};

const HASH256 = (data: string) => {
  const firstSHAHash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data.substr(2)));
  const secondSHAHash = CryptoJS.SHA256(firstSHAHash).toString();

  return secondSHAHash;
};

const ECDSA = (messageHash: string, publicKey: string): string => {
  const EC = elliptic.ec;

  // Create and initialize EC context
  // (better do it once and reuse it)
  const ec = new EC("secp256k1");

  // Generate keys
  const key = ec.genKeyPair();

  // Sign the message's hash (input must be an array, or a hex-string)
  const signature = key.sign(messageHash);

  // Export DER encoded signature in Array
  const derSign = signature.toDER();

  return derSign;
};

const ECDSAVerify = (signature: string, message: string, publicKey: string): boolean => {
  const secp256k1 = new elliptic.ec("secp256k1");
  const hashedMessage = SHA256(message);

  if (publicKey.length < 68) throw "ECDSA Verify error : invalid public key length";

  if (!signature.startsWith("0x30")) throw "ECDSA Verify error : signature must start with 0x30";

  const rAndSDataSize = Number("0x" + signature.substr(4, 2));

  const signatureStringLength = rAndSDataSize * 2 + 6;

  if (signature.length !== signatureStringLength) throw "ECDSA Verify error : signature length invalid";

  const rDataSize = Number("0x" + signature.substr(8, 2));

  const rValue = signature.substr(10, rDataSize * 2);

  const sDataSize = Number("0x" + signature.substr(12 + rDataSize * 2, 2));

  const sValue = signature.substr(12 + rDataSize * 2 + 2, sDataSize * 2);

  const rBn = new BN(rValue, "hex");
  const sBn = new BN(sValue, "hex");

  try {
    return secp256k1.verify(hashedMessage, { r: rBn, s: sBn }, secp256k1.keyFromPublic(publicKey.slice(2), "hex"));
  } catch {
    throw "ECDSA Verify error : something went wrong";
  }
};

export { HASH160, HASH256, RIPEMD160, SHA1, SHA256, ECDSA, ECDSAVerify };
