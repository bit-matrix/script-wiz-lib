import WizData from "@script-wiz/wiz-data";
import { model } from "@script-wiz/lib-core";
export declare type WizDataList = {
    inputHexes: string[];
    main: WizData[];
    alt: WizData[];
    flow: boolean[];
    altFlow: boolean[];
    isStackFailed: boolean;
    errorMessage?: string;
    txData?: model.TxData;
};
