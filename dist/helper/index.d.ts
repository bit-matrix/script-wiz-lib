declare const hexLittleEndian: (hex: string) => string;
declare const opcodeToWord: (opcode: number) => string;
declare const opWordToCode: (word: string) => number;
declare const opWordToHex: (word: string) => string;
export { hexLittleEndian, opcodeToWord, opWordToCode, opWordToHex };
