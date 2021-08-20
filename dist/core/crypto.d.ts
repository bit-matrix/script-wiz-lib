import CryptoJS from "crypto-js";
import WizData from "@script-wiz/wiz-data";
export declare const ripemd160: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const sha1: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const sha256: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const hash160: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const hash256: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const ecdsaVerify: (sig: WizData, msg: WizData, pubkey: WizData) => WizData;
export declare const checkSig: (wizData: WizData, wizData2: WizData) => WizData;
