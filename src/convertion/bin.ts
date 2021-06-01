export const binFixBytes = (bin: string): string => (bin.length % 8 === 0 ? bin : bin.padStart(Math.ceil(bin.length / 8) * 8, "0"));

const validBin = (bin: string): boolean => !/[^01]/u.test(bin) && bin.length % 8 === 0;

const binToBinBytes = (bin: string): string[] => {
  if (!validBin(bin)) throw "binToBinBytes: invalid bin string";
  const matches: RegExpMatchArray | null = bin.match(/.{1,8}/g);
  if (matches === null) return [];
  return matches.map((match: string) => match);
};

const binToByte = (bin: string): number => parseInt(bin, 2);

export const binToBytes = (bin: string) =>
  Uint8Array.from(
    binToBinBytes(bin)
      .reverse()
      .map((binByte) => binToByte(binByte))
  );
