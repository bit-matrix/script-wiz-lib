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
exports.flowEndIf = exports.flowElse = exports.flowNotIf = exports.flowIf = exports.flowVerify = void 0;
var _1 = require(".");
var flowVerify = function (wizData) { return wizData.hex !== "" && wizData.hex !== "00"; };
exports.flowVerify = flowVerify;
var flowIf = function (wizDataList) {
    var lastStackData = wizDataList.main[wizDataList.main.length - 1];
    var newExpression = (0, exports.flowVerify)(lastStackData);
    var newFlow = __spreadArray(__spreadArray([], wizDataList.flow, true), [newExpression], false);
    return { flow: newFlow, altFlow: [] };
};
exports.flowIf = flowIf;
var flowNotIf = function (wizDataList) {
    var lastStackData = wizDataList.main[wizDataList.main.length - 1];
    var newExpression = !(0, exports.flowVerify)(lastStackData);
    var newFlow = __spreadArray(__spreadArray([], wizDataList.flow, true), [newExpression], false);
    return { flow: newFlow, altFlow: [] };
};
exports.flowNotIf = flowNotIf;
var flowElse = function (wizDataList) {
    if (wizDataList.altFlow.length === 0) {
        var newFlow = __spreadArray([], wizDataList.flow, true);
        newFlow.pop();
        newFlow = __spreadArray(__spreadArray([], newFlow, true), [!(0, _1.currentScope)(wizDataList)], false);
        return { flow: newFlow, altFlow: [] };
    }
    return { flow: wizDataList.flow, altFlow: wizDataList.altFlow };
};
exports.flowElse = flowElse;
var flowEndIf = function (wizDataList) {
    if (wizDataList.altFlow.length === 0) {
        var newFlow = __spreadArray([], wizDataList.flow, true);
        return { flow: newFlow.splice(0, newFlow.length - 1), altFlow: [] };
    }
    var newAltFlow = __spreadArray([], wizDataList.altFlow, true);
    return { flow: wizDataList.flow, altFlow: newAltFlow.splice(0, newAltFlow.length - 1) };
};
exports.flowEndIf = flowEndIf;
//# sourceMappingURL=flow.js.map