import WizData from "@script-wiz/wiz-data";
import { Taproot } from "./model";
export declare const tweakAdd: (pubkey: Uint8Array, tweak: Uint8Array) => WizData;
export declare const tagHash: (tag: string, data: WizData) => string;
export declare const treeHelper: (scripts: WizData[], version: string) => string;
export declare const tapRoot: (pubKey: WizData, scripts: WizData[], version?: string) => Taproot;
