import { ParseResult, WizDataList } from "../model";
import { Opcodes } from "../opcodes";
import { Opcode } from "../opcodes/model/Opcode";
import { VM, VM_NETWORK, VM_NETWORK_VERSION } from "../opcodes/model/VM";
import { currentScope } from "../utils";
import { compileJoin } from "./compileAll";
import { parse } from "./parse";

const initialStackDataList: WizDataList = { inputHexes: [], main: [], alt: [], flow: [true], altFlow: [], isStackFailed: false };
let stackDataList: WizDataList = initialStackDataList;

let programVersion: VM = { network: VM_NETWORK.BTC, ver: VM_NETWORK_VERSION.SEGWIT };

export let opWordCodes: Opcode[] = [];

export const init = (version: VM) => {
  programVersion = version;

  opWordCodes = new Opcodes(version).data;
};

export const parseInput = (input: string): WizDataList => {
  const currentScopeParse: boolean = currentScope(stackDataList);
  const currentScopeParseException: boolean = input === "OP_IF" || input === "OP_NOTIF" || input === "OP_ELSE" || input === "OP_ENDIF";

  const parseResult: ParseResult = parse(input, programVersion, stackDataList, currentScopeParse, currentScopeParseException);

  // add input hexes
  stackDataList = { ...stackDataList, inputHexes: [...stackDataList.inputHexes, parseResult.inputHex], errorMessage: parseResult.errorMessage };

  // return failed after add input hex
  if (stackDataList.isStackFailed) return { ...stackDataList, isStackFailed: true, errorMessage: "Stack failed an OP_VERIFY operation." };

  // remove item(s) from main stack
  if (parseResult.main.removeLastSize > 0) {
    stackDataList = { ...stackDataList, main: stackDataList.main.slice(0, stackDataList.main.length - parseResult.main.removeLastSize) };
  }

  // remove last item from alternate stack
  if (parseResult.alt.removeLastStackData) {
    stackDataList = { ...stackDataList, alt: stackDataList.alt.slice(0, stackDataList.alt.length - 1) };
  }

  // add item array to main stack
  stackDataList = { ...stackDataList, main: stackDataList.main.concat(parseResult.main.addDataArray) };

  // add item to alternate stack
  if (parseResult.alt.addData) stackDataList = { ...stackDataList, alt: [...stackDataList.alt, parseResult.alt.addData] };

  // update flow
  if (parseResult.flow) stackDataList = { ...stackDataList, flow: parseResult.flow };

  // update alt flow
  if (parseResult.altFlow) stackDataList = { ...stackDataList, altFlow: parseResult.altFlow };

  // stack failed
  if (parseResult.isStackFailed) {
    stackDataList = { ...stackDataList, isStackFailed: parseResult.isStackFailed, errorMessage: "Stack failed an OP_VERIFY operation." };
  }

  return stackDataList;
};

export const compileScript = () => compileJoin(stackDataList.inputHexes);

export const clearStack = () => {
  stackDataList = initialStackDataList;
};
