declare const ripemd160: (data: string) => string;
declare const sha1: (data: string) => string;
declare const sha256: (data: string) => string;
declare const hash160: (data: string) => string;
declare const hash256: (data: string) => string;
declare const ecdsaVerify: (signature: string, message: string, publicKey: string) => boolean;
export { hash160, hash256, ripemd160, sha1, sha256, ecdsaVerify };
