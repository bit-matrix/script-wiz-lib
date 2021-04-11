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

export { hexLittleEndian };
