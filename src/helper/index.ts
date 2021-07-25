const hexLittleEndian = (hex: string): string => {
  if (hex.length % 2 === 0) {
    let str = "0x";
    let j = 0;

    if (hex.startsWith("0x")) {
      j = 2;
    }

    for (let i = hex.length; i > j; i -= 2) {
      str += hex.substring(i - 2, i);
    }

    return str;
  } else {
    console.warn("its odd");
    return "something went wrong";
  }
};

// Surrogates for emoji char code
// const raw = (input: string) => {
//   if (input.length === 1) {
//     return input.charCodeAt(0);
//   }
//   let comp = (input.charCodeAt(0) - 0xd800) * 0x400 + (input.charCodeAt(1) - 0xdc00) + 0x10000;
//   if (comp < 0) {
//     return input.charCodeAt(0);
//   }
//   return comp;
// };

// const hexInput = (input: string): StackData => {
//   let value: number;
//   let display: string;

//   if (typeof input === "number") {
//     if (input >= maxInteger) {
//       display = input;
//     } else {
//     }
//     const hexValue = hexNumber(input);
//     display = hexLittleEndian(hexValue);
//     value = input;
//   } else {
//     display = input;
//     // value = hexString(input);
//   }

//   return { input, value, display };
// };

const opcodeToData = (word: string): IOpWordCode | undefined => opWordCodes.find((owc) => owc.word === word);

const opcodeToWord = (opcode: number): string => opWordCodes.find((owc) => owc.opcode === opcode)?.word || "";

const opWordToCode = (word: string): number => {
  const opcode = opWordCodes.find((owc) => owc.word === word)?.opcode;
  return opcode === undefined ? -1 : opcode;
};

const opWordToHex = (word: string): string => {
  const hex = opWordCodes.find((owc) => owc.word === word)?.hex;
  return hex || "";
};

// supports all opcodes
const currentScope = (stackDataList: StackDataList): boolean => stackDataList.flow[stackDataList.flow.length - 1];

const invertBits = (n: number) => {
  // Calculate number of bits of N-1;
  let x = Math.log(n) / Math.log(2);

  let m = 1 << x;

  m = m | (m - 1);

  n = n ^ m;

  return n;
};

// supports OP_IF, OP_IFNOT
// const addScope = (stackDataList: StackDataList, expression: boolean): StackDataList => ({ ...stackDataList, flow: [...stackDataList.flow, expression] });

// supports OP_ELSE
// const revertCurrentScope = (stackDataList: StackDataList): StackDataList => {
//   const newFlow = [...stackDataList.flow];
//   newFlow.pop();
//   return { ...stackDataList, flow: [...newFlow, !currentScope(stackDataList)] };
// };

// supports OP_ENDIF
// const removeScope = (stackDataList: StackDataList): StackDataList => ({ ...stackDataList, flow: stackDataList.flow.splice(0, stackDataList.flow.length - 1) });

export { hexLittleEndian, invertBits, opcodeToWord, opcodeToData, opWordToCode, opWordToHex, currentScope /* addScope, revertCurrentScope, removeScope */ };
