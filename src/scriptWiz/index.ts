import { ParseResult, WizDataList } from "../model";
import { Opcodes } from "../opcodes";
import { VM } from "../opcodes/model/VM";
import { currentScope } from "../utils";
import { compileJoin } from "./compileAll";
import { parse } from "./parse";

const initialStackDataList: WizDataList = { inputHexes: [], main: [], alt: [], flow: [true], altFlow: [], isStackFailed: false };

export class ScriptWiz {
  vm: VM;
  opCodes: Opcodes;

  stackDataList: WizDataList;

  constructor(vm: VM) {
    this.vm = vm;
    this.opCodes = new Opcodes(vm);
    this.stackDataList = initialStackDataList;
  }

  clearStackDataList = () => {
    this.stackDataList = initialStackDataList;
  };

  compile = () => compileJoin(this.stackDataList.inputHexes);

  parseInput = (input: string): void => {
    const currentScopeParse: boolean = currentScope(this.stackDataList);
    const currentScopeParseException: boolean = input === "OP_IF" || input === "OP_NOTIF" || input === "OP_ELSE" || input === "OP_ENDIF";

    const parseResult: ParseResult = parse(input, this.opCodes.data, this.stackDataList, currentScopeParse, currentScopeParseException);

    // add input hexes
    this.stackDataList = { ...this.stackDataList, inputHexes: [...this.stackDataList.inputHexes, parseResult.inputHex], errorMessage: parseResult.errorMessage };

    // return failed after add input hex
    if (this.stackDataList.isStackFailed) {
      this.stackDataList = { ...this.stackDataList, errorMessage: "Failed stack list can't parse input." };
      return;
    }

    // remove item(s) from main stack
    if (parseResult.main.removeLastSize > 0) {
      this.stackDataList = { ...this.stackDataList, main: this.stackDataList.main.slice(0, this.stackDataList.main.length - parseResult.main.removeLastSize) };
    }

    // remove last item from alternate stack
    if (parseResult.alt.removeLastStackData) {
      this.stackDataList = { ...this.stackDataList, alt: this.stackDataList.alt.slice(0, this.stackDataList.alt.length - 1) };
    }

    // add item array to main stack
    this.stackDataList = { ...this.stackDataList, main: this.stackDataList.main.concat(parseResult.main.addDataArray) };

    // add item to alternate stack
    if (parseResult.alt.addData) this.stackDataList = { ...this.stackDataList, alt: [...this.stackDataList.alt, parseResult.alt.addData] };

    // update flow
    if (parseResult.flow) this.stackDataList = { ...this.stackDataList, flow: parseResult.flow };

    // update alt flow
    if (parseResult.altFlow) this.stackDataList = { ...this.stackDataList, altFlow: parseResult.altFlow };

    // stack failed
    if (parseResult.isStackFailed) {
      this.stackDataList = { ...this.stackDataList, isStackFailed: parseResult.isStackFailed, errorMessage: "Stack failed an OP_VERIFY operation." };
    }
  };
}
