import { StackData } from "../model";
import { getNumberByteLength, hexNumber } from "./byteNumber";
declare const hexString: (data: string) => string;
declare const hexLittleEndian: (hex: string) => string;
declare const fillStackDataByte: (byteInput: string) => StackData;
declare const fillStackDataNumber: (input: string) => StackData;
declare const fillStackDataString: (input: string) => StackData;
declare const parseInput: (input: string) => StackData;
export { fillStackDataByte, fillStackDataNumber, fillStackDataString, hexLittleEndian, getNumberByteLength, hexNumber, hexString, parseInput };
