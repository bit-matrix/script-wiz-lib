"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opcodes = void 0;
var VM_1 = require("./model/VM");
var BITCOIN_SEGWIT_1 = require("./BITCOIN_SEGWIT");
var BITCOIN_TAPSCRIPT_1 = require("./BITCOIN_TAPSCRIPT");
var LIQUID_SEGWIT_1 = require("./LIQUID_SEGWIT");
var LIQUID_TAPSCRIPT_1 = require("./LIQUID_TAPSCRIPT");
var opcodes = function (vm) {
    if (vm.network === VM_1.VM_NETWORK.BTC) {
        if (vm.ver === VM_1.VM_NETWORK_VERSION.SEGWIT)
            return BITCOIN_SEGWIT_1.opcodesBitcoinSegwit;
        // else if(vm.ver === VM_NETWORK_VERSION.TAPSCRIPT)
        return BITCOIN_TAPSCRIPT_1.opcodesBitcoinTapscript;
    }
    // else {
    // if (vm.network === VM_NETWORK.LIQUID) {
    if (vm.ver === VM_1.VM_NETWORK_VERSION.SEGWIT)
        return LIQUID_SEGWIT_1.opcodesLiquidSegwit;
    // else if(vm.ver === VM_NETWORK_VERSION.TAPSCRIPT)
    return LIQUID_TAPSCRIPT_1.opcodesLiquidTapscript;
    // }
    // }
};
var Opcodes = /** @class */ (function () {
    function Opcodes(vm) {
        var _this = this;
        this.wordData = function (word) { return _this.data.find(function (d) { return d.word === word; }); };
        this.wordCode = function (word) {
            var _a;
            var code = (_a = _this.wordData(word)) === null || _a === void 0 ? void 0 : _a.opcode;
            return code === undefined ? -1 : code;
        };
        this.wordHex = function (word) { var _a; return ((_a = _this.wordData(word)) === null || _a === void 0 ? void 0 : _a.hex) || ""; };
        this.codeData = function (code) { return _this.data.find(function (d) { return d.opcode === code; }); };
        this.codeWord = function (code) { var _a; return ((_a = _this.codeData(code)) === null || _a === void 0 ? void 0 : _a.word) || ""; };
        this.vm = vm;
        this.data = opcodes(vm);
    }
    return Opcodes;
}());
exports.Opcodes = Opcodes;
//# sourceMappingURL=index.js.map