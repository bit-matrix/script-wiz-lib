import WizData from "../convertion";
import { ParseResult, ParseResultData, WizDataList } from "../model";
import { parseFinalInput } from "./parseFinalInput";

const parse = (input: string, stackDataList: WizDataList, currentScopeParse: boolean, currentScopeParseException: boolean): ParseResult => {
  let emptyParseResultData: ParseResultData = {
    main: { addDataArray: [], removeLastSize: 0 },
    alt: { removeLastStackData: false },
  };

  let inputHex: string = "";

  try {
    // Data
    if (input.startsWith("<") && input.endsWith(">")) {
      const finalInput = input.substr(1, input.length - 2);
      const addStackData: WizData = parseFinalInput(finalInput);
      // inputHex = compileData(addStackData.byteValue);

      if (currentScopeParse)
        return {
          inputHex,
          main: { addDataArray: [addStackData], removeLastSize: 0 },
          alt: { removeLastStackData: false },
        };
      else return { ...emptyParseResultData, inputHex };
    }

    // OP Word or OP Code
    // if (input.startsWith("OP_") || !isNaN(input as any)) {
    //   // OP Word
    //   let word = input;
    //   // Op Code
    //   if (!isNaN(input as any)) {
    //     word = opcodeToWord(Number(input));
    //     if (word === "") throw "Unknown OP code number";
    //   }

    //   inputHex = cropTwo(opWordToHex(word));

    //   if (currentScopeParse || currentScopeParseException) emptyParseResultData = OP(word, stackDataList);
    //   return { ...emptyParseResultData, inputHex };
    // }
  } catch (ex) {
    return { inputHex, errorMessage: ex, main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false } };
  }

  return { inputHex, errorMessage: "it is not a valid input script", main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false } };
};

export default parse;
