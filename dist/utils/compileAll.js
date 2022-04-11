"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileJoin = exports.compileData = void 0;
var wiz_data_1 = require("@script-wiz/wiz-data");
var toLEPadByte = function (number) {
    var hex = number.toString(16);
    var padHex = hex.length % 2 === 0 ? hex : "0" + hex;
    return (0, wiz_data_1.hexLE)(padHex);
};
var compileData = function (hex) {
    var byteLength = hex.length / 2;
    // 0byte
    if (byteLength === 0) {
        return "00";
    }
    // 1 byte
    else if (byteLength === 1) {
        var n = parseInt(hex, 16);
        if (hex === "81") {
            return "4f";
        }
        if (0 < n && n < 17) {
            return (n + 80).toString(16);
        }
        else {
            return "01" + hex;
        }
    }
    // 1 < byte <= 75
    else if (1 < byteLength && byteLength <= 75) {
        return toLEPadByte(byteLength) + hex;
    }
    // 76 < byte <= 255
    else if (76 < byteLength && byteLength <= 255) {
        return "4c" + toLEPadByte(byteLength) + hex;
    }
    // 256 < byte <= 520
    else if (256 < byteLength && byteLength <= 520) {
        return "4d" + toLEPadByte(byteLength) + hex;
    }
    // 520 < byte
    else {
        throw "compileAll: Push exceeds the push size limit of 520 bytes.";
    }
};
exports.compileData = compileData;
var compileJoin = function (hexes) {
    return "0x" + hexes.join("");
};
exports.compileJoin = compileJoin;
//# sourceMappingURL=compileAll.js.map