"use strict";
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
exports.opcodesBitcoinTapscript = void 0;
var BITCOIN_SEGWIT_1 = require("./BITCOIN_SEGWIT");
exports.opcodesBitcoinTapscript = __spreadArray(__spreadArray([], BITCOIN_SEGWIT_1.opcodesBitcoinSegwit, true), [
    {
        word: "OP_CHECKSIGADD",
        opcode: 186,
        hex: "0xba",
        description: "The entire transaction's outputs, inputs, and script (from the most recently-executed OP_CODESEPARATOR to the end) are hashed. The signature used by OP_CHECKSIGADD must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.",
    },
], false);
//# sourceMappingURL=BITCOIN_TAPSCRIPT.js.map