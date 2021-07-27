import WizData from "../convertion";
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
};
export declare type ParseResult = ParseResultData & {
    inputHex: string;
    errorMessage?: string;
};
