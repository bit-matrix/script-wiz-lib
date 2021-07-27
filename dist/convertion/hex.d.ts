export declare const hexFixBytes: (hex: string) => string;
export declare const hexLE: (hex: string) => string;
export declare const hexToBytes: (hex: string) => Uint8Array;
interface NumberBoundries {
    minPos: number;
    maxPos: number;
    minNeg: number;
    maxNeg: number;
}
export declare const hexBoundaries: (bytesLength: number) => NumberBoundries | undefined;
export {};
