import { MAX_INTEGER } from "./const";
import { binToBytes } from "./bin";
import { bytesToBin, bytesToHex, bytesToNumber } from "./bytes";
import { hexToBytes } from "./hex";
import { numberToBytes } from "./number";
import { stringToBytes } from "./string";

export class WizData {
  input: string | number;
  // output: string | number;

  bytes: Uint8Array;
  bin: string;
  hex: string;

  number?: number;
  text?: string;

  private constructor(hex?: string, bin?: string, number?: number, text?: string) {
    let inputVal: string | number = "";
    let outputVal: string | number = "";

    let bytesVal: Uint8Array = new Uint8Array([]);
    let binVal: string = "";
    let hexVal: string = "";

    let numberVal: number | undefined = undefined;
    let textVal: string | undefined = undefined;

    // const emptyBytePrefix: string = "0x";

    // fromHex
    if (hex !== undefined) {
      inputVal = hex;
      bytesVal = hexToBytes(hex);
      binVal = bytesToBin(bytesVal);
      hexVal = hex;
      numberVal = bytesToNumber(bytesVal);
      // textVal = bytesToString(bytesVal); // TODO get from stack cache
    }

    // fromBin
    else if (bin !== undefined) {
      inputVal = bin;
      bytesVal = binToBytes(bin);
      binVal = bin;
      hexVal = bytesToHex(bytesVal);
      numberVal = bytesToNumber(bytesVal);
      // textVal = bytesToString(bytesVal); // TODO get from stack cache
    }

    // fromNumber
    else if (number !== undefined) {
      inputVal = number;
      bytesVal = numberToBytes(number);
      binVal = bytesToBin(bytesVal);
      hexVal = bytesToHex(bytesVal);
      numberVal = number;
      // textVal = bytesToString(bytesVal); // TODO get from stack cache
    }

    // fromText
    else if (text !== undefined) {
      inputVal = text;
      bytesVal = stringToBytes(text);
      binVal = bytesToBin(bytesVal);
      hexVal = bytesToHex(bytesVal);
      numberVal = bytesToNumber(bytesVal);
      textVal = text; // TODO set to stack cache
    }

    // set props
    this.input = inputVal;
    this.bytes = bytesVal;
    this.bin = binVal;
    this.hex = hexVal;
    if (numberVal !== undefined && -MAX_INTEGER <= numberVal && numberVal <= MAX_INTEGER) this.number = numberVal;
    this.text = textVal;

    /* if (this.text !== undefined) outputVal = this.text;
    else if (this.number !== undefined) outputVal = this.number;
    else outputVal = emptyBytePrefix + this.hex;
    this.output = outputVal; */
  }

  public static fromHex(hex: string): WizData {
    return new WizData(hex, undefined, undefined, undefined);
  }

  public static fromBin(bin: string): WizData {
    return new WizData(undefined, bin, undefined, undefined);
  }

  public static fromNumber(number: number): WizData {
    return new WizData(undefined, undefined, number, undefined);
  }

  public static fromText(text: string): WizData {
    return new WizData(undefined, undefined, undefined, text);
  }
}
