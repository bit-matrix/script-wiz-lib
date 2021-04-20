import { StackData } from "./model";
declare let stackDataArray: StackData[];
declare const parse: (input: string) => StackData[];
declare const clearStack: () => void;
export { parse, clearStack, stackDataArray };
