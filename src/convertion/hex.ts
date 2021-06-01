import { bytesToHex } from "./bytes";

export const hexFixBytes = (hex: string) => (hex.length % 2 === 0 ? hex : hex.padStart(Math.ceil(hex.length / 2) * 2, "0"));

const validHex = (hex: string) => hex.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(hex);

export const hexLE = (hex: string): string => bytesToHex(hexToBytes(hex).reverse());

const hexToHexBytes = (hex: string): string[] => {
  if (!validHex(hex)) throw "hexToHexBytes: invalid hex string";
  const matches: RegExpMatchArray | null = hex.match(/.{1,2}/g);
  if (matches === null) return [];
  return matches.map((match: string) => match);
};

const hexToByte = (hex: string): number => {
  if (!validHex(hex)) throw "hexToByte: invalid hex string";
  return parseInt(hex, 16);
};

export const hexToBytes = (hex: string): Uint8Array => Uint8Array.from(hexToHexBytes(hex).map((byte) => hexToByte(byte)));

// const hexToString = (hex: string): string => bytesToString(hexToBytes(hex));

interface NumberBoundries {
  minPos: number;
  maxPos: number;
  minNeg: number;
  maxNeg: number;
}

export const hexBoundaries = (bytesLength: number): NumberBoundries | undefined => {
  // 2^(8n-9) <= x <= 2^(8n-1) - 1
  // -2(8n-9) >= x >= -2^(8n-1) + 1

  const b1 = Math.pow(2, 8 * bytesLength - 9);
  const b2 = Math.pow(2, 8 * bytesLength - 1);

  if (0 < bytesLength && bytesLength < 5) {
    return {
      minPos: b1,
      maxPos: b2 - 1,
      minNeg: 1 - b2,
      maxNeg: -1 * b1,
    };
  }

  return;
};
