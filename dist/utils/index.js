"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMOJI_REGEX = exports.currentScope = exports.opWordToHex = exports.opcodeToWord = exports.opHexToWord = void 0;
var opHexToWord = function (hex, opWordCodes) {
    var _a;
    var word = (_a = opWordCodes.find(function (owc) { return owc.hex === hex; })) === null || _a === void 0 ? void 0 : _a.word;
    return word || "";
};
exports.opHexToWord = opHexToWord;
var opcodeToWord = function (opcode, opWordCodes) {
    var _a;
    return ((_a = opWordCodes.find(function (owc) { return owc.opcode === opcode; })) === null || _a === void 0 ? void 0 : _a.word) || "";
};
exports.opcodeToWord = opcodeToWord;
var opWordToHex = function (word, opWordCodes) {
    var _a;
    var hex = (_a = opWordCodes.find(function (owc) { return owc.word === word; })) === null || _a === void 0 ? void 0 : _a.hex.substr(2);
    return hex || "";
};
exports.opWordToHex = opWordToHex;
// supports all opcodes
var currentScope = function (wizDataList) { return wizDataList.flow[wizDataList.flow.length - 1]; };
exports.currentScope = currentScope;
exports.EMOJI_REGEX = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
//# sourceMappingURL=index.js.map