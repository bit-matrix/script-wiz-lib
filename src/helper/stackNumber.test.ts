import { hexLittleEndian } from "./index";
import { StackData } from "../model";
import { MAX_INTEGER } from "../convertion/const";
import stackNumberTestData from "./stackNumberTestData";
import stackNumber, { log, getNumberByteLength, getNumberByteLengthEx, hexNumber, hexToByteArray } from "./stackNumber";
import { resizeUint8Array } from "../bytes";

test("log(2,8) to equal 3", () => {
  expect(log(2, 8)).toBe(3);
});

test("stackNumberTestData is valid", () => {
  stackNumberTestData.forEach((d) => {
    if (-MAX_INTEGER <= d.inputNumber && d.inputNumber <= MAX_INTEGER) expect(d.numberValue).toBe(true);
    else expect(d.numberValue).toBe(false);

    expect(d.hexValue.length % 2).toBe(0);

    const hexToByteLength = d.hexValue.length / 2 - 1;
    expect(hexToByteLength).toBe(d.byteLength);
  });
});

test("getNumberByteLength to equal getNumberByteLengthEx for integer range", () => {
  stackNumberTestData.forEach((d) => {
    if (-MAX_INTEGER <= d.inputNumber && d.inputNumber <= MAX_INTEGER) {
      const l1 = getNumberByteLength(d.inputNumber);
      const l2 = getNumberByteLengthEx(d.inputNumber);
      if (l1 !== l2) console.log(d.inputNumber, l1, l2);

      expect(l1).toBe(l2);
    }
  });
});

test("getNumberByteLength to equal byteLength", () => {
  stackNumberTestData.forEach((d) => {
    const byteLength = getNumberByteLength(d.inputNumber);
    if (byteLength !== d.byteLength) console.log(d.inputNumber, byteLength, d.byteLength);

    expect(byteLength).toBe(d.byteLength);
  });
});

test("hexNumber test", () => {
  stackNumberTestData.forEach((d) => {
    const hexNumberValue = hexNumber(d.inputNumber);
    const leHexNumberValue = hexLittleEndian(hexNumberValue);
    if (d.numberValue) {
      if (leHexNumberValue !== d.hexValue) console.log(d.inputNumber, leHexNumberValue, d.hexValue);
      expect(leHexNumberValue).toBe(d.hexValue);
    }
  });
});

test("hexToByteArray test", () => {
  /* console.log("0x01", hexToByteArray("0x01"));
  console.log("0x80", hexToByteArray("0x80"));
  console.log("0xff", hexToByteArray("0xff"));
  console.log("0x0180", hexToByteArray("0x0180")); */

  stackNumberTestData.forEach((d) => {
    const byteArray: Uint8Array = hexToByteArray(d.hexValue);
    const resizedByteArray = resizeUint8Array(byteArray, 4);
    // console.log(d.inputNumber, byteArray, resizedByteArray);

    const dataView = new DataView(resizedByteArray.buffer, 0);
    const byteArrayToNumberValue = dataView.getInt32(0, true);

    // console.log(d.inputNumber, byteArray, resizedByteArray, byteArrayToNumberValue);
    // if (d.inputNumber !== byteArrayToNumberValue) console.error(d.inputNumber, byteArrayToNumberValue, byteArray);
    expect(d.inputNumber).toBe(byteArrayToNumberValue);
  });
});
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

// input      =>  hexNumber     =>  le           =>  display        =>  byteValueDisplay  => byteValue    => numberValue
// 1          =>  0x01          =>  0x01         =>  1              =>  1                 => 0x01         => 1
// 127        =>  0x7f          =>  0x7f         =>  127            =>  127               => 0x7f         => 127
// 128        =>  0x80          =>  0x80         =>  128            =>  128               => 0x8000       => 128
// 255        =>  0xff          =>  0xff00       =>  255            =>  255               => 0xff00       => 255
// 256        =>  0x0100        =>  0x0001       =>  256            =>  256               => 0x0001       => 256
// 2147483647 =>  0x7fffffff    =>  0xffffff7f   =>  2147483647     =>  2147483647        => 0xffffff7f   => 2147483647
// 2147483648 =>  0x80000000    =>  0x00000080   =>  0x00000008000  =>  0x0000008000      => 0x0000008000 => undefined

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
