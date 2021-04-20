import CryptoJS from "crypto-js";

const ripemd160 = (data: string) => {
  return CryptoJS.RIPEMD160(data).toString();
};

const sha1 = (data: string) => {
  return CryptoJS.SHA1(data).toString();
};

const sha256 = (data: string) => {
  return CryptoJS.SHA256(data).toString();
};

export { ripemd160, sha1, sha256 };
