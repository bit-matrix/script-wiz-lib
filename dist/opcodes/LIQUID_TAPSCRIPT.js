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
exports.opcodesLiquidTapscript = void 0;
var LIQUID_SEGWIT_1 = require("./LIQUID_SEGWIT");
exports.opcodesLiquidTapscript = __spreadArray(__spreadArray([], LIQUID_SEGWIT_1.opcodesLiquidSegwit, true), [
    /*
     * Introspection Opcodes
     */
    // inputs
    {
        word: "OP_INSPECTINPUTOUTPOINT",
        opcode: 199,
        hex: "0xc7",
        description: " Pop a CScriptNum input index idx and push the outpoint as a tuple. First push the txid(32) of the prev_out, followed by a 4 byte push of vout followed by a push for the outpoint_flag(1) as defined in Modified BIP-341 SigMsg for Elements.",
    },
    {
        word: "OP_INSPECTINPUTASSET",
        opcode: 200,
        hex: "0xc8",
        description: "  Pop a CScriptNum input index idx and push the nAsset onto the stack as two elements. The first push the assetID(32), followed by the prefix(1).",
    },
    {
        word: "OP_INSPECTINPUTVALUE",
        opcode: 201,
        hex: "0xc9",
        description: " Pop a CScriptNum input index idx and push the nValue as a tuple, value(8 byte LE, 32) followed by prefix(1).",
    },
    {
        word: "OP_INSPECTINPUTSCRIPTPUBKEY",
        opcode: 202,
        hex: "0xca",
        description: " Pop a CScriptNum input index idx and push the following depending the type of scriptPubkey: If the scriptPubKey is not a native segwit program, push a single sha256 hash of the scriptPubKey on stack top. Next, push a CScriptNum(-1) to indicate a non-native segwit scriptPubKey.If the scriptPubKey is a native segwit program, push the witness program(2-40) followed by a push for segwit version(0-1).",
    },
    {
        word: "OP_INSPECTINPUTSEQUENCE",
        opcode: 203,
        hex: "0xcb",
        description: " Pop a CScriptNum input index idx and push the nSequence(4) as little-endian number.",
    },
    {
        word: "OP_INSPECTINPUTISSUANCE",
        opcode: 204,
        hex: "0xcc",
        description: " Pop a CScriptNum input index idx and push the assetIssuance information if the asset has issuance, otherwise push an empty vector. Asset Issuance information is pushed as follows: Push nInflationKeys as tuple, value(8 byte LE, 32) followed by push for prefix(1). In case nInflationKeys is null, push a 8 byte LE 0 followed by a push for explicit prefix(1).Push nAmount as a tuple, value(8 byte LE, 32) followed by a push for prefix(1). In case nAmount is null, push a 8 byte LE 0 followed by a push for explicit prefix(1).Push 32 byte assetEntropy.Push 32 byte assetBlindingNonce.",
    },
    // current index
    {
        word: "OP_PUSHCURRENTINPUTINDEX",
        opcode: 205,
        hex: "0xcd",
        description: " that pushes the current input index as CScriptNum. This can be used in conjunction with input introspection opcodes for inspecting current input.",
    },
    // outputs
    {
        word: "OP_INSPECTOUTPUTASSET",
        opcode: 206,
        hex: "0xce",
        description: "  Pop a CScriptNum input index idx and push the nAsset as a tuple, first push the assetID(32), followed by the prefix(1).",
    },
    {
        word: "OP_INSPECTOUTPUTVALUE",
        opcode: 207,
        hex: "0xcf",
        description: " Pop a CScriptNum input index idx and push the nValue as a tuple, value(8 byte LE, 32) followed by prefix.",
    },
    {
        word: "OP_INSPECTOUTPUTNONCE",
        opcode: 208,
        hex: "0xd0",
        description: " Pop a CScriptNum input index idx and push the nNonce(33) onto the stack. If the nonce is null, push an empty vector onto the stack.",
    },
    {
        word: "OP_INSPECTOUTPUTSCRIPTPUBKEY",
        opcode: 209,
        hex: "0xd1",
        description: " Pop a CScriptNum input index idx and push the scriptPubkey onto the stack.If the scriptPubKey is not a native segwit program, push a single sha256 hash of the scriptPubKey on stack top. Next, push a CScriptNum(-1) to indicate a non-native segwit scriptPubKey.If the scriptPubKey is a native segwit program, push the witness program(2-40) followed by a push for segwit version(0-1).",
    },
    // transaction
    {
        word: "OP_INSPECTVERSION",
        opcode: 210,
        hex: "0xd2",
        description: " Push the nVersion(4) as little-endian.",
    },
    {
        word: "OP_INSPECTLOCKTIME",
        opcode: 211,
        hex: "0xd3",
        description: " Push the nLockTime(4) as little-endian.",
    },
    {
        word: "OP_INSPECTNUMINPUTS",
        opcode: 212,
        hex: "0xd4",
        description: " Push the number of inputs as CScriptNum.",
    },
    {
        word: "OP_INSPECTNUMOUTPUTS",
        opcode: 213,
        hex: "0xd5",
        description: " Push the number of outputs as CScriptNum.",
    },
    {
        word: "OP_TXWEIGHT",
        opcode: 214,
        hex: "0xd6",
        description: " Push the transaction weight (8) as little-endian.",
    },
    /*
     * Conversion
     */
    {
        word: "OP_ADD64",
        opcode: 215,
        hex: "0xd7",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a + b onto the stack. Push 1 CScriptNum if there is no overflow. Overflow behavior defined above.",
    },
    {
        word: "OP_SUB64",
        opcode: 216,
        hex: "0xd8",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a - b onto the stack. Push 1 CScriptNum if there is no overflow. Overflow behavior defined above.",
    },
    {
        word: "OP_MUL64",
        opcode: 217,
        hex: "0xd9",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a*b onto the stack. Push 1 CScriptNum if there is no overflow. Overflow behavior defined above.",
    },
    {
        word: "OP_DIV64",
        opcode: 218,
        hex: "0xda",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). First push remainder a%b(must be non-negative and less than |b|) onto the stack followed by quotient(a//b) onto the stack. If b==0 or a = -2<sup>63</sup> && b = -1, treat as overflow as defined above. Push 1 CScriptNum if there is no overflow.",
    },
    {
        word: "OP_NEG64",
        opcode: 219,
        hex: "0xdb",
        description: " pop the first number(8 byte LE) as a and pushes -a on the stack top. If the number is -2<sup>63</sup>(int64_min) treat as overflow, otherwise push CScriptNum 1 to indicate no overflow.",
    },
    {
        word: "OP_LESSTHAN64",
        opcode: 220,
        hex: "0xdc",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a < b.",
    },
    {
        word: "OP_LESSTHANOREQUAL64",
        opcode: 221,
        hex: "0xdd",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a <= b.",
    },
    {
        word: "OP_GREATERTHAN64",
        opcode: 222,
        hex: "0xde",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a > b.",
    },
    {
        word: "OP_GREATERTHANOREQUAL64",
        opcode: 223,
        hex: "0xdf",
        description: " pop the first number(8 byte LE) as b followed another pop for a(8 byte LE). Push a >= b.",
    },
    {
        word: "OP_SCRIPTNUMTOLE64",
        opcode: 224,
        hex: "0xe0",
        description: " pop the stack as minimal CSciptNum, push 8 byte signed LE corresponding to that number.",
    },
    {
        word: "OP_LE64TOSCRIPTNUM",
        opcode: 225,
        hex: "0xe1",
        description: "pop the stack as a 8 byte signed LE. Convert to CScriptNum and push it, abort on fail.",
    },
    {
        word: "OP_LE32TOLE64",
        opcode: 226,
        hex: "0xe2",
        description: "pop the stack as a 4 byte unsigned LE. Push the corresponding 8 byte signed LE number. Cannot fail, useful for operating of version, locktime, sequence, number of inputs, number of outputs, weight etc.",
    },
    /*
     * Crypto
     */
    {
        word: "OP_TWEAKVERIFY",
        opcode: 228,
        hex: "0xe4",
        description: "Pop the three elements as: 1) 32 byte X-only internal key P, 2) a 32 byte big endian, unsigned scalar k, and 3) 33 byte compressed point Q. Abort if P, Q is invalid or k is not 32 bytes and outside of secp256k1 curve order. Abort if Q != P + k*G where G is the generator for secp256k1.",
    }, //	liquid network feature.
], false);
//# sourceMappingURL=LIQUID_TAPSCRIPT.js.map