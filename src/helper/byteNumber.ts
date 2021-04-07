const signIntegerMin = 127;
const signIntegerMax = 256;

const getNumberByteLength = (x: number): number => {
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

  const byteLength = getNumberByteLength(number);

  let numberInput = number;
  if (number < 0 && byteLength !== 0)
    numberInput = Math.pow(2, 8 * byteLength - 1) - number;

  let numberHexString = numberInput.toString(16);

  if (numberHexString.length % 2 === 1) {
    numberHexString = "0" + numberHexString;
  }

  if (numberHexString.length / 2 < byteLength || byteLength === 0)
    numberHexString = "00" + numberHexString;

  return numberHexString;
};

/*
<'Test'>
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
*/

export { getNumberByteLength, hexNumber };
