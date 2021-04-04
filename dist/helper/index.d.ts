import { StackData } from "../model";
declare const hexNumber: (number: number) => string;
declare const hexString: (data: string) => string;
declare const hexLittleEndian: (hex: string) => string;
declare const fillStackDataByte: (byteInput: string) => StackData;
declare const fillStackDataNumber: (input: string) => StackData;
declare const fillStackDataString: (input: string) => StackData;
declare const parseInput: (input: string) => StackData;
export { fillStackDataByte, fillStackDataNumber, fillStackDataString, hexLittleEndian, hexNumber, hexString, parseInput };
