import CryptoJS from "crypto-js";
import elliptic from "elliptic";
import BN from "bn.js";

const ripemd160 = (data: string) => {
  return CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(data.substr(2))).toString();
};

const sha1 = (data: string) => {
  return CryptoJS.SHA1(CryptoJS.enc.Hex.parse(data.substr(2))).toString();
};

const sha256 = (data: string) => {
  return CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data.substr(2))).toString();
};

const hash160 = (data: string) => {
  const dataWithSha256Hashed = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data.substr(2)));
  const dataWithRipemd160Hashed = CryptoJS.RIPEMD160(dataWithSha256Hashed).toString();

  return dataWithRipemd160Hashed;
};

const hash256 = (data: string) => {
  const firstSHAHash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data.substr(2)));
  const secondSHAHash = CryptoJS.SHA256(firstSHAHash).toString();

  return secondSHAHash;
};

const ecdsaVerify = (signature: string, message: string, publicKey: string): boolean => {
  const secp256k1 = new elliptic.ec("secp256k1");
  const hashedMessage = sha256(message);

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

  return secp256k1.verify(hashedMessage, { r: rBn, s: sBn }, secp256k1.keyFromPublic(publicKey.slice(2), "hex"));
};

export { hash160, hash256, ripemd160, sha1, sha256, ecdsaVerify };
