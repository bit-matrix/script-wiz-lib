interface IOpWordCode {
  word: string;
  opcode: number;
  hex: string;
  output?: number;
}

const opWordCodes: IOpWordCode[] = [
  /*
   * Constants
   * * 0 - 96
   */
  { word: "OP_0", opcode: 0, hex: "0x00", output: 0 }, // Nothing.	(empty value)	An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)
  { word: "OP_FALSE", opcode: 0, hex: "0x00", output: 0 }, // Nothing.	(empty value)	An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)
  // { word: "N/A", opcode: 1 - 75, hex: "0x01-0x4b", output: 0 }, // (special)	data	The next opcode bytes is data to be pushed onto the stack
  // { word: "OP_PUSHDATA1", opcode: 76, hex: "0x4c" }, //	(special)	data	The next byte contains the number of bytes to be pushed onto the stack.
  // { word: "OP_PUSHDATA2", opcode: 77, hex: "0x4d" }, //	(special)	data	The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.
  // { word: "OP_PUSHDATA4", opcode: 78, hex: "0x4e" }, //	(special)	data	The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.
  // { word: "OP_1NEGATE", opcode: 79, hex: "0x4f" }, //	Nothing.	-1	The number -1 is pushed onto the stack.
  { word: "OP_1", opcode: 81, hex: "0x51", output: 1 }, // Nothing.	1	The number 1 is pushed onto the stack.
  { word: "OP_TRUE", opcode: 81, hex: "0x51", output: 1 }, // Nothing.	1	The number 1 is pushed onto the stack.
  { word: "OP_2", opcode: 82, hex: "0x52", output: 2 }, // Nothing.	2	The number 2 is pushed onto the stack.
  { word: "OP_3", opcode: 83, hex: "0x53", output: 3 }, // Nothing.	3	The number 3 is pushed onto the stack.
  { word: "OP_4", opcode: 84, hex: "0x54", output: 4 }, // Nothing.	4	The number 4 is pushed onto the stack.
  { word: "OP_5", opcode: 85, hex: "0x55", output: 5 }, // Nothing.	5	The number 5 is pushed onto the stack.
  { word: "OP_6", opcode: 86, hex: "0x56", output: 6 }, // Nothing.	6	The number 6 is pushed onto the stack.
  { word: "OP_7", opcode: 87, hex: "0x57", output: 7 }, // Nothing.	7	The number 7 is pushed onto the stack.
  { word: "OP_8", opcode: 88, hex: "0x58", output: 8 }, // Nothing.	8	The number 8 is pushed onto the stack.
  { word: "OP_9", opcode: 89, hex: "0x59", output: 9 }, // Nothing.	9	The number 9 is pushed onto the stack.
  { word: "OP_10", opcode: 90, hex: "0x60", output: 10 }, // Nothing.	10	The number 10 is pushed onto the stack.
  { word: "OP_11", opcode: 91, hex: "0x61", output: 11 }, // Nothing.	11	The number 11 is pushed onto the stack.
  { word: "OP_12", opcode: 92, hex: "0x62", output: 12 }, // Nothing.	12	The number 12 is pushed onto the stack.
  { word: "OP_13", opcode: 93, hex: "0x63", output: 13 }, // Nothing.	13	The number 13 is pushed onto the stack.
  { word: "OP_14", opcode: 94, hex: "0x64", output: 14 }, // Nothing.	14	The number 14 is pushed onto the stack.
  { word: "OP_15", opcode: 95, hex: "0x65", output: 15 }, // Nothing.	15	The number 15 is pushed onto the stack.
  { word: "OP_16", opcode: 96, hex: "0x66", output: 16 }, // Nothing.	16	The number 16 is pushed onto the stack.

  /*
   * Flow control
   * * 97 - 106
   */
  { word: "OP_NOP", opcode: 97, hex: "0x61" }, //	Nothing	Nothing	Does nothing.
  { word: "OP_IF", opcode: 99, hex: "0x63" }, //	<expression> if [statements] [else [statements]]* endif	If the top stack value is not False, the statements are executed. The top stack value is removed.
  { word: "OP_NOTIF", opcode: 100, hex: "0x64" }, //	<expression> notif [statements] [else [statements]]* endif	If the top stack value is False, the statements are executed. The top stack value is removed.
  { word: "OP_ELSE", opcode: 103, hex: "0x67" }, //	<expression> if [statements] [else [statements]]* endif	If the preceding OP_IF or OP_NOTIF or OP_ELSE was not executed then these statements are and if the preceding OP_IF or OP_NOTIF or OP_ELSE was executed then these statements are not.
  { word: "OP_ENDIF", opcode: 104, hex: "0x68" }, //	<expression> if [statements] [else [statements]]* endif	Ends an if/else block. All blocks must end, or the transaction is invalid. An OP_ENDIF without OP_IF earlier is also invalid.
  { word: "OP_VERIFY", opcode: 105, hex: "0x69" }, //	True / false	Nothing / fail	Marks transaction as invalid if top stack value is not true. The top stack value is removed.
  // { word: "OP_RETURN", opcode: 106, hex: "0x6a" }, //	Nothing	fail	Marks transaction as invalid. Since bitcoin 0.9, a standard way of attaching extra data to transactions is to add a zero-value output with a scriptPubKey consisting of OP_RETURN followed by data. Such outputs are provably unspendable and specially discarded from storage in the UTXO set, reducing their cost to the network. Since 0.12, standard relay rules allow a single output with OP_RETURN, that contains any sequence of push statements (or OP_RESERVED[1]) after the OP_RETURN provided the total scriptPubKey length is at most 83 bytes.

  /*
   * Stack
   * * 107 - 125
   */
  { word: "OP_TOALTSTACK", opcode: 107, hex: "0x6b" }, //	x1	(alt)x1	Puts the input onto the top of the alt stack. Removes it from the main stack.
  { word: "OP_FROMALTSTACK", opcode: 108, hex: "0x6c" }, //	(alt)x1	x1	Puts the input onto the top of the main stack. Removes it from the alt stack.
  { word: "OP_2DROP", opcode: 109, hex: "0x6d" }, //	x1 x2	Nothing	Removes the top two stack items.
  { word: "OP_2DUP", opcode: 110, hex: "0x6e" }, //	x1 x2	x1 x2 x1 x2	Duplicates the top two stack items.
  { word: "OP_3DUP", opcode: 111, hex: "0x6f" }, //	x1 x2 x3	x1 x2 x3 x1 x2 x3	Duplicates the top three stack items.
  { word: "OP_2OVER", opcode: 112, hex: "0x70" }, //	x1 x2 x3 x4	x1 x2 x3 x4 x1 x2	Copies the pair of items two spaces back in the stack to the front.
  { word: "OP_2ROT", opcode: 113, hex: "0x71" }, //	x1 x2 x3 x4 x5 x6	x3 x4 x5 x6 x1 x2	The fifth and sixth items back are moved to the top of the stack.
  { word: "OP_2SWAP", opcode: 114, hex: "0x72" }, //	x1 x2 x3 x4	x3 x4 x1 x2	Swaps the top two pairs of stack.
  { word: "OP_IFDUP", opcode: 115, hex: "0x73" }, //	x	x / x x	If the top stack value is not 0, duplicate it.
  { word: "OP_DEPTH", opcode: 116, hex: "0x74" }, //	Nothing	<Stack size>	Puts the number of stack items onto the stack.
  { word: "OP_DROP", opcode: 117, hex: "0x75" }, //	x	Nothing	Removes the top stack item.
  { word: "OP_DUP", opcode: 118, hex: "0x76" }, //	x	x x	Duplicates the top stack item.
  { word: "OP_NIP", opcode: 119, hex: "0x77" }, //	x1 x2	x2	Removes the second-to-top stack item.
  { word: "OP_OVER", opcode: 120, hex: "0x78" }, //	x1 x2	x1 x2 x1	Copies the second-to-top stack item to the top.
  { word: "OP_PICK", opcode: 121, hex: "0x79" }, //	xn ... x2 x1 x0 <n>	xn ... x2 x1 x0 xn	The item n back in the stack is copied to the top.
  { word: "OP_ROLL", opcode: 122, hex: "0x7a" }, //	xn ... x2 x1 x0 <n>	... x2 x1 x0 xn	The item n back in the stack is moved to the top.
  { word: "OP_ROT", opcode: 123, hex: "0x7b" }, //	x1 x2 x3	x2 x3 x1	The 3rd item down the stack is moved to the top.
  { word: "OP_SWAP", opcode: 124, hex: "0x7c" }, //	x1 x2	x2 x1	The top two items on the stack are swapped.
  { word: "OP_TUCK", opcode: 125, hex: "0x7d" }, //	x1 x2	x2 x1 x2	The item at the top of the stack is copied and inserted before the second-to-top item.

  /*
   * Splice
   * 126 - 130
   */
  { word: "OP_CAT", opcode: 126, hex: "0x7e" }, //	x1 x2	out	Concatenates two strings. disabled.
  { word: "OP_SUBSTR", opcode: 127, hex: "0x7f" }, //	in begin size	out	Returns a section of a string. disabled.
  // { word: "OP_LEFT", opcode: 128, hex: "0x80" }, //	in size	out	Keeps only characters left of the specified point in a string. disabled.
  // { word: "OP_RIGHT", opcode: 129, hex: "0x81" }, //	in size	out	Keeps only characters right of the specified point in a string. disabled.
  { word: "OP_SIZE", opcode: 130, hex: "0x82" }, //	in	in size	Pushes the string length of the top element of the stack (without popping it).

  /*
   * Bitwise logic
   * 131 - 136
   */
  { word: "OP_INVERT", opcode: 131, hex: "0x83" }, //	in	out	Flips all of the bits in the input. disabled.
  // { word: "OP_AND", opcode: 132, hex: "0x84" }, //	x1 x2	out	Boolean and between each bit in the inputs. disabled.
  // { word: "OP_OR", opcode: 133, hex: "0x85" }, //	x1 x2	out	Boolean or between each bit in the inputs. disabled.
  // { word: "OP_XOR", opcode: 134, hex: "0x86" }, //	x1 x2	out	Boolean exclusive or between each bit in the inputs. disabled.
  { word: "OP_EQUAL", opcode: 135, hex: "0x87" }, //	x1 x2	True / false	Returns 1 if the inputs are exactly equal, 0 otherwise.
  { word: "OP_EQUALVERIFY", opcode: 136, hex: "0x88" }, //	x1 x2	Nothing / fail	Same as OP_EQUAL, but runs OP_VERIFY afterward.

  /*
   * Arithmetic
   * 139 - 165
   */
  // { word: "OP_1ADD", opcode: 139, hex: "0x8b" }, //	in	out	1 is added to the input.
  // { word: "OP_1SUB", opcode: 140, hex: "0x8c" }, //	in	out	1 is subtracted from the input.
  // { word: "OP_2MUL", opcode: 141, hex: "0x8d" }, //	in	out	The input is multiplied by 2. disabled.
  // { word: "OP_2DIV", opcode: 142, hex: "0x8e" }, //	in	out	The input is divided by 2. disabled.
  // { word: "OP_NEGATE", opcode: 143, hex: "0x8f" }, //	in	out	The sign of the input is flipped.
  // { word: "OP_ABS", opcode: 144, hex: "0x90" }, //	in	out	The input is made positive.
  // { word: "OP_NOT", opcode: 145, hex: "0x91" }, //	in	out	If the input is 0 or 1, it is flipped. Otherwise the output will be 0.
  // { word: "OP_0NOTEQUAL", opcode: 146, hex: "0x92" }, //	in	out	Returns 0 if the input is 0. 1 otherwise.
  { word: "OP_ADD", opcode: 147, hex: "0x93" }, //	a b	out	a is added to b.
  { word: "OP_SUB", opcode: 148, hex: "0x94" }, //	a b	out	b is subtracted from a.
  // { word: "OP_MUL", opcode: 149, hex: "0x95" }, //	a b	out	a is multiplied by b. disabled.
  // { word: "OP_DIV", opcode: 150, hex: "0x96" }, //	a b	out	a is divided by b. disabled.
  // { word: "OP_MOD", opcode: 151, hex: "0x97" }, //	a b	out	Returns the remainder after dividing a by b. disabled.
  { word: "OP_LSHIFT", opcode: 152, hex: "0x98" }, //	a b	out	Shifts a left b bits, preserving sign. disabled.
  { word: "OP_RSHIFT", opcode: 153, hex: "0x99" }, //	a b	out	Shifts a right b bits, preserving sign. disabled.
  // { word: "OP_BOOLAND", opcode: 154, hex: "0x9a" }, //	a b	out	If both a and b are not 0, the output is 1. Otherwise 0.
  // { word: "OP_BOOLOR", opcode: 155, hex: "0x9b" }, //	a b	out	If a or b is not 0, the output is 1. Otherwise 0.
  // { word: "OP_NUMEQUAL", opcode: 156, hex: "0x9c" }, //	a b	out	Returns 1 if the numbers are equal, 0 otherwise.
  // { word: "OP_NUMEQUALVERIFY", opcode: 157, hex: "0x9d" }, //	a b	Nothing / fail	Same as OP_NUMEQUAL, but runs OP_VERIFY afterward.
  // { word: "OP_NUMNOTEQUAL", opcode: 158, hex: "0x9e" }, //	a b	out	Returns 1 if the numbers are not equal, 0 otherwise.
  // { word: "OP_LESSTHAN", opcode: 159, hex: "0x9f" }, //	a b	out	Returns 1 if a is less than b, 0 otherwise.
  // { word: "OP_GREATERTHAN", opcode: 160, hex: "0xa0" }, //	a b	out	Returns 1 if a is greater than b, 0 otherwise.
  // { word: "OP_LESSTHANOREQUAL", opcode: 161, hex: "0xa1" }, //	a b	out	Returns 1 if a is less than or equal to b, 0 otherwise.
  { word: "OP_GREATERTHANOREQUAL", opcode: 162, hex: "0xa2" }, //	a b	out	Returns 1 if a is greater than or equal to b, 0 otherwise.
  // { word: "OP_MIN", opcode: 163, hex: "0xa3" }, //	a b	out	Returns the smaller of a and b.
  // { word: "OP_MAX", opcode: 164, hex: "0xa4" }, //	a b	out	Returns the larger of a and b.
  // { word: "OP_WITHIN", opcode: 165, hex: "0xa5" }, //	x min max	out	Returns 1 if x is within the specified range (left-inclusive), 0 otherwise.

  /*
   * Crypto
   * 166 - 175
   */
  { word: "OP_RIPEMD160", opcode: 166, hex: "0xa6" }, //	in	hash	The input is hashed using RIPEMD-160.
  { word: "OP_SHA1", opcode: 167, hex: "0xa7" }, //	in	hash	The input is hashed using SHA-1.
  { word: "OP_SHA256", opcode: 168, hex: "0xa8" }, //	in	hash	The input is hashed using SHA-256.
  { word: "OP_HASH160", opcode: 169, hex: "0xa9" }, //	in	hash	The input is hashed twice: first with SHA-256 and then with RIPEMD-160.
  { word: "OP_HASH256", opcode: 170, hex: "0xaa" }, //	in	hash	The input is hashed two times with SHA-256.
  // { word: "OP_CODESEPARATOR", opcode: 171, hex: "0xab" }, //	Nothing	Nothing	All of the signature checking words will only match signatures to the data after the most recently-executed OP_CODESEPARATOR.
  // { word: "OP_CHECKSIG", opcode: 172, hex: "0xac" }, //	sig pubkey	True / false	The entire transaction's outputs, inputs, and script (from the most recently-executed OP_CODESEPARATOR to the end) are hashed. The signature used by OP_CHECKSIG must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.
  // { word: "OP_CHECKSIGVERIFY", opcode: 173, hex: "0xad" }, //	sig pubkey	Nothing / fail	Same as OP_CHECKSIG, but OP_VERIFY is executed afterward.
  // { word: "OP_CHECKMULTISIG", opcode: 174, hex: "0xae" }, //	x sig1 sig2 ... <number of signatures> pub1 pub2 <number of public keys>	True / False	Compares the first signature against each public key until it finds an ECDSA match. Starting with the subsequent public key, it compares the second signature against each remaining public key until it finds an ECDSA match. The process is repeated until all signatures have been checked or not enough public keys remain to produce a successful result. All signatures need to match a public key. Because public keys are not checked again if they fail any signature comparison, signatures must be placed in the scriptSig using the same order as their corresponding public keys were placed in the scriptPubKey or redeemScript. If all signatures are valid, 1 is returned, 0 otherwise. Due to a bug, one extra unused value is removed from the stack.
  // { word: "OP_CHECKMULTISIGVERIFY", opcode: 175, hex: "0xaf" }, //	x sig1 sig2 ... <number of signatures> pub1 pub2 ... <number of public keys>	Nothing / fail	Same as OP_CHECKMULTISIG, but OP_VERIFY is executed afterward.
  { word: "OP_CHECKSIGFROMSTACK", opcode: 186, hex: "0xba" },

  /*
   * Locktime
   * 177 - 178
   */
  // (previously OP_NOP2)
  // { word: "OP_CHECKLOCKTIMEVERIFY", opcode: 177, hex: "0xb1" }, //	x	x / fail	Marks transaction as invalid if the top stack item is greater than the transaction's nLockTime field, otherwise script evaluation continues as though an OP_NOP was executed. Transaction is also invalid if 1. the stack is empty; or 2. the top stack item is negative; or 3. the top stack item is greater than or equal to 500000000 while the transaction's nLockTime field is less than 500000000, or vice versa; or 4. the input's nSequence field is equal to 0xffffffff. The precise semantics are described in BIP 0065.
  // (previously OP_NOP3)
  // { word: "OP_CHECKSEQUENCEVERIFY", opcode: 178, hex: "0xb2" }, //	x	x / fail	Marks transaction as invalid if the relative lock time of the input (enforced by BIP 0068 with nSequence) is not equal to or longer than the value of the top stack item. The precise semantics are described in BIP 0112.

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

export default opWordCodes;
export { IOpWordCode };
