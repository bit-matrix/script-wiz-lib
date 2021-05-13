import { currentScope } from "./helper";
import { StackDataList, ParseResult } from "./model";
import parseToStack from "./parse";
import opWordCodes from "./constant/opWordCodes";
import parseFinalInput from "./parseFinalInput";

const initialStackDataList: StackDataList = { main: [], alt: [], flow: [true], altFlow: [], isStackFailed: false };
let stackDataList: StackDataList = initialStackDataList;

const parse = (input: string): StackDataList => {
  if (stackDataList.isStackFailed) throw "Stack failed an OP_VERIFY operation.";

  if (!currentScope(stackDataList)) {
    if (input !== "OP_IF" && input !== "OP_NOTIF" && input !== "OP_ELSE" && input !== "OP_ENDIF") return stackDataList;
  }

  const parseResult: ParseResult = parseToStack(input, stackDataList);

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
    stackDataList = { ...stackDataList, isStackFailed: parseResult.isStackFailed };
    throw "Stack failed an OP_VERIFY operation.";
  }

  return stackDataList;
};

const clearStack = () => {
  stackDataList = initialStackDataList;
};

export { parse, clearStack, opWordCodes, stackDataList, parseFinalInput };
