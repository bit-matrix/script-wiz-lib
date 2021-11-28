import WizData from "@script-wiz/wiz-data";
import { Taproot } from "./model";
export declare const tweakAdd: (pubkey: WizData, tweak: WizData) => WizData;
export declare const publicKeyTweakCheck: (pubkey: WizData, tweak: WizData, expect: WizData, negate: boolean) => boolean;
export declare const tagHash: (tag: string, data: WizData) => string;
export declare const treeHelper: (scripts: WizData[], version: string) => string;
export declare const tapRoot: (pubKey: WizData, scripts: WizData[], version?: string) => Taproot;
