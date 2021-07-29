export declare class WizData {
    input: string | number;
    bytes: Uint8Array;
    bin: string;
    hex: string;
    number?: number;
    text?: string;
    private constructor();
    static fromHex(hex: string): WizData;
    static fromBin(bin: string): WizData;
    static fromNumber(number: number): WizData;
    static fromText(text: string): WizData;
}
