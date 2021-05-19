const validByte = (byte: number) => 0 <= byte || byte <= 255;

const byteToHex = (byte: number): string => {
  if (!validByte(byte)) throw "byteToHex: invalid byte number";
  return byte.toString(16).padStart(2, "0");
};

const bytesToHex = (bytes: Uint8Array): string => bytes.reduce((hexString, currentByte) => hexString + byteToHex(currentByte), "");

const bytesLE = (bytes: Uint8Array): Uint8Array => bytes.reverse();
