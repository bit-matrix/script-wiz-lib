import WizData from "./convertion";
import { WizDataList } from "./model";
import { clearStack, compileScript } from "./scriptWiz";
import { compileData, compileJoin } from "./scriptWiz/compileAll";
import { compileFinalInput } from "./scriptWiz/compileFinalInput";
import { parse } from "./scriptWiz/parse";
import { parseFinalInput } from "./scriptWiz/parseFinalInput";

export { compileFinalInput, parse, parseFinalInput, clearStack, /*opWordCodes,*/ WizData, WizDataList, compileData, compileJoin, compileScript };
