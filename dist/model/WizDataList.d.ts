import WizData from "@script-wiz/wiz-data";
import { TxData } from "./TxData";
export declare type WizDataList = {
    inputHexes: string[];
    main: WizData[];
    alt: WizData[];
    flow: boolean[];
    altFlow: boolean[];
    isStackFailed: boolean;
    errorMessage?: string;
    txData?: TxData;
};
