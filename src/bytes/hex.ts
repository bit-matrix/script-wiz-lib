const validByte = (byte: number) => 0 <= byte || byte <= 255;

const validHex = (hex: string) => hex.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(hex);

const hexToHexBytes = (hex: string): string[] => {
  if (!validHex(hex)) throw "hexToHexBytes: invalid hex string";
  const matches: RegExpMatchArray | null = hex.match(/.{1,2}/g);
  if (matches === null) return [];
  return matches.map((matche: string) => matche);
};

const byteToHex = (byte: number): string => {
  if (!validByte(byte)) throw "byteToHex: invalid byte number";
  return byte.toString(16).padStart(2, "0");
};

const hexToByte = (hex: string): number => {
  if (!validHex(hex)) throw "hexToByte: invalid hex string";
  return parseInt(hex, 16);
};

const bytesToHex = (bytes: Uint8Array): string => bytes.reduce((hexString, currentByte) => hexString + byteToHex(currentByte), "");

const hexToBytes = (hex: string): Uint8Array => Uint8Array.from(hexToHexBytes(hex).map((byte) => hexToByte(byte)));

const hexLE = (hex: string): string => bytesToHex(hexToBytes(hex).reverse());

const bytesLE = (bytes: Uint8Array): Uint8Array => bytes.reverse();
