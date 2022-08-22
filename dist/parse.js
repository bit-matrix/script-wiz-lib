"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValueInputs = exports.parse = void 0;
var wiz_data_1 = __importDefault(require("@script-wiz/wiz-data"));
var utils_1 = require("./utils");
var compileAll_1 = require("./utils/compileAll");
var opFunctions_1 = require("./opFunctions");
var parse = function (opWordCodes, stackDataList, currentScopeParse, currentScopeParseException, isWitnessElement, inputHexParam, inputNumberParam, inputTextParam, inputBinParam, inputOpCodeParam, version, extension) {
    var emptyParseResultData = {
        main: { addDataArray: [], removeLastSize: 0 },
        alt: { removeLastStackData: false },
    };
    var inputHex = "";
    try {
        // Values
        if (inputOpCodeParam === undefined) {
            var wizData = (0, exports.parseValueInputs)(inputHexParam, inputNumberParam, inputTextParam, inputBinParam);
            inputHex = isWitnessElement ? (0, compileAll_1.compileData)(wizData.hex) : "";
            if (currentScopeParse)
                return { inputHex: inputHex, main: { addDataArray: [wizData], removeLastSize: 0 }, alt: { removeLastStackData: false } };
            else
                return __assign(__assign({}, emptyParseResultData), { inputHex: inputHex });
        }
        // OP Functions
        var opWord = "";
        if (inputOpCodeParam.startsWith("OP_")) {
            opWord = inputOpCodeParam;
            inputHex = (0, utils_1.opWordToHex)(opWord, opWordCodes);
        }
        else if (inputOpCodeParam.startsWith("0x")) {
            opWord = (0, utils_1.opHexToWord)(inputOpCodeParam, opWordCodes);
        }
        else if (isNaN(inputOpCodeParam)) {
            return { inputHex: inputHex, errorMessage: "Invalid OP code, OP word or OP hex", main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false } };
        }
        else {
            opWord = (0, utils_1.opcodeToWord)(Number(inputOpCodeParam), opWordCodes);
        }
        if (opWord === undefined || opWord === "")
            throw "Unknown OP code";
        if (currentScopeParse || currentScopeParseException)
            emptyParseResultData = (0, opFunctions_1.opFunctions)(opWord, stackDataList, opWordCodes, version, extension);
        return __assign(__assign({}, emptyParseResultData), { inputHex: inputHex });
    }
    catch (ex) {
        return { inputHex: inputHex, errorMessage: ex, main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false } };
    }
};
exports.parse = parse;
var parseValueInputs = function (inputHexParam, inputNumberParam, inputTextParam, inputBinParam) {
    // a9f4 (0xa9f4)
    // 8283284 (8283284)
    // "hello" ("hello")
    // 011101 (0b011101)
    // Hex
    if (inputHexParam !== undefined)
        return wiz_data_1.default.fromHex(inputHexParam);
    // Number
    if (inputNumberParam !== undefined)
        return wiz_data_1.default.fromNumber(inputNumberParam);
    // Text
    if (inputTextParam !== undefined)
        return wiz_data_1.default.fromText(inputTextParam);
    // Bin
    if (inputBinParam !== undefined)
        return wiz_data_1.default.fromBin(inputBinParam);
    throw "parseValueInputs Error: it is not a valid input value!";
};
exports.parseValueInputs = parseValueInputs;
//# sourceMappingURL=parse.js.map