import { currentScope } from "./helper";
import { StackDataList, IParseResult } from "./model";
import parseToStack from "./parse";
import opWordCodes from "./constant/opWordCodes";
import parseFinalInput from "./parseFinalInput";
import compileFinalInput from "./compileFinalInput";
import { compileData, compileJoin } from "./compileAll";

const initialStackDataList: StackDataList = { inputHexes: [], main: [], alt: [], flow: [true], altFlow: [], isStackFailed: false };
let stackDataList: StackDataList = initialStackDataList;

const parse = (input: string): StackDataList => {
  const currentScopeParse: boolean = currentScope(stackDataList);
  const currentScopeParseException: boolean = input === "OP_IF" || input === "OP_NOTIF" || input === "OP_ELSE" || input === "OP_ENDIF";

  const parseResult: IParseResult = parseToStack(input, stackDataList, currentScopeParse, currentScopeParseException);

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

const compileScript = () => compileJoin(stackDataList.inputHexes);

const clearStack = () => {
  stackDataList = initialStackDataList;
};

export { compileFinalInput, parse, parseFinalInput, clearStack, opWordCodes, stackDataList, compileData, compileJoin, compileScript };
