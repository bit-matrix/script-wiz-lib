declare const RIPEMD160: (data: string) => string;
declare const SHA1: (data: string) => string;
declare const SHA256: (data: string) => string;
declare const HASH160: (data: string) => string;
declare const HASH256: (data: string) => string;
declare const ECDSA: (messageHash: string, publicKey: string) => string;
declare const ECDSAVerify: (signature: string, message: string, publicKey: string) => boolean;
export { HASH160, HASH256, RIPEMD160, SHA1, SHA256, ECDSA, ECDSAVerify };
