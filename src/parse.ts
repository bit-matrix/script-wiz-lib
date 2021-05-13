import { opcodeToWord } from "./helper";
import OP from "./helper/stackOp";
import { ParseResult, StackDataList } from "./model";
import parseFinalInput from "./ParseFinalInput";

const parse = (input: string, stackDataList: StackDataList): ParseResult => {
  try {
    // Data
    if (input.startsWith("<") && input.endsWith(">")) {
      const finalInput = input.substr(1, input.length - 2);
      const addDataArray = parseFinalInput(finalInput);
      const parseResult: ParseResult = { main: { addDataArray, removeLastSize: 0 }, alt: { removeLastStackData: false } };
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

      return OP(word, stackDataList);
    }
  } catch (ex) {
    console.error(ex);
    throw ex;
  }

  throw "it is not a valid input script";
};

export default parse;
