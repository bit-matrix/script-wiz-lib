import WizData from "../convertion";
import { WizDataList } from "../model";
export declare const flowIf: (wizDataList: WizDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
export declare const flowNotIf: (wizDataList: WizDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
export declare const flowElse: (wizDataList: WizDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
export declare const flowEndIf: (wizDataList: WizDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
export declare const flowVerify: (wizData: WizData) => boolean;
