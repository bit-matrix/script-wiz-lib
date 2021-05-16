import { hexLittleEndian } from "./index";
import { StackData } from "../model";
import { MAX_INTEGER } from "../constant";

const log = (base: number, x: number) => Math.log(x) / Math.log(base);

const getNumberByteLength = (x: number) => {
  if (x === 0) return 0;
  else if (0 < x) return Math.ceil((log(2, x + 1) + 1) / 8);
  else if (x < 0) return Math.floor((log(2, -x) + 1) / 8 + 1);
  return 0;
};

const getNumberByteLengthEx = (x: number): number => {
  /*
    Byte length for number x;
    
    -2147483648 < x < 2147483648;
    n byte
    -1*2^(8n-1) < x <= -1*2^(8(n-1)-1) || 2^(8(n-1)-1) <= x < 2^(8n-1)

    1 byte:
    n = 1;
    -1*2^(8-1) < x <= -1*2^(0-1) || 2(0-1) <= x < 2^(8-1)
    -1*2^7 < x <= -1*2^(-1) || 2^(-1) <= x < 2'7
    -1*128 < x <= -1*(1/2) || 1/2 <= x < 128
    -128 < x <= -1/2 || 1/2 <= x < 128

    2 byte:
    n = 2;
    -1*2^(16-1) < x <= -1*2^(8-1) || 2^(8-1) <= x < 2^(16-1)
    -1*2^15 < x <= -1*2^7 || 2^7 <= x < 2^15
    -1*32768 < x <= -1*128 || 128 <= x < 32768
    -32768 < x <= -128 || 128 <= x < 32768

    3 byte:
    n = 3;
    -1*2^(24-1) < x <= -1*2^(16-1) || 2^(16-1) <= x < 2^(24-1)
    -1*2^23 < x <= -1*2^15 || 2^15 <= x < 2^23
    -1*8388608 < x <= -1*32768 || 32768 <= x < 8388608
    -8388608 < x <= -32768 || 32768 <= x < 8388608

    4 byte:
    n = 4;
    -1*2^(32-1) < x <= -1*2^(24-1) || 2^(24-1) <= x < 2^(32-1)
    -1*2^31 < x <= -1*2^23 || 2^23 <= x < 2^31
    -1*2147483648 < x <= -1*8388608 || 8388608 <= x < 2147483648
    -2147483648 < x <= -8388608 || 8388608 <= x < 2147483648
*/
  let byteLength = 0;
  if (x === 0) return byteLength;
  const px = Math.abs(x);
  for (let n = 1; n < 5; n++) {
    const a = Math.pow(2, 8 * (n - 1) - 1);
    const b = Math.pow(2, 8 * n - 1);
    if ((-1 * b < x && x <= -1 * a) || (a <= x && x < b)) {
      byteLength = n;
      break;
    }
  }
  return byteLength;
};

const hexNumber = (number: number): string => {
  if (number === 0) return "";

  const byteLength = getNumberByteLength(number); // 0,1,2,3,4,...

  let numberInput = number;
  if (number < 0) numberInput = Math.pow(2, 8 * byteLength - 1) - number;

  let numberHexString = numberInput.toString(16);

  if (numberHexString.length % 2 === 1) {
    numberHexString = "0" + numberHexString;
  }

  if (numberHexString.length / 2 < byteLength || byteLength === 0) numberHexString = "00" + numberHexString;

  return numberHexString;
};

const stackNumber = (input: string): StackData => {
  // input      =>  hexNumber     =>  le           =>  display        =>  byteValueDisplay  => byteValue    => numberValue
  // 1          =>  0x01          =>  0x01         =>  1              =>  1                 => 0x01         => 1
  // 127        =>  0x7f          =>  0x7f         =>  127            =>  127               => 0x7f         => 127
  // 128        =>  0x80          =>  0x80         =>  128            =>  128               => 0x8000       => 128
  // 255        =>  0xff          =>  0xff00       =>  255            =>  255               => 0xff00       => 255
  // 256        =>  0x0100        =>  0x0001       =>  256            =>  256               => 0x0001       => 256
  // 2147483647 =>  0x7fffffff    =>  0xffffff7f   =>  2147483647     =>  2147483647        => 0xffffff7f   => 2147483647
  // 2147483648 =>  0x80000000    =>  0x00000080   =>  0x00000008000  =>  0x0000008000      => 0x0000008000 => undefined

  const inputNumber = Number(input);
  const inputHexNumber = hexNumber(inputNumber);
  const littleEndianNumber = hexLittleEndian(inputHexNumber);

  let numberValue: number | undefined = undefined;
  let byteValueDisplay = littleEndianNumber;

  if (-MAX_INTEGER <= inputNumber && inputNumber <= MAX_INTEGER) {
    numberValue = inputNumber;
    byteValueDisplay = input;
  }

  return {
    input,
    numberValue,
    byteValueDisplay,
    byteValue: littleEndianNumber,
  };
};

const hexToByteArray = (hexString: string): Uint8Array => {
  const byteArray: number[] = [];
  const hexByteArray = hexString.match(/.{1,2}/g)?.map((b) => b.toString());
  if (hexByteArray === undefined) throw "hexToByteArray: Invalid hex string";

  for (let i = 1; i < hexByteArray.length; i++) {
    const byte = parseInt(hexByteArray[i], 16);
    byteArray.push(byte);
  }

  return new Uint8Array(byteArray);
};

/*
<'Test'>
<-1234567890123456789012345678901234567890>
<-12345678901234567890>
<-123456789012345>
<-12345678901234>
<-1234567890123>
<-123456789012>

<-2147483648>
<-2147483647>
<-2147483646>

<-8388609>
<-8388608>
<-8388607>
<-8388606>

<-32769>
<-32768>
<-32767>
<-32766>

<-256>
<-255>

<-129>
<-128>
<-127>
<-126>

<-2>
<-1>
<0>
<1>
<2>

<126>
<127>
<128>
<129>

<255>
<256>

<32766>
<32767>
<32768>
<32769>

<8388606>
<8388607>
<8388608>
<8388609>

<2147483647>
<2147483648>
<2147483649>

<123456789012>
<1234567890123>
<12345678901234>
<123456789012345>
<12345678901234567890>
<1234567890123456789012345678901234567890>

*/

export { log, getNumberByteLength, getNumberByteLengthEx, hexNumber, hexToByteArray };
export default stackNumber;
