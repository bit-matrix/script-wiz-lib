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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptWiz = void 0;
var opcodes_1 = require("./opcodes");
var utils_1 = require("./utils");
var compileAll_1 = require("./utils/compileAll");
var parse_1 = require("./parse");
var initialStackDataList = {
    inputHexes: [],
    main: [],
    alt: [],
    flow: [true],
    altFlow: [],
    isStackFailed: false,
};
var ScriptWiz = /** @class */ (function () {
    function ScriptWiz(vm, extension) {
        var _this = this;
        this.clearStackDataList = function () {
            _this.stackDataList = __assign(__assign({}, initialStackDataList), { txData: _this.stackDataList.txData });
        };
        this.parseHex = function (input, isWitnessElement) {
            if (isWitnessElement === void 0) { isWitnessElement = true; }
            return _this.parseInput(isWitnessElement, input);
        };
        this.parseNumber = function (input, isWitnessElement) {
            if (isWitnessElement === void 0) { isWitnessElement = true; }
            return _this.parseInput(isWitnessElement, undefined, input);
        };
        this.parseText = function (input, isWitnessElement) {
            if (isWitnessElement === void 0) { isWitnessElement = true; }
            return _this.parseInput(isWitnessElement, undefined, undefined, input);
        };
        this.parseBin = function (input, isWitnessElement) {
            if (isWitnessElement === void 0) { isWitnessElement = true; }
            return _this.parseInput(isWitnessElement, undefined, undefined, undefined, input);
        };
        this.parseOpcode = function (input, isWitnessElement) {
            if (isWitnessElement === void 0) { isWitnessElement = true; }
            return _this.parseInput(isWitnessElement, undefined, undefined, undefined, undefined, input);
        };
        this.parseTxData = function (input) {
            _this.stackDataList = __assign(__assign({}, _this.stackDataList), { txData: input });
        };
        this.assignLabel = function (label) {
            if (!(0, utils_1.currentScope)(_this.stackDataList))
                return;
            if (!_this.stackDataList.main.length)
                throw new Error("nothing to label");
            var lastStack = _this.stackDataList.main[_this.stackDataList.main.length - 1];
            lastStack.label = label;
        };
        //
        this.compile = function () { return (0, compileAll_1.compileJoin)(_this.stackDataList.inputHexes); };
        this.parseInput = function (isWitnessElement, inputHex, inputNumber, inputText, inputBin, inputOpCode) {
            var currentScopeParse = (0, utils_1.currentScope)(_this.stackDataList);
            var currentScopeParseException = false;
            if (inputOpCode !== undefined)
                currentScopeParseException = inputOpCode === "OP_IF" || inputOpCode === "OP_NOTIF" || inputOpCode === "OP_ELSE" || inputOpCode === "OP_ENDIF";
            var parseResult;
            parseResult = (0, parse_1.parse)(_this.opCodes.data, _this.stackDataList, currentScopeParse, currentScopeParseException, isWitnessElement, inputHex, inputNumber, inputText, inputBin, inputOpCode, _this.vm, _this.extension);
            _this.parseResultCommit(parseResult);
        };
        this.parseResultCommit = function (parseResult) {
            // add input hexes
            _this.stackDataList = __assign(__assign({}, _this.stackDataList), { inputHexes: __spreadArray(__spreadArray([], _this.stackDataList.inputHexes, true), [parseResult.inputHex], false), errorMessage: parseResult.errorMessage });
            // return failed after add input hex
            if (_this.stackDataList.isStackFailed) {
                _this.stackDataList = __assign(__assign({}, _this.stackDataList), { errorMessage: "Failed stack list can't parse input." });
                return;
            }
            // remove item(s) from main stack
            if (parseResult.main.removeLastSize > 0) {
                _this.stackDataList = __assign(__assign({}, _this.stackDataList), { main: _this.stackDataList.main.slice(0, _this.stackDataList.main.length - parseResult.main.removeLastSize) });
            }
            // remove last item from alternate stack
            if (parseResult.alt.removeLastStackData) {
                _this.stackDataList = __assign(__assign({}, _this.stackDataList), { alt: _this.stackDataList.alt.slice(0, _this.stackDataList.alt.length - 1) });
            }
            // add item array to main stack
            _this.stackDataList = __assign(__assign({}, _this.stackDataList), { main: _this.stackDataList.main.concat(parseResult.main.addDataArray) });
            // add item to alternate stack
            if (parseResult.alt.addData)
                _this.stackDataList = __assign(__assign({}, _this.stackDataList), { alt: __spreadArray(__spreadArray([], _this.stackDataList.alt, true), [parseResult.alt.addData], false) });
            // update flow
            if (parseResult.flow)
                _this.stackDataList = __assign(__assign({}, _this.stackDataList), { flow: parseResult.flow });
            // update alt flow
            if (parseResult.altFlow)
                _this.stackDataList = __assign(__assign({}, _this.stackDataList), { altFlow: parseResult.altFlow });
            // stack failed
            if (parseResult.isStackFailed) {
                _this.stackDataList = __assign(__assign({}, _this.stackDataList), { isStackFailed: true, errorMessage: "Stack failed an OP_VERIFY operation." });
            }
        };
        this.vm = vm;
        this.opCodes = new opcodes_1.Opcodes(vm);
        this.stackDataList = __assign({}, initialStackDataList);
        this.extension = extension;
    }
    return ScriptWiz;
}());
exports.ScriptWiz = ScriptWiz;
//# sourceMappingURL=ScriptWiz.js.map