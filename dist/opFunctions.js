"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opFunctions = void 0;
var wiz_data_1 = __importDefault(require("@script-wiz/wiz-data"));
var lib_core_1 = require("@script-wiz/lib-core");
var flow = __importStar(require("./utils/flow"));
var utils_1 = require("./utils");
var _1 = require(".");
var opFunctions = function (word, stackDataList, opCodes, vm) {
    var mainStackDataArray = stackDataList.main;
    var mainStackDataArrayLength = mainStackDataArray.length;
    /*
     * Constants
     * * 0 - 96
     */
    if (word === "OP_0" ||
        word === "OP_FALSE" ||
        word === "OP_1" ||
        word === "OP_TRUE" ||
        word === "OP_2" ||
        word === "OP_3" ||
        word === "OP_4" ||
        word === "OP_5" ||
        word === "OP_6" ||
        word === "OP_7" ||
        word === "OP_8" ||
        word === "OP_9" ||
        word === "OP_10" ||
        word === "OP_11" ||
        word === "OP_12" ||
        word === "OP_13" ||
        word === "OP_14" ||
        word === "OP_15" ||
        word === "OP_16" ||
        word === "OP_1NEGATE") {
        var currentOpCode = opCodes.find(function (oc) { return oc.word === word; });
        var addDataArray = [wiz_data_1.default.fromNumber((currentOpCode === null || currentOpCode === void 0 ? void 0 : currentOpCode.output) || 0)];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    /*
     * Flow control
     * * 97 - 106
     */
    if (word === "OP_NOP") {
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: [], removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_IF") {
        var scope = (0, utils_1.currentScope)(stackDataList);
        var flows = { flow: stackDataList.flow, altFlow: stackDataList.altFlow };
        if (scope === false) {
            flows.altFlow.push(false);
        }
        else {
            if (mainStackDataArrayLength < 1)
                throw "OP_IF Error: stack data array must include min 1 data!";
            flows = flow.flowIf(stackDataList);
        }
        return {
            main: { addDataArray: [], removeLastSize: scope ? 1 : 0 },
            alt: { removeLastStackData: false },
            flow: flows.flow,
            altFlow: flows.altFlow,
        };
    }
    if (word === "OP_NOTIF") {
        var scope = (0, utils_1.currentScope)(stackDataList);
        var flows = { flow: stackDataList.flow, altFlow: stackDataList.altFlow };
        if (scope === false) {
            flows.altFlow.push(false);
        }
        else {
            if (mainStackDataArrayLength < 1)
                throw "OP_NOTIF Error: stack data array must include min 1 data!";
            flows = flow.flowNotIf(stackDataList);
        }
        return {
            main: { addDataArray: [], removeLastSize: scope ? 1 : 0 },
            alt: { removeLastStackData: false },
            flow: flows.flow,
            altFlow: flows.altFlow,
        };
    }
    if (word === "OP_ELSE") {
        if (stackDataList.flow.length === 1)
            throw "OP_ELSE Error: Encountered an OP_ELSE outside of an OP_IF ... OP_ENDIF block.!";
        var flows = flow.flowElse(stackDataList);
        return {
            main: { addDataArray: [], removeLastSize: 0 },
            alt: { removeLastStackData: false },
            flow: flows.flow,
            altFlow: flows.altFlow,
        };
    }
    if (word === "OP_ENDIF") {
        if (stackDataList.flow.length === 1)
            throw "OP_ENDIF Error: Encountered an OP_ENDIF which is not following a matching OP_IF.!";
        var flows = flow.flowEndIf(stackDataList);
        return {
            main: { addDataArray: [], removeLastSize: 0 },
            alt: { removeLastStackData: false },
            flow: flows.flow,
            altFlow: flows.altFlow,
        };
    }
    if (word === "OP_VERIFY") {
        if (mainStackDataArray.length < 1)
            throw "OP_VERIFY Error:  stack data array must include min 1 data!!";
        var isVerify = flow.flowVerify(mainStackDataArray[mainStackDataArray.length - 1]);
        if (isVerify) {
            var addDataArray = [];
            var removeLastSize = 1;
            var alt = { removeLastStackData: false };
            return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
        }
        else {
            return { main: { addDataArray: [], removeLastSize: 0 }, alt: { removeLastStackData: false }, isStackFailed: true };
        }
    }
    if (word === "OP_RETURN")
        throw "Program called on OP_RETURN operation";
    /*
     * Stack
     * * 107 - 125
     */
    if (word === "OP_TOALTSTACK") {
        if (mainStackDataArrayLength < 1)
            throw "OP_TOALTSTACK Error: stack data array must include min 1 data!";
        var addDataArray = [];
        var removeLastSize = 1;
        var alt = { addData: mainStackDataArray[mainStackDataArrayLength - 1], removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_FROMALTSTACK") {
        var altStackDataArrayLength = stackDataList.alt.length;
        if (altStackDataArrayLength < 1)
            throw "OP_FROMALTSTACK Error: tried to read from an empty alternate stack.";
        var addDataArray = [lib_core_1.stacks.fromAltStack(stackDataList.alt[stackDataList.alt.length - 1])];
        var removeLastSize = 0;
        var alt = { removeLastStackData: true };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_2DROP") {
        if (mainStackDataArrayLength < 2)
            throw "OP_2DROP Error: stack data array must include min 2 data!";
        var addDataArray = [];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_2DUP") {
        if (mainStackDataArrayLength < 2)
            throw "OP_2DUP Error: stack data array must include min 2 data!";
        var addDataArray = lib_core_1.stacks.twoDup(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_3DUP") {
        if (mainStackDataArrayLength < 3)
            throw "OP_3DUP Error: stack data array must include min 3 data!";
        var addDataArray = lib_core_1.stacks.threeDup(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_2OVER") {
        if (mainStackDataArrayLength < 4)
            throw "OP_2OVER Error: stack data array must include min 4 data!";
        var addDataArray = lib_core_1.stacks.twoOver(mainStackDataArray[mainStackDataArrayLength - 4], mainStackDataArray[mainStackDataArrayLength - 3]);
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_2SWAP") {
        if (mainStackDataArrayLength < 4)
            throw "OP_2SWAP Error: stack data array must include min 4 data!";
        var addDataArray = lib_core_1.stacks.twoSwap(mainStackDataArray[mainStackDataArrayLength - 1], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 4]);
        var removeLastSize = 4;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_IFDUP") {
        if (mainStackDataArrayLength < 1)
            throw "OP_IFDUP Error: stack data array must include min 1 data!";
        var addDataArray = [];
        var currentData = lib_core_1.stacks.ifDup(mainStackDataArray[mainStackDataArrayLength - 1]);
        if (currentData !== {})
            addDataArray = [lib_core_1.stacks.ifDup(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_DEPTH") {
        var addDataArray = [lib_core_1.stacks.depth(mainStackDataArrayLength)];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_DROP") {
        if (mainStackDataArrayLength < 1)
            throw "OP_DROP Error: stack data array must include min 1 data!";
        var addDataArray = [];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_DUP") {
        if (mainStackDataArrayLength < 1)
            throw "OP_DUP Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.stacks.dup(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_NIP") {
        if (mainStackDataArrayLength < 2)
            throw "OP_NIP Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.stacks.nip(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_OVER") {
        if (mainStackDataArrayLength < 2)
            throw "OP_OVER Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.stacks.over(mainStackDataArray[mainStackDataArrayLength - 2])];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SWAP") {
        if (mainStackDataArrayLength < 2)
            throw "OP_SWAP Error: stack data array must include min 2 data!";
        var addDataArray = lib_core_1.stacks.swap(mainStackDataArray[mainStackDataArrayLength - 1], mainStackDataArray[mainStackDataArrayLength - 2]);
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_2ROT") {
        if (mainStackDataArrayLength < 6)
            throw "OP_2ROT Error: stack data array must include min 6 data!";
        var addDataArray = lib_core_1.stacks.twoRot(mainStackDataArray[mainStackDataArrayLength - 6], mainStackDataArray[mainStackDataArrayLength - 5], mainStackDataArray[mainStackDataArrayLength - 4], mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = 6;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_ROT") {
        if (mainStackDataArrayLength < 3)
            throw "OP_ROT Error: stack data array must include min 3 data!";
        var addDataArray = lib_core_1.stacks.rot(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = 3;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_PICK") {
        if (mainStackDataArrayLength < 2)
            throw "OP_PICK Error: stack data array must include min 2 data!";
        var stackIndex = mainStackDataArray[mainStackDataArrayLength - 1].number;
        var willChangedStackDataArray = __spreadArray([], mainStackDataArray, true);
        willChangedStackDataArray.pop();
        if (stackIndex !== undefined) {
            if (stackIndex >= willChangedStackDataArray.length)
                throw "OP_PICK Error: stack index cant be equal and greater than stack array length";
        }
        else {
            throw "OP_PICK Error: stack index must be a number";
        }
        var addDataArray = lib_core_1.stacks.pick(willChangedStackDataArray, stackIndex);
        var removeLastSize = mainStackDataArray.length;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_ROLL") {
        if (mainStackDataArrayLength < 2)
            throw "OP_ROLL Error: stack data array must include min 2 data!";
        var stackIndex = mainStackDataArray[mainStackDataArrayLength - 1].number;
        var willChangedStackDataArray = __spreadArray([], mainStackDataArray, true);
        willChangedStackDataArray.pop();
        if (stackIndex !== undefined) {
            if (stackIndex >= willChangedStackDataArray.length)
                throw "OP_ROLL Error: stack index cant be equal and greater than stack array length";
        }
        else {
            throw "OP_ROLL Error: stack index must be a number";
        }
        var addDataArray = lib_core_1.stacks.roll(willChangedStackDataArray, stackIndex);
        var removeLastSize = mainStackDataArray.length;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_TUCK") {
        if (mainStackDataArrayLength < 2)
            throw "OP_TUCK Error: stack data array must include min 2 data!";
        var addDataArray = lib_core_1.stacks.tuck(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    /*
     * Splice
     * 126 - 130
     */
    if (word === "OP_CAT") {
        if (mainStackDataArrayLength < 2)
            throw "OP_CAT Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.splices.concatenate(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SUBSTR") {
        if (mainStackDataArrayLength < 3)
            throw "OP_SUBSTR Error: stack data array must include min 3 data!";
        var addDataArray = [
            lib_core_1.splices.substr(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]),
        ];
        var removeLastSize = 3;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_RIGHT") {
        if (mainStackDataArrayLength < 2)
            throw "OP_RIGHT Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.splices.right(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LEFT") {
        if (mainStackDataArrayLength < 2)
            throw "OP_LEFT Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.splices.left(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SIZE") {
        if (mainStackDataArrayLength < 1)
            throw "OP_SIZE Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.splices.size(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SUBSTR_LAZY") {
        if (mainStackDataArrayLength < 3)
            throw "OP_SUBSTR_LAZY Error: stack data array must include min 3 data!";
        var addDataArray = [
            lib_core_1.splices.substrLazy(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]),
        ];
        var removeLastSize = 3;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    /*
     * Bitwise logic
     * 131 - 136
     */
    if (word === "OP_INVERT") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INVERT Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.bitwise.invert(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_AND") {
        if (mainStackDataArrayLength < 2)
            throw "OP_AND Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.bitwise.and(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_OR") {
        if (mainStackDataArrayLength < 2)
            throw "OP_OR Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.bitwise.or(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_XOR") {
        if (mainStackDataArrayLength < 2)
            throw "OP_XOR Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.bitwise.xor(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_EQUAL") {
        if (mainStackDataArrayLength < 2)
            throw "OP_EQUAL Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.bitwise.equal(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_EQUALVERIFY") {
        if (mainStackDataArray.length < 2)
            throw "OP_EQUALVERIFY Error:  stack data array must include min 2 data!!";
        var isVerify = lib_core_1.bitwise.equal(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]).number === 1;
        if (isVerify) {
            var addDataArray = [];
            var removeLastSize = 2;
            var alt = { removeLastStackData: false };
            return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
        }
        else {
            return {
                main: { addDataArray: [], removeLastSize: 0 },
                alt: { removeLastStackData: false },
                isStackFailed: true,
            };
        }
    }
    /*
     * Arithmetic
     * 139 - 165
     */
    if (word === "OP_1ADD") {
        if (mainStackDataArrayLength < 1)
            throw "OP_1ADD Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.arithmetics.add1(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_1SUB") {
        if (mainStackDataArrayLength < 1)
            throw "OP_1SUB Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.arithmetics.sub1(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_NEGATE") {
        if (mainStackDataArrayLength < 1)
            throw "OP_NEGATE Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.arithmetics.negate(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_ABS") {
        if (mainStackDataArrayLength < 1)
            throw "OP_ABS Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.arithmetics.abs(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_NOT") {
        if (mainStackDataArrayLength < 1)
            throw "OP_NOT Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.arithmetics.not(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_0NOTEQUAL") {
        if (mainStackDataArrayLength < 1)
            throw "OP_0NOTEQUAL Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.arithmetics.notEqual0(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_ADD") {
        if (mainStackDataArrayLength < 2)
            throw "OP_ADD Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.add(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SUB") {
        if (mainStackDataArrayLength < 2)
            throw "OP_SUB Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.sub(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_MUL") {
        if (mainStackDataArrayLength < 2)
            throw "OP_MUL Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.mul(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_DIV") {
        if (mainStackDataArrayLength < 2)
            throw "OP_DIV Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.div(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_MOD") {
        if (mainStackDataArrayLength < 2)
            throw "OP_MOD Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.mod(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LSHIFT") {
        if (mainStackDataArrayLength < 2)
            throw "OP_LSHIFT Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.lshift(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_RSHIFT") {
        if (mainStackDataArrayLength < 2)
            throw "OP_RSHIFT Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.rshift(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_BOOLAND") {
        if (mainStackDataArrayLength < 2)
            throw "OP_BOOLAND Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.boolAnd(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_BOOLOR") {
        if (mainStackDataArrayLength < 2)
            throw "OP_BOOLOR Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.boolOr(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_NUMEQUAL") {
        if (mainStackDataArrayLength < 2)
            throw "OP_NUMEQUAL Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.numEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_NUMEQUALVERIFY") {
        if (mainStackDataArrayLength < 2)
            throw "OP_NUMEQUALVERIFY Error: stack data array must include min 2 data!";
        var isVerifed = lib_core_1.arithmetics.numEqualVerify(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]).number === 1;
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return {
            main: { addDataArray: [], removeLastSize: removeLastSize },
            alt: alt,
            isStackFailed: !isVerifed,
        };
    }
    if (word === "OP_NUMNOTEQUAL") {
        if (mainStackDataArrayLength < 2)
            throw "OP_NUMNOTEQUAL Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.numNotEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LESSTHAN") {
        if (mainStackDataArrayLength < 2)
            throw "OP_LESSTHAN Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.lessThan(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_GREATERTHAN") {
        if (mainStackDataArrayLength < 2)
            throw "OP_GREATERTHAN Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.graterThan(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LESSTHANOREQUAL") {
        if (mainStackDataArrayLength < 2)
            throw "OP_LESSTHANOREQUAL Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.lessThanOrEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_GREATERTHANOREQUAL") {
        if (mainStackDataArrayLength < 2)
            throw "OP_GREATERTHANOREQUAL Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.graterThanOrEqual(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_MIN") {
        if (mainStackDataArrayLength < 2)
            throw "OP_MIN Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.min(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_MAX") {
        if (mainStackDataArrayLength < 2)
            throw "OP_MAX Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics.max(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_WITHIN") {
        if (mainStackDataArrayLength < 3)
            throw "OP_WITHIN Error: stack data array must include min 3 data!";
        var addDataArray = [
            lib_core_1.arithmetics.withIn(mainStackDataArray[mainStackDataArrayLength - 3], // x
            mainStackDataArray[mainStackDataArrayLength - 2], // min
            mainStackDataArray[mainStackDataArrayLength - 1] // max
            ),
        ];
        var removeLastSize = 3;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    /*
     * Crypto
     * 166 - 175
     */
    if (word === "OP_SHA1") {
        if (mainStackDataArrayLength < 1)
            throw "OP_SHA1 Error: stack data array must include min 1 data!";
        var addDataArray = [wiz_data_1.default.fromHex(lib_core_1.crypto.sha1(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SHA256") {
        if (mainStackDataArrayLength < 1)
            throw "OP_SHA256 Error: stack data array must include min 1 data!";
        var addDataArray = [wiz_data_1.default.fromHex(lib_core_1.crypto.sha256(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_RIPEMD160") {
        if (mainStackDataArrayLength < 1)
            throw "OP_RIPEMD160 Error: stack data array must include min 1 data!";
        var addDataArray = [wiz_data_1.default.fromHex(lib_core_1.crypto.ripemd160(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_HASH160") {
        if (mainStackDataArrayLength < 1)
            throw "OP_HASH160 Error: stack data array must include min 1 data!";
        var addDataArray = [wiz_data_1.default.fromHex(lib_core_1.crypto.hash160(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_HASH256") {
        if (mainStackDataArrayLength < 1)
            throw "OP_HASH256 Error: stack data array must include min 1 data!";
        var addDataArray = [wiz_data_1.default.fromHex(lib_core_1.crypto.hash256(mainStackDataArray[mainStackDataArrayLength - 1]).toString())];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_CHECKSIG") {
        if (mainStackDataArrayLength < 2)
            throw "OP_CHECKSIG Error: stack data array must include min 2 data!";
        if (stackDataList.txData === undefined)
            throw "OP_CHECKSIG Error : Tx template data is empty";
        var addDataArray = [
            lib_core_1.crypto.checkSig(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData, (vm === null || vm === void 0 ? void 0 : vm.ver) || _1.VM_NETWORK_VERSION.SEGWIT),
        ];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_CHECKSIGVERIFY") {
        if (mainStackDataArrayLength < 2)
            throw "OP_CHECKSIGVERIFY Error: stack data array must include min 2 data!";
        if (stackDataList.txData === undefined)
            throw "OP_CHECKSIG Error : Tx template data is empty ";
        var isStackFailed = false;
        var checkSigResult = lib_core_1.crypto.checkSig(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData, (vm === null || vm === void 0 ? void 0 : vm.ver) || _1.VM_NETWORK_VERSION.SEGWIT);
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        if (checkSigResult.number === 0)
            isStackFailed = true;
        return { main: { addDataArray: [], removeLastSize: removeLastSize }, alt: alt, isStackFailed: isStackFailed };
    }
    if (word === "OP_CHECKMULTISIG") {
        if (mainStackDataArrayLength < 5)
            throw "OP_CHECKSIG Error: stack data array must include min 4 data!";
        if (stackDataList.txData === undefined)
            throw "OP_CHECKSIG Error : Tx template data is empty";
        if (stackDataList.txData.outputs.length === 0 || stackDataList.txData.inputs.length === 0)
            throw "OP_CHECKSIG Error : Tx template data is empty";
        var reversedArray = __spreadArray([], mainStackDataArray, true).reverse();
        if (reversedArray[reversedArray.length - 1].hex !== "")
            throw "OP_CHECKSIG Error: Stack elements must start with push empty";
        reversedArray.pop();
        var publicKeyLength = reversedArray[0].number;
        if (publicKeyLength === undefined)
            throw "Invalid public key length";
        var publicKeyList = reversedArray.slice(1, publicKeyLength + 1);
        var signatureLength = reversedArray[publicKeyLength + 1].number;
        if (signatureLength === undefined)
            throw "Invalid signature length";
        var signatureList = reversedArray.slice(publicKeyLength + 2, publicKeyLength + 2 + signatureLength);
        var addDataArray = [lib_core_1.crypto.checkMultiSig(publicKeyList, signatureList, stackDataList.txData, (vm === null || vm === void 0 ? void 0 : vm.ver) || _1.VM_NETWORK_VERSION.SEGWIT)];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_CHECKMULTISIGVERIFY") {
        if (mainStackDataArrayLength < 5)
            throw "OP_CHECKMULTISIGVERIFY Error: stack data array must include min 4 data!";
        if (stackDataList.txData === undefined)
            throw "OP_CHECKMULTISIGVERIFY Error : Tx template data is empty";
        if (stackDataList.txData.outputs.length === 0 || stackDataList.txData.inputs.length === 0)
            throw "OP_CHECKMULTISIGVERIFY Error : Tx template data is empty";
        var isStackFailed = false;
        var reversedArray = __spreadArray([], mainStackDataArray, true).reverse();
        if (reversedArray[reversedArray.length - 1].hex !== "")
            throw "OP_CHECKSIG Error: Stack elements must start with push empty";
        reversedArray.pop();
        var publicKeyLength = reversedArray[0].number;
        if (publicKeyLength === undefined)
            throw "Invalid public key length";
        var publicKeyList = reversedArray.slice(1, publicKeyLength + 1);
        var signatureLength = reversedArray[publicKeyLength + 1].number;
        if (signatureLength === undefined)
            throw "Invalid signature length";
        var signatureList = reversedArray.slice(publicKeyLength + 2, publicKeyLength + 2 + signatureLength);
        var verifyResult = lib_core_1.crypto.checkMultiSig(publicKeyList, signatureList, stackDataList.txData, (vm === null || vm === void 0 ? void 0 : vm.ver) || _1.VM_NETWORK_VERSION.SEGWIT);
        var removeLastSize = 0;
        if (verifyResult.number === 0)
            isStackFailed = true;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: [], removeLastSize: removeLastSize }, alt: alt, isStackFailed: isStackFailed };
    }
    if (word === "OP_CHECKSIGFROMSTACK") {
        if (mainStackDataArrayLength < 3)
            throw "OP_CHECKSIGFROMSTACK Error: stack data array must include min 3 data!";
        var addDataArray = [];
        if (vm && vm.ver === _1.VM_NETWORK_VERSION.TAPSCRIPT) {
            addDataArray = [
                lib_core_1.crypto.shnorrSigVerify(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]),
            ];
        }
        else {
            addDataArray = [
                lib_core_1.crypto.ecdsaVerify(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]),
            ];
        }
        var removeLastSize = 3;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_CHECKSIGFROMSTACKVERIFY") {
        if (mainStackDataArrayLength < 3)
            throw "OP_CHECKSIGFROMSTACKVERIFY Error: stack data array must include min 3 data!";
        var isStackFailed = false;
        var verifyResult = void 0;
        if (vm && vm.ver === _1.VM_NETWORK_VERSION.TAPSCRIPT) {
            verifyResult = lib_core_1.crypto.shnorrSigVerify(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        }
        else {
            verifyResult = lib_core_1.crypto.ecdsaVerify(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        }
        if (verifyResult.number === 0)
            isStackFailed = true;
        var removeLastSize = 3;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: [], removeLastSize: removeLastSize }, alt: alt, isStackFailed: isStackFailed };
    }
    // TAPROOT FEATURE
    if (word === "OP_TWEAKVERIFY") {
        if (mainStackDataArrayLength < 3)
            throw "OP_TWEAKVERIFY Error: stack data array must include min 3 data!";
        var isStackFailed = false;
        var verifyResult = lib_core_1.crypto.tweakVerify(mainStackDataArray[mainStackDataArrayLength - 3], mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        if (verifyResult.number === 0)
            isStackFailed = true;
        var removeLastSize = 3;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: [], removeLastSize: removeLastSize }, alt: alt, isStackFailed: isStackFailed };
    }
    /*
     * Locktime
     * 177 - 178
     */
    if (word === "OP_CHECKLOCKTIMEVERIFY") {
        if (mainStackDataArrayLength < 1)
            throw "OP_CHECKLOCKTIMEVERIFY Error: stack data array must include min 1 data!";
        var isStackFailed = false;
        if (!stackDataList.txData)
            throw "Transaction template cannot be empty";
        var locktimeResult = lib_core_1.locktime.checkLockTimeVerify(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData);
        if (locktimeResult.number === 0)
            isStackFailed = true;
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: [], removeLastSize: removeLastSize }, alt: alt, isStackFailed: isStackFailed };
    }
    if (word === "OP_CHECKSEQUENCEVERIFY") {
        if (mainStackDataArrayLength < 1)
            throw "OP_CHECKSEQUENCEVERIFY Error: stack data array must include min 1 data!";
        var isStackFailed = false;
        if (!stackDataList.txData)
            throw "Transaction template cannot be empty";
        var sequenceResult = lib_core_1.locktime.checkSequenceVerify(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData);
        if (sequenceResult.number === 0)
            isStackFailed = true;
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: [], removeLastSize: removeLastSize }, alt: alt, isStackFailed: isStackFailed };
    }
    /*
     * Introspection
     * 199 - 214
     */
    if (word === "OP_INSPECTINPUTOUTPOINT") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTINPUTOUTPOINT Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTINPUTOUTPOINT Error: transaction template must include data.";
        var addDataArray = lib_core_1.introspection.inspectInputOutPoint(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.inputs);
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTINPUTASSET") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTINPUTASSET Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTINPUTASSET Error: transaction template must include data.";
        var addDataArray = lib_core_1.introspection.inspectInputAsset(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.inputs);
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTINPUTVALUE") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTINPUTVALUE Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTINPUTVALUE Error: transaction template must include data.";
        var addDataArray = lib_core_1.introspection.inspectInputValue(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.inputs);
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTINPUTSCRIPTPUBKEY") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTINPUTSCRIPTPUBKEY Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTINPUTSCRIPTPUBKEY Error: transaction template must include data.";
        var addDataArray = lib_core_1.introspection.inspectInputScriptPubKey(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.inputs);
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTINPUTSEQUENCE") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTINPUTSEQUENCE Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTINPUTSEQUENCE Error: transaction template must include data.";
        var addDataArray = [lib_core_1.introspection.inspectInputSequence(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.inputs)];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTINPUTISSUANCE") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTINPUTISSUANCE Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTINPUTISSUANCE Error: transaction template must include data.";
        var addDataArray = [lib_core_1.introspection.inspectInputIssuance(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.inputs)];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_PUSHCURRENTINPUTINDEX") {
        if (!stackDataList.txData)
            throw "OP_PUSHCURRENTINPUTINDEX Error: Script Error introspect context unavailable!";
        var currentInputIndex = wiz_data_1.default.fromNumber(stackDataList.txData.currentInputIndex);
        var addDataArray = [currentInputIndex];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTOUTPUTASSET") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTOUTPUTASSET Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTOUTPUTASSET Error: transaction template must include data.";
        var addDataArray = lib_core_1.introspection.inspectOutputAsset(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.outputs);
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTOUTPUTVALUE") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTOUTPUTVALUE Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTOUTPUTVALUE Error: transaction template must include data.";
        var addDataArray = lib_core_1.introspection.inspectOutputValue(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.outputs);
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTOUTPUTNONCE") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTOUTPUTNONCE Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTOUTPUTNONCE Error: transaction template must include data.";
        var addDataArray = [lib_core_1.introspection.inspectOutputNonce(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.outputs)];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTOUTPUTSCRIPTPUBKEY") {
        if (mainStackDataArrayLength < 1)
            throw "OP_INSPECTOUTPUTSCRIPTPUBKEY Error: stack data array must include min 1 data!";
        if (!stackDataList.txData)
            throw "OP_INSPECTOUTPUTSCRIPTPUBKEY Error: transaction template must include data.";
        var addDataArray = lib_core_1.introspection.inspectOutputScriptPubKey(mainStackDataArray[mainStackDataArrayLength - 1], stackDataList.txData.outputs);
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTVERSION") {
        if (!stackDataList.txData)
            throw "OP_INSPECTVERSION Error: transaction template must include data.";
        if (!stackDataList.txData.version)
            throw "OP_INSPECTVERSION Error: transaction template must include version data.";
        var addDataArray = [wiz_data_1.default.fromHex(stackDataList.txData.version)];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTLOCKTIME") {
        if (!stackDataList.txData)
            throw "OP_INSPECTLOCKTIME Error: transaction template must include data.";
        if (!stackDataList.txData.timelock)
            throw "OP_INSPECTLOCKTIME Error: transaction template must include timelock data.";
        var addDataArray = [wiz_data_1.default.fromHex(stackDataList.txData.timelock)];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTNUMINPUTS") {
        if (!stackDataList.txData)
            throw "OP_INSPECTNUMINPUTS Error: transaction template must include data.";
        var inspectInputsLength = stackDataList.txData.inputs.length;
        var addDataArray = [wiz_data_1.default.fromNumber(inspectInputsLength)];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_INSPECTNUMOUTPUTS") {
        if (!stackDataList.txData)
            throw "OP_INSPECTNUMOUTPUTS Error: transaction template must include data.";
        var inspectOutputsLength = stackDataList.txData.outputs.length;
        var addDataArray = [wiz_data_1.default.fromNumber(inspectOutputsLength)];
        var removeLastSize = 0;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    /*
     * Convertion
     * 215 - 227
     */
    if (word === "OP_ADD64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_ADD64 Error: stack data array must include min 2 data!";
        var addDataArray = lib_core_1.arithmetics64.add64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = addDataArray.length === 1 ? 0 : addDataArray.length;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SUB64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_SUB64 Error: stack data array must include min 2 data!";
        var addDataArray = lib_core_1.arithmetics64.sub64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = addDataArray.length === 1 ? 0 : 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_MUL64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_MUL64 Error: stack data array must include min 2 data!";
        var addDataArray = lib_core_1.arithmetics64.mul64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = addDataArray.length === 1 ? 0 : 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_DIV64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_DIV64 Error: stack data array must include min 2 data!";
        var addDataArray = lib_core_1.arithmetics64.div64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = addDataArray.length === 1 ? 0 : 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_NEG64") {
        if (mainStackDataArrayLength < 1)
            throw "OP_NEG64 Error: stack data array must include min 1 data!";
        var addDataArray = lib_core_1.arithmetics64.neg64(mainStackDataArray[mainStackDataArrayLength - 1]);
        var removeLastSize = addDataArray.length === 1 ? 0 : 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LESSTHAN64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_LESSTHAN Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics64.lessThan64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LESSTHANOREQUAL64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_LESSTHANOREQUAL64 Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics64.lessThanOrEqual64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_GREATERTHAN64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_GREATERTHAN64 Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics64.greaterThan64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_GREATERTHANOREQUAL64") {
        if (mainStackDataArrayLength < 2)
            throw "OP_GREATERTHANOREQUAL64 Error: stack data array must include min 2 data!";
        var addDataArray = [lib_core_1.arithmetics64.greaterThanOrEqual64(mainStackDataArray[mainStackDataArrayLength - 2], mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 2;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_SCRIPTNUMTOLE64") {
        if (mainStackDataArrayLength < 1)
            throw "OP_SCRIPTNUMTOLE64 Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.convertion.numToLE64(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LE64TOSCRIPTNUM") {
        if (mainStackDataArrayLength < 1)
            throw "OP_LE64TOSCRIPTNUM Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.convertion.LE64ToNum(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    if (word === "OP_LE32TOLE64") {
        if (mainStackDataArrayLength < 1)
            throw "LE32toLE64 Error: stack data array must include min 1 data!";
        var addDataArray = [lib_core_1.convertion.LE32toLE64(mainStackDataArray[mainStackDataArrayLength - 1])];
        var removeLastSize = 1;
        var alt = { removeLastStackData: false };
        return { main: { addDataArray: addDataArray, removeLastSize: removeLastSize }, alt: alt };
    }
    /*
     * Not implemented yet
     */
    throw "Unknown op code";
};
exports.opFunctions = opFunctions;
//# sourceMappingURL=opFunctions.js.map