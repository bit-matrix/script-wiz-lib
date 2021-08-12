export declare const encodings: {
    BECH32: string;
    BECH32M: string;
};
export declare function encode(hrp: string, data: any[], enc: any): string;
export declare function decode(bechString: string, enc: any): {
    hrp: string;
    data: number[];
} | null;
