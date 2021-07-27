import CryptoJS from "crypto-js";
import WizData from "../convertion";
export declare const ripemd160: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const sha1: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const sha256: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const hash160: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const hash256: (wizData: WizData) => CryptoJS.lib.WordArray;
export declare const ecdsaVerify: (signature: WizData, message: WizData, publicKey: WizData) => boolean;
