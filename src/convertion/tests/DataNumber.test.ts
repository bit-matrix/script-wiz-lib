import { MAX_INTEGER } from "../../constant";
import numberTestData from "./numberTestData";
import Data from "../Data";

test("Data class: number to data object test", () => {
  numberTestData.forEach((d) => {
    const data: Data = Data.fromNumber(d.inputNumber);

    expect(data.bytes.length).toBe(d.byteLength);
    expect(data.hex).toBe(d.hexValue.substring(2));

    if (-MAX_INTEGER <= d.inputNumber && d.inputNumber <= MAX_INTEGER) {
      expect(d.numberValue).toBe(true);
      expect(data.number).toBe(d.inputNumber);
    } else {
      expect(d.numberValue).toBe(false);
      expect(data.number).toBe(undefined);
    }

    expect(data.text).toBe(undefined);
  });
});

test("Data class: hex to data object test", () => {
  numberTestData.forEach((d) => {
    const data: Data = Data.fromHex(d.hexValue.substring(2));

    expect(data.bytes.length).toBe(d.byteLength);
    expect(data.hex).toBe(d.hexValue.substring(2));

    if (-MAX_INTEGER <= d.inputNumber && d.inputNumber <= MAX_INTEGER) {
      expect(d.numberValue).toBe(true);
      expect(data.number).toBe(d.inputNumber);
    } else {
      expect(d.numberValue).toBe(false);
      expect(data.number).toBe(undefined);
    }

    expect(data.text).toBe(undefined);
  });
});
