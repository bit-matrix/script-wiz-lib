import WizData from "@script-wiz/wiz-data";
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
