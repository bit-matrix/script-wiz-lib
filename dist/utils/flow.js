"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowEndIf = exports.flowElse = exports.flowNotIf = exports.flowIf = exports.flowVerify = void 0;
var _1 = require(".");
var flowVerify = function (wizData) { return wizData.hex !== "" && wizData.hex !== "00"; };
exports.flowVerify = flowVerify;
var flowIf = function (wizDataList) {
    var lastStackData = wizDataList.main[wizDataList.main.length - 1];
    var newExpression = exports.flowVerify(lastStackData);
    var newFlow = __spreadArray(__spreadArray([], wizDataList.flow), [newExpression]);
    return { flow: newFlow, altFlow: [] };
};
exports.flowIf = flowIf;
var flowNotIf = function (wizDataList) {
    var lastStackData = wizDataList.main[wizDataList.main.length - 1];
    var newExpression = !exports.flowVerify(lastStackData);
    var newFlow = __spreadArray(__spreadArray([], wizDataList.flow), [newExpression]);
    return { flow: newFlow, altFlow: [] };
};
exports.flowNotIf = flowNotIf;
var flowElse = function (wizDataList) {
    if (wizDataList.altFlow.length === 0) {
        var newFlow = __spreadArray([], wizDataList.flow);
        newFlow.pop();
        newFlow = __spreadArray(__spreadArray([], newFlow), [!_1.currentScope(wizDataList)]);
        return { flow: newFlow, altFlow: [] };
    }
    return { flow: wizDataList.flow, altFlow: wizDataList.altFlow };
};
exports.flowElse = flowElse;
var flowEndIf = function (wizDataList) {
    if (wizDataList.altFlow.length === 0) {
        var newFlow = __spreadArray([], wizDataList.flow);
        return { flow: newFlow.splice(0, newFlow.length - 1), altFlow: [] };
    }
    var newAltFlow = __spreadArray([], wizDataList.altFlow);
    return { flow: wizDataList.flow, altFlow: newAltFlow.splice(0, newAltFlow.length - 1) };
};
exports.flowEndIf = flowEndIf;
//# sourceMappingURL=flow.js.map