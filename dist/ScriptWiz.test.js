"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScriptWiz_1 = require("./ScriptWiz");
var VM_1 = require("./opcodes/model/VM");
var scriptWiz;
beforeAll(function () {
    var testVm = { network: VM_1.VM_NETWORK.LIQUID, ver: VM_1.VM_NETWORK_VERSION.SEGWIT };
    scriptWiz = new ScriptWiz_1.ScriptWiz(testVm);
});
test("ScripWiz class test", function () {
    scriptWiz.parseHex("4655");
    console.log(scriptWiz.vm);
    console.log(scriptWiz.opCodes);
    console.log(scriptWiz.stackDataList);
});
//# sourceMappingURL=ScriptWiz.test.js.map