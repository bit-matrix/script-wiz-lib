import WizData from "@script-wiz/wiz-data";
export declare type ParseResultData = {
    main: {
        addDataArray: WizData[];
        removeLastSize: number;
    };
    alt: {
        addData?: WizData;
        removeLastStackData: boolean;
    };
    flow?: boolean[];
    altFlow?: boolean[];
    isStackFailed?: boolean;
    codeSeperators?: string[];
};
export declare type ParseResult = ParseResultData & {
    inputHex: string;
    errorMessage?: string;
};
