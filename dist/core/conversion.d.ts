import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";
export declare const convert64: (value: BN) => WizData;
export declare const numToLE64: (wizData: WizData) => WizData;
export declare const LE64ToNum: (wizData: WizData) => WizData;
export declare const LE32toLE64: (wizData: WizData) => WizData;
