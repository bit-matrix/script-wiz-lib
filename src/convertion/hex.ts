const validHex = (hex: string) => hex.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(hex);

const hexLE = (hex: string): string => bytesToHex(hexToBytes(hex).reverse());

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

const hexToBytes = (hex: string): Uint8Array => Uint8Array.from(hexToHexBytes(hex).map((byte) => hexToByte(byte)));

const hexToString = (hex: string): string => bytesToString(hexToBytes(hex));
