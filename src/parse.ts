import { compileData, cropTwo } from "./compileAll";
import { opcodeToWord, opWordToHex } from "./helper";
import OP from "./helper/stackOp";
import { IParseResult, IParseResultData, StackDataList } from "./model";
import parseFinalInput from "./ParseFinalInput";

const parse = (input: string, stackDataList: StackDataList): IParseResult => {
  try {
    // Data
    if (input.startsWith("<") && input.endsWith(">")) {
      const finalInput = input.substr(1, input.length - 2);
      const addStackData = parseFinalInput(finalInput);
      const parseResult: IParseResult = {
        inputHex: compileData(addStackData.byteValue),
        main: { addDataArray: [addStackData], removeLastSize: 0 },
        alt: { removeLastStackData: false },
      };
      return parseResult;
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

      const parseResultData: IParseResultData = OP(word, stackDataList);
      return { ...parseResultData, inputHex: cropTwo(opWordToHex(word)) };
    }
  } catch (ex) {
    console.error(ex);
    throw ex;
  }

  throw "it is not a valid input script";
};

export default parse;
