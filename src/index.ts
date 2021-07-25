import WizData from "./convertion";
import { WizDataList } from "./model";
import { clearStack, compileScript, init } from "./scriptWiz";
import { compileData, compileJoin } from "./scriptWiz/compileAll";
import { compileFinalInput } from "./scriptWiz/compileFinalInput";

import { parseFinalInput } from "./scriptWiz/parseFinalInput";

export { compileFinalInput, init, parseFinalInput, clearStack, /*opWordCodes,*/ WizData, WizDataList, compileData, compileJoin, compileScript };
