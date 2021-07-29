import { MAX_INTEGER } from "../const";
import { numberTestData } from "./data/number";
import WizData from "../index";

test("WizData class: number to wizData object test", () => {
  numberTestData.forEach((d) => {
    const wizData: WizData = WizData.fromNumber(d.inputNumber);

    expect(wizData.input).toBe(d.inputNumber);

    expect(wizData.bytes.length).toBe(d.byteLength);
    expect(wizData.bin.length / 8).toBe(d.byteLength);
    expect(wizData.hex.length / 2).toBe(d.byteLength);

    expect(wizData.bin).toBe(d.binValue.substring(2));
    expect(wizData.hex).toBe(d.hexValue.substring(2));

    if (-MAX_INTEGER <= d.inputNumber && d.inputNumber <= MAX_INTEGER) {
      expect(d.numberValue).toBe(true);
      expect(wizData.number).toBe(d.inputNumber);
      // expect(wizData.output).toBe(d.inputNumber);
    } else {
      expect(d.numberValue).toBe(false);
      expect(wizData.number).toBe(undefined);
      // expect(wizData.output).toBe(d.hexValue.substring(2));
    }

    expect(wizData.text).toBe(undefined);
  });
});

test("WizData class: hex to wizData object test", () => {
  numberTestData.forEach((d) => {
    const wizData: WizData = WizData.fromHex(d.hexValue.substring(2));

    expect(wizData.input).toBe(d.hexValue.substring(2));

    expect(wizData.bytes.length).toBe(d.byteLength);
    expect(wizData.bin.length / 8).toBe(d.byteLength);
    expect(wizData.hex.length / 2).toBe(d.byteLength);

    expect(wizData.bin).toBe(d.binValue.substring(2));
    expect(wizData.hex).toBe(d.hexValue.substring(2));

    if (-MAX_INTEGER <= d.inputNumber && d.inputNumber <= MAX_INTEGER) {
      expect(d.numberValue).toBe(true);
      expect(wizData.number).toBe(d.inputNumber);
      // expect(wizData.output).toBe(d.inputNumber);
    } else {
      expect(d.numberValue).toBe(false);
      expect(wizData.number).toBe(undefined);
      // expect(wizData.output).toBe(d.hexValue.substring(2));
    }

    expect(wizData.text).toBe(undefined);
  });
});
