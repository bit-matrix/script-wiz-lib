import { ripemd160, sha1, sha256 } from "./helper/crypto";
import { StackData } from "./model";
declare let stackDataArray: StackData[];
declare const parse: (input: string) => StackData[];
declare const clearStack: () => void;
export { parse, clearStack, stackDataArray, sha256, ripemd160, sha1 };
