import WizData from "@script-wiz/wiz-data";
import { ParseResult, ParseResultData, WizDataList } from "./model";
import { Opcode } from "./opcodes/model/Opcode";
import { VM } from "./opcodes/model/VM";
import { opcodeToWord, opHexToWord, opWordToHex } from "./utils";
import { compileData } from "./utils/compileAll";
import { opFunctions } from "./opFunctions";

export const parse = (
  opWordCodes: Opcode[],
  stackDataList: WizDataList,
  currentScopeParse: boolean,
  currentScopeParseException: boolean,
  isWitnessElement: boolean,
  compileScript: string,
  inputHexParam?: string,
  inputNumberParam?: number,
  inputTextParam?: string,
  inputBinParam?: string,
  inputOpCodeParam?: string,
  version?: VM,
  extension?: any
): ParseResult => {
  let emptyParseResultData: ParseResultData = {
    main: { addDataArray: [], removeLastSize: 0 },
    alt: { removeLastStackData: false },
  };

  let inputHex: string = "";

  try {
    // Values
    if (inputOpCodeParam === undefined) {
      const wizData: WizData = parseValueInputs(inputHexParam, inputNumberParam, inputTextParam, inputBinParam);
      inputHex = isWitnessElement ? compileData(wizData.hex) : "";

      if (currentScopeParse) return { inputHex, main: { addDataArray: [wizData], removeLastSize: 0 }, alt: { removeLastStackData: false } };
      else return { ...emptyParseResultData, inputHex };
    }

    // OP Functions
    let opWord = "";
    if (inputOpCodeParam.startsWith("OP_")) {
      opWord = inputOpCodeParam;
      inputHex = opWordToHex(opWord, opWordCodes);
    } else if (inputOpCodeParam.startsWith("0x")) {
      opWord = opHexToWord(inputOpCodeParam, opWordCodes);
    } else if (isNaN(inputOpCodeParam as any)) {
      return { inputHex, errorMessage: "Invalid OP code, OP word or OP hex", main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false } };
    } else {
      opWord = opcodeToWord(Number(inputOpCodeParam), opWordCodes);
    }

    if (opWord === undefined || opWord === "") throw "Unknown OP code";

    if (currentScopeParse || currentScopeParseException) emptyParseResultData = opFunctions(opWord, stackDataList, opWordCodes, compileScript, version, extension);
    return { ...emptyParseResultData, inputHex };
  } catch (ex) {
    return { inputHex, errorMessage: ex as string, main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false } };
  }
};

export const parseValueInputs = (inputHexParam?: string, inputNumberParam?: number, inputTextParam?: string, inputBinParam?: string): WizData => {
  // a9f4 (0xa9f4)
  // 8283284 (8283284)
  // "hello" ("hello")
  // 011101 (0b011101)

  // Hex
  if (inputHexParam !== undefined) return WizData.fromHex(inputHexParam);

  // Number
  if (inputNumberParam !== undefined) return WizData.fromNumber(inputNumberParam);

  // Text
  if (inputTextParam !== undefined) return WizData.fromText(inputTextParam);

  // Bin
  if (inputBinParam !== undefined) return WizData.fromBin(inputBinParam);

  throw "parseValueInputs Error: it is not a valid input value!";
};
