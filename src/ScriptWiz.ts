import { ParseResult, WizDataList } from "./model";
import { Opcodes } from "./opcodes";
import { VM } from "./opcodes/model/VM";
import { currentScope } from "./utils";
import { compileJoin } from "./utils/compileAll";
import { parse } from "./parse";
import { TxData } from "@script-wiz/lib-core";

const initialStackDataList: WizDataList = {
  inputHexes: [],
  main: [],
  alt: [],
  flow: [true],
  altFlow: [],
  isStackFailed: false,
};

export class ScriptWiz {
  vm: VM;
  opCodes: Opcodes;
  stackDataList: WizDataList;
  extension: any;

  constructor(vm: VM, extension?: any) {
    this.vm = vm;
    this.opCodes = new Opcodes(vm);
    this.stackDataList = { ...initialStackDataList };
    this.extension = extension;
  }

  clearStackDataList = () => {
    this.stackDataList = { ...initialStackDataList, txData: this.stackDataList.txData };
  };

  parseHex = (input: string, isWitnessElement: boolean = true, compileScript: string): void => this.parseInput(isWitnessElement, compileScript, input);

  parseNumber = (input: number, isWitnessElement: boolean = true, compileScript: string): void => this.parseInput(isWitnessElement, compileScript, undefined, input);

  parseText = (input: string, isWitnessElement: boolean = true, compileScript: string): void => this.parseInput(isWitnessElement, compileScript, undefined, undefined, input);

  parseBin = (input: string, isWitnessElement: boolean = true, compileScript: string): void =>
    this.parseInput(isWitnessElement, compileScript, undefined, undefined, undefined, input);

  parseOpcode = (input: string, isWitnessElement: boolean = true, compileScript: string): void =>
    this.parseInput(isWitnessElement, compileScript, undefined, undefined, undefined, undefined, input);

  parseTxData = (input?: TxData): void => {
    this.stackDataList = { ...this.stackDataList, txData: input };
  };

  assignLabel = (label: string) => {
    if (!currentScope(this.stackDataList)) return;
    if (!this.stackDataList.main.length) throw new Error("nothing to label");
    const lastStack = this.stackDataList.main[this.stackDataList.main.length - 1];
    lastStack.label = label;
  };

  //
  compile = () => compileJoin(this.stackDataList.inputHexes);

  private parseInput = (
    isWitnessElement: boolean,
    compileScript: string,
    inputHex?: string,
    inputNumber?: number,
    inputText?: string,
    inputBin?: string,
    inputOpCode?: string
  ): void => {
    const currentScopeParse: boolean = currentScope(this.stackDataList);
    let currentScopeParseException: boolean = false;
    if (inputOpCode !== undefined) currentScopeParseException = inputOpCode === "OP_IF" || inputOpCode === "OP_NOTIF" || inputOpCode === "OP_ELSE" || inputOpCode === "OP_ENDIF";

    let parseResult: ParseResult;

    parseResult = parse(
      this.opCodes.data,
      this.stackDataList,
      currentScopeParse,
      currentScopeParseException,
      isWitnessElement,
      compileScript,
      inputHex,
      inputNumber,
      inputText,
      inputBin,
      inputOpCode,
      this.vm,
      this.extension
    );

    this.parseResultCommit(parseResult);
  };

  private parseResultCommit = (parseResult: ParseResult) => {
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

    // push op code seperators
    if (parseResult.codeSeperators) this.stackDataList = { ...this.stackDataList, codeSeperators: parseResult.codeSeperators };

    // stack failed
    if (parseResult.isStackFailed) {
      this.stackDataList = { ...this.stackDataList, isStackFailed: true, errorMessage: "Stack failed an OP_VERIFY operation." };
    }
  };
}
