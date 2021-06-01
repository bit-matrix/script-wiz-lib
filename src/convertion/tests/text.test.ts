import textData from "./data/text";
import Data from "../model/Data";

test("Data class: hex to data object test", () => {
  textData.forEach((d) => {
    const data: Data = Data.fromHex(d.hexValue.substring(2));

    expect(data.input).toBe(d.hexValue.substring(2));

    expect(data.bytes.length).toBe(d.byteLength);
    expect(data.bin.length / 8).toBe(d.byteLength);
    expect(data.hex.length / 2).toBe(d.byteLength);

    expect(data.bin).toBe(d.binValue.substring(2));
    expect(data.hex).toBe(d.hexValue.substring(2));
    expect(data.number).toBe(d.numberValue);
    // expect(data.text).toBe(d.inputText); // TODO get from stack cache

    if (d.numberValue !== undefined) expect(data.output).toBe(d.numberValue);
    else expect(data.output).toBe(d.hexValue.substring(2));
  });
});

test("Data class: text to data object test", () => {
  textData.forEach((d) => {
    const data: Data = Data.fromText(d.inputText);

    expect(data.input).toBe(d.inputText);

    expect(data.bytes.length).toBe(d.byteLength);
    expect(data.bin.length / 8).toBe(d.byteLength);
    expect(data.hex.length / 2).toBe(d.byteLength);

    expect(data.bin).toBe(d.binValue.substring(2));
    expect(data.hex).toBe(d.hexValue.substring(2));
    expect(data.number).toBe(d.numberValue);
    expect(data.text).toBe(d.inputText);

    expect(data.output).toBe(d.inputText);
  });
});
