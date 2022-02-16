"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonOpcodes = void 0;
exports.commonOpcodes = [
    /*
     * Constants
     * * 0 - 96
     */
    {
        word: "OP_0",
        opcode: 0,
        hex: "0x00",
        output: 0,
        description: "(empty value)	An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)",
    },
    {
        word: "OP_FALSE",
        opcode: 0,
        hex: "0x00",
        output: 0,
        description: "(empty value)	An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)",
    },
    // { word: "N/A", opcode: 1 - 75, hex: "0x01-0x4b", output: 0 }, // (special)	data	The next opcode bytes is data to be pushed onto the stack
    // { word: "OP_PUSHDATA1", opcode: 76, hex: "0x4c" }, //	(special)	data	The next byte contains the number of bytes to be pushed onto the stack.
    // { word: "OP_PUSHDATA2", opcode: 77, hex: "0x4d" }, //	(special)	data	The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.
    // { word: "OP_PUSHDATA4", opcode: 78, hex: "0x4e" }, //	(special)	data	The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.
    { word: "OP_1NEGATE", opcode: 79, hex: "0x4f", output: -1, description: "	-1	The number -1 is pushed onto the stack." },
    { word: "OP_1", opcode: 81, hex: "0x51", output: 1, description: "The number 1 is pushed onto the stack." },
    { word: "OP_TRUE", opcode: 81, hex: "0x51", output: 1, description: "The number 1 is pushed onto the stack." },
    { word: "OP_2", opcode: 82, hex: "0x52", output: 2, description: "The number 2 is pushed onto the stack." },
    { word: "OP_3", opcode: 83, hex: "0x53", output: 3, description: "The number 3 is pushed onto the stack." },
    { word: "OP_4", opcode: 84, hex: "0x54", output: 4, description: "The number 4 is pushed onto the stack." },
    { word: "OP_5", opcode: 85, hex: "0x55", output: 5, description: "The number 5 is pushed onto the stack." },
    { word: "OP_6", opcode: 86, hex: "0x56", output: 6, description: "The number 6 is pushed onto the stack." },
    { word: "OP_7", opcode: 87, hex: "0x57", output: 7, description: "The number 7 is pushed onto the stack." },
    { word: "OP_8", opcode: 88, hex: "0x58", output: 8, description: "The number 8 is pushed onto the stack." },
    { word: "OP_9", opcode: 89, hex: "0x59", output: 9, description: "The number 9 is pushed onto the stack." },
    { word: "OP_10", opcode: 90, hex: "0x5a", output: 10, description: "The number 10 is pushed onto the stack." },
    { word: "OP_11", opcode: 91, hex: "0x5b", output: 11, description: "The number 11 is pushed onto the stack." },
    { word: "OP_12", opcode: 92, hex: "0x5c", output: 12, description: "The number 12 is pushed onto the stack." },
    { word: "OP_13", opcode: 93, hex: "0x5d", output: 13, description: "The number 13 is pushed onto the stack." },
    { word: "OP_14", opcode: 94, hex: "0x5e", output: 14, description: "The number 14 is pushed onto the stack." },
    { word: "OP_15", opcode: 95, hex: "0x5f", output: 15, description: "The number 15 is pushed onto the stack." },
    { word: "OP_16", opcode: 96, hex: "0x60", output: 16, description: "The number 16 is pushed onto the stack." },
    /*
     * Flow control
     * * 97 - 106
     */
    { word: "OP_NOP", opcode: 97, hex: "0x61", description: "Nothing	Does nothing." },
    {
        word: "OP_IF",
        opcode: 99,
        hex: "0x63",
        description: "if [statements] [else [statements]]* endif	If the top stack value is not False, the statements are executed. The top stack value is removed.",
    },
    {
        word: "OP_NOTIF",
        opcode: 100,
        hex: "0x64",
        description: "notif [statements] [else [statements]]* endif	If the top stack value is False, the statements are executed. The top stack value is removed.",
    },
    {
        word: "OP_ELSE",
        opcode: 103,
        hex: "0x67",
        description: " if [statements] [else [statements]]* endif	If the preceding OP_IF or OP_NOTIF or OP_ELSE was not executed then these statements are and if the preceding OP_IF or OP_NOTIF or OP_ELSE was executed then these statements are not.",
    },
    {
        word: "OP_ENDIF",
        opcode: 104,
        hex: "0x68",
        description: "if [statements] [else [statements]]* endif	Ends an if/else block. All blocks must end, or the transaction is invalid. An OP_ENDIF without OP_IF earlier is also invalid.",
    },
    { word: "OP_VERIFY", opcode: 105, hex: "0x69", description: "	Marks transaction as invalid if top stack value is not true. The top stack value is removed." },
    {
        word: "OP_RETURN",
        opcode: 106,
        hex: "0x6a",
        description: "Nothing	fail	Marks transaction as invalid. Since bitcoin 0.9, a standard way of attaching extra data to transactions is to add a zero-value output with a scriptPubKey consisting of OP_RETURN followed by data. Such outputs are provably unspendable and specially discarded from storage in the UTXO set, reducing their cost to the network. Since 0.12, standard relay rules allow a single output with OP_RETURN, that contains any sequence of push statements (or OP_RESERVED[1]) after the OP_RETURN provided the total scriptPubKey length is at most 83 bytes.",
    },
    /*
     * Stack
     * * 107 - 125
     */
    { word: "OP_TOALTSTACK", opcode: 107, hex: "0x6b", description: "Puts the input onto the top of the alt stack. Removes it from the main stack." },
    { word: "OP_FROMALTSTACK", opcode: 108, hex: "0x6c", description: "Puts the input onto the top of the main stack. Removes it from the alt stack." },
    { word: "OP_2DROP", opcode: 109, hex: "0x6d", description: "Nothing	Removes the top two stack items." },
    { word: "OP_2DUP", opcode: 110, hex: "0x6e", description: "Duplicates the top two stack items" },
    { word: "OP_3DUP", opcode: 111, hex: "0x6f", description: "Duplicates the top three stack items." },
    { word: "OP_2OVER", opcode: 112, hex: "0x70", description: "Copies the pair of items two spaces back in the stack to the front." },
    { word: "OP_2ROT", opcode: 113, hex: "0x71", description: "The fifth and sixth items back are moved to the top of the stack." },
    { word: "OP_2SWAP", opcode: 114, hex: "0x72", description: "Swaps the top two pairs of stack." },
    { word: "OP_IFDUP", opcode: 115, hex: "0x73", description: "If the top stack value is not 0, duplicate it." },
    { word: "OP_DEPTH", opcode: 116, hex: "0x74", description: "Puts the number of stack items onto the stack." },
    { word: "OP_DROP", opcode: 117, hex: "0x75", description: "Removes the top stack item." },
    { word: "OP_DUP", opcode: 118, hex: "0x76", description: "Duplicates the top stack item." },
    { word: "OP_NIP", opcode: 119, hex: "0x77", description: "Removes the second-to-top stack item." },
    { word: "OP_OVER", opcode: 120, hex: "0x78", description: "Copies the second-to-top stack item to the top." },
    { word: "OP_PICK", opcode: 121, hex: "0x79", description: "The item n back in the stack is copied to the top." },
    { word: "OP_ROLL", opcode: 122, hex: "0x7a", description: "The item n back in the stack is moved to the top." },
    { word: "OP_ROT", opcode: 123, hex: "0x7b", description: "The 3rd item down the stack is moved to the top." },
    { word: "OP_SWAP", opcode: 124, hex: "0x7c", description: "The top two items on the stack are swapped." },
    { word: "OP_TUCK", opcode: 125, hex: "0x7d", description: "The item at the top of the stack is copied and inserted before the second-to-top item." },
    /*
     * Splice
     * 126 - 130
     */
    { word: "OP_SIZE", opcode: 130, hex: "0x82", description: "Pushes the string length of the top element of the stack (without popping it)." },
    /*
     * Bitwise logic
     * 131 - 136
     */
    { word: "OP_EQUAL", opcode: 135, hex: "0x87", description: "Returns 1 if the inputs are exactly equal, 0 otherwise." },
    { word: "OP_EQUALVERIFY", opcode: 136, hex: "0x88", description: "Same as OP_EQUAL, but runs OP_VERIFY afterward." },
    /*
     * Arithmetic
     * 139 - 165
     */
    { word: "OP_1ADD", opcode: 139, hex: "0x8b", description: "1 is added to the input." },
    { word: "OP_1SUB", opcode: 140, hex: "0x8c", description: "1 is subtracted from the input." },
    // { word: "OP_2MUL", opcode: 141, hex: "0x8d" }, //	in	out	The input is multiplied by 2. disabled.
    // { word: "OP_2DIV", opcode: 142, hex: "0x8e" }, //	in	out	The input is divided by 2. disabled.
    { word: "OP_NEGATE", opcode: 143, hex: "0x8f", description: "The sign of the input is flipped." },
    { word: "OP_ABS", opcode: 144, hex: "0x90", description: "The input is made positive." },
    { word: "OP_NOT", opcode: 145, hex: "0x91", description: "If the input is 0 or 1, it is flipped. Otherwise the output will be 0." },
    { word: "OP_0NOTEQUAL", opcode: 146, hex: "0x92", description: "Returns 0 if the input is 0. 1 otherwise." },
    { word: "OP_ADD", opcode: 147, hex: "0x93", description: "a is added to b." },
    { word: "OP_SUB", opcode: 148, hex: "0x94", description: "b is subtracted from a." },
    // { word: "OP_MUL", opcode: 149, hex: "0x95" }, //	a b	out	a is multiplied by b. disabled.
    // { word: "OP_DIV", opcode: 150, hex: "0x96" }, //	a b	out	a is divided by b. disabled.
    // { word: "OP_MOD", opcode: 151, hex: "0x97" }, //	a b	out	Returns the remainder after dividing a by b. disabled.
    { word: "OP_BOOLAND", opcode: 154, hex: "0x9a", description: "	If both a and b are not 0, the output is 1. Otherwise 0." },
    { word: "OP_BOOLOR", opcode: 155, hex: "0x9b", description: "If a or b is not 0, the output is 1. Otherwise 0." },
    { word: "OP_NUMEQUAL", opcode: 156, hex: "0x9c", description: "Returns 1 if the numbers are equal, 0 otherwise." },
    { word: "OP_NUMEQUALVERIFY", opcode: 157, hex: "0x9d", description: "Same as OP_NUMEQUAL, but runs OP_VERIFY afterward." },
    { word: "OP_NUMNOTEQUAL", opcode: 158, hex: "0x9e", description: "Returns 1 if the numbers are not equal, 0 otherwise." },
    { word: "OP_LESSTHAN", opcode: 159, hex: "0x9f", description: "Returns 1 if a is less than b, 0 otherwise." },
    { word: "OP_GREATERTHAN", opcode: 160, hex: "0xa0", description: "Returns 1 if a is greater than b, 0 otherwise." },
    { word: "OP_LESSTHANOREQUAL", opcode: 161, hex: "0xa1", description: "Returns 1 if a is less than or equal to b, 0 otherwise." },
    { word: "OP_GREATERTHANOREQUAL", opcode: 162, hex: "0xa2", description: "	Returns 1 if a is greater than or equal to b, 0 otherwise." },
    { word: "OP_MIN", opcode: 163, hex: "0xa3", description: "Returns the smaller of a and b." },
    { word: "OP_MAX", opcode: 164, hex: "0xa4", description: "Returns the larger of a and b." },
    { word: "OP_WITHIN", opcode: 165, hex: "0xa5", description: "Returns 1 if x is within the specified range (left-inclusive), 0 otherwise." },
    /*
     * Crypto
     * 166 - 175
     */
    { word: "OP_RIPEMD160", opcode: 166, hex: "0xa6", description: "The input is hashed using RIPEMD-160." },
    { word: "OP_SHA1", opcode: 167, hex: "0xa7", description: "The input is hashed using SHA-1." },
    { word: "OP_SHA256", opcode: 168, hex: "0xa8", description: "The input is hashed using SHA-256." },
    { word: "OP_HASH160", opcode: 169, hex: "0xa9", description: "The input is hashed twice: first with SHA-256 and then with RIPEMD-160." },
    { word: "OP_HASH256", opcode: 170, hex: "0xaa", description: "The input is hashed two times with SHA-256." },
    // { word: "OP_CODESEPARATOR", opcode: 171, hex: "0xab" }, //	Nothing	Nothing	All of the signature checking words will only match signatures to the data after the most recently-executed OP_CODESEPARATOR.
    { word: "OP_CHECKSIG", opcode: 172, hex: "0xac" },
    { word: "OP_CHECKSIGVERIFY", opcode: 173, hex: "0xad" },
    { word: "OP_CHECKMULTISIG", opcode: 174, hex: "0xae" },
    // { word: "OP_CHECKMULTISIGVERIFY", opcode: 175, hex: "0xaf" }, //	x sig1 sig2 ... <number of signatures> pub1 pub2 ... <number of public keys>	Nothing / fail	Same as OP_CHECKMULTISIG, but OP_VERIFY is executed afterward.
    /*
     * Locktime
     * 177 - 178
     */
    // (previously OP_NOP2)
    { word: "OP_CHECKLOCKTIMEVERIFY", opcode: 177, hex: "0xb1" },
    // (previously OP_NOP3)
    { word: "OP_CHECKSEQUENCEVERIFY", opcode: 178, hex: "0xb2" }, //	x	x / fail	Marks transaction as invalid if the relative lock time of the input (enforced by BIP 0068 with nSequence) is not equal to or longer than the value of the top stack item. The precise semantics are described in BIP 0112.
    /*
     * Reserved words
     * 80, 98, 101, 102, 137, 138, 176, 179-185
     */
    // { word: "OP_RESERVED", opcode: 80, hex: "0x50" }, //	Transaction is invalid unless occuring in an unexecuted OP_IF branch
    // { word: "OP_VER", opcode: 98, hex: "0x62" }, //	Transaction is invalid unless occuring in an unexecuted OP_IF branch
    // { word: "OP_VERIF", opcode: 101, hex: "0x65" }, //	Transaction is invalid even when occuring in an unexecuted OP_IF branch
    // { word: "OP_VERNOTIF", opcode: 102, hex: "0x66" }, //	Transaction is invalid even when occuring in an unexecuted OP_IF branch
    // { word: "OP_RESERVED1", opcode: 137, hex: "0x89" }, //	Transaction is invalid unless occuring in an unexecuted OP_IF branch
    // { word: "OP_RESERVED2", opcode: 138, hex: "0x8a" }, //	Transaction is invalid unless occuring in an unexecuted OP_IF branch
    // { word: "OP_NOP1", opcode: 176, hex: "0xb0" }, //	The word is ignored. Does not mark transaction as invalid.
    // { word: "OP_NOP4", opcode: 179, hex: "0xb3" }, //	The word is ignored. Does not mark transaction as invalid.
    // { word: "OP_NOP5", opcode: 180, hex: "0xb4" }, //	The word is ignored. Does not mark transaction as invalid.
    // { word: "OP_NOP6", opcode: 181, hex: "0xb5" }, //	The word is ignored. Does not mark transaction as invalid.
    // { word: "OP_NOP7", opcode: 182, hex: "0xb6" }, //	The word is ignored. Does not mark transaction as invalid.
    // { word: "OP_NOP8", opcode: 183, hex: "0xb7" }, //	The word is ignored. Does not mark transaction as invalid.
    // { word: "OP_NOP9", opcode: 184, hex: "0xb8" }, //	The word is ignored. Does not mark transaction as invalid.
    // { word: "OP_NOP10", opcode: 185, hex: "0xb9" }, //	The word is ignored. Does not mark transaction as invalid.
    /*
     * Pseudo-words
     * 253 - 255
     */
    // { word: "OP_PUBKEYHASH", opcode: 253, hex: "0xfd" }, //	Represents a public key hashed with OP_HASH160.
    // { word: "OP_PUBKEY", opcode: 254, hex: "0xfe" }, //	Represents a public key compatible with OP_CHECKSIG.
    // { word: "OP_INVALIDOPCODE", opcode: 255, hex: "0xff" }, //	Matches any opcode that is not yet assigned.
];
//# sourceMappingURL=common.js.map