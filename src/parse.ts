import { compileData, cropTwo } from "./compileAll";
import { opcodeToWord, opWordToHex } from "./helper";
import OP from "./helper/stackOp";
import { IParseResult, IParseResultData, StackDataList } from "./model";
import parseFinalInput from "./ParseFinalInput";

const parse = (input: string, stackDataList: StackDataList, currentScopeParse: boolean, currentScopeParseException: boolean): IParseResult => {
  let emptyParseResultData: IParseResultData = {
    main: { addDataArray: [], removeLastSize: 0 },
    alt: { removeLastStackData: false },
  };

  try {
    // Data
    if (input.startsWith("<") && input.endsWith(">")) {
      const finalInput = input.substr(1, input.length - 2);
      const addStackData = parseFinalInput(finalInput);
      const inputHex = compileData(addStackData.byteValue);

      if (currentScopeParse)
        return {
          inputHex,
          main: { addDataArray: [addStackData], removeLastSize: 0 },
          alt: { removeLastStackData: false },
        };
      else return { ...emptyParseResultData, inputHex };
    }

    // OP Word or OP Code
    if (input.startsWith("OP_") || !isNaN(input as any)) {
      // OP Word
      let word = input;
      // Op Code
      if (!isNaN(input as any)) {
        word = opcodeToWord(Number(input));
        if (word === "") throw "Unknown OP code number";
      }

      if (currentScopeParse || currentScopeParseException) emptyParseResultData = OP(word, stackDataList);
      return { ...emptyParseResultData, inputHex: cropTwo(opWordToHex(word)) };
    }
  } catch (ex) {
    console.error(ex);
    throw ex;
  }

  throw "it is not a valid input script";
};

export default parse;
