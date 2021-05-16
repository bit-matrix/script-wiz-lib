import { StackData } from "../model";
declare const log: (base: number, x: number) => number;
declare const getNumberByteLength: (x: number) => number;
declare const getNumberByteLengthEx: (x: number) => number;
declare const hexNumber: (number: number) => string;
declare const stackNumber: (input: string) => StackData;
export { log, getNumberByteLength, getNumberByteLengthEx, hexNumber };
export default stackNumber;
