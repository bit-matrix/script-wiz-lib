import { MAX_INTEGER } from "../constant";

const stackNumberTestData = [
  /* { inputNumber: -2147483650, numberValue: false, byteLength: 5, hexValue: "0x0200008080" },
  { inputNumber: -2147483649, numberValue: false, byteLength: 5, hexValue: "0x0100008080" },
  { inputNumber: -2147483648, numberValue: false, byteLength: 5, hexValue: "0x0000008080" },
  // MIN_INTEGER
  { inputNumber: -2147483647, numberValue: true, byteLength: 4, hexValue: "0xffffffff" },
  { inputNumber: -2147483646, numberValue: true, byteLength: 4, hexValue: "0xfeffffff" },

  { inputNumber: -8388609, numberValue: true, byteLength: 4, hexValue: "0x01008080" },
  { inputNumber: -8388608, numberValue: true, byteLength: 4, hexValue: "0x00008080" },
  { inputNumber: -8388607, numberValue: true, byteLength: 3, hexValue: "0xffffff" },
  { inputNumber: -8388606, numberValue: true, byteLength: 3, hexValue: "0xfeffff" },

  { inputNumber: -32769, numberValue: true, byteLength: 3, hexValue: "0x018080" },
  { inputNumber: -32768, numberValue: true, byteLength: 3, hexValue: "0x008080" },
  { inputNumber: -32767, numberValue: true, byteLength: 2, hexValue: "0xffff" },
  { inputNumber: -32766, numberValue: true, byteLength: 2, hexValue: "0xfeff" },
  { inputNumber: -32765, numberValue: true, byteLength: 2, hexValue: "0xfdff" },

  { inputNumber: -257, numberValue: true, byteLength: 2, hexValue: "0x0181" },
  { inputNumber: -256, numberValue: true, byteLength: 2, hexValue: "0x0081" },
  { inputNumber: -255, numberValue: true, byteLength: 2, hexValue: "0xff80" },
  { inputNumber: -254, numberValue: true, byteLength: 2, hexValue: "0xfe80" },

  { inputNumber: -129, numberValue: true, byteLength: 2, hexValue: "0x8180" },
  { inputNumber: -128, numberValue: true, byteLength: 2, hexValue: "0x8080" },
   
  { inputNumber: -127, numberValue: true, byteLength: 1, hexValue: "0xff" },
  
  { inputNumber: -126, numberValue: true, byteLength: 1, hexValue: "0xfe" },
  
  { inputNumber: -2, numberValue: true, byteLength: 1, hexValue: "0x82" },
  { inputNumber: -1, numberValue: true, byteLength: 1, hexValue: "0x81" },
  */

  { inputNumber: 0, numberValue: true, byteLength: 0, hexValue: "0x" },

  { inputNumber: 1, numberValue: true, byteLength: 1, hexValue: "0x01" },
  { inputNumber: 2, numberValue: true, byteLength: 1, hexValue: "0x02" },

  { inputNumber: 126, numberValue: true, byteLength: 1, hexValue: "0x7e" },
  { inputNumber: 127, numberValue: true, byteLength: 1, hexValue: "0x7f" },
  { inputNumber: 128, numberValue: true, byteLength: 2, hexValue: "0x8000" },
  { inputNumber: 129, numberValue: true, byteLength: 2, hexValue: "0x8100" },

  { inputNumber: 255, numberValue: true, byteLength: 2, hexValue: "0xff00" },
  { inputNumber: 256, numberValue: true, byteLength: 2, hexValue: "0x0001" },
  { inputNumber: 257, numberValue: true, byteLength: 2, hexValue: "0x0101" },
  { inputNumber: 258, numberValue: true, byteLength: 2, hexValue: "0x0201" },

  { inputNumber: 32766, numberValue: true, byteLength: 2, hexValue: "0xfe7f" },
  { inputNumber: 32767, numberValue: true, byteLength: 2, hexValue: "0xff7f" },
  { inputNumber: 32768, numberValue: true, byteLength: 3, hexValue: "0x008000" },
  { inputNumber: 32769, numberValue: true, byteLength: 3, hexValue: "0x018000" },

  { inputNumber: 8388606, numberValue: true, byteLength: 3, hexValue: "0xfeff7f" },
  { inputNumber: 8388607, numberValue: true, byteLength: 3, hexValue: "0xffff7f" },

  { inputNumber: 8388607, numberValue: true, byteLength: 3, hexValue: "0xffff7f" },
  { inputNumber: 8388608, numberValue: true, byteLength: 4, hexValue: "0x00008000" },
  { inputNumber: 8388609, numberValue: true, byteLength: 4, hexValue: "0x01008000" },

  { inputNumber: 2147483646, numberValue: true, byteLength: 4, hexValue: "0xfeffff7f" },
  { inputNumber: 2147483647, numberValue: true, byteLength: 4, hexValue: "0xffffff7f" },

  // MAX_INTEGER
  /* { inputNumber: 2147483648, numberValue: false, byteLength: 5, hexValue: "0x0000008000" },
  { inputNumber: 2147483649, numberValue: false, byteLength: 5, hexValue: "0x0100008000" },
  { inputNumber: 2147483650, numberValue: false, byteLength: 5, hexValue: "0x0200008000" }, */
];

export default stackNumberTestData;

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
