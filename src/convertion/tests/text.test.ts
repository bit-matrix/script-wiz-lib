import { textTestData } from "./data/text";
import { WizData } from "../WizData";

test("WizData class: hex to wizData object test", () => {
  textTestData.forEach((d) => {
    const wizData: WizData = WizData.fromHex(d.hexValue.substring(2));

    expect(wizData.input).toBe(d.hexValue.substring(2));

    expect(wizData.bytes.length).toBe(d.byteLength);
    expect(wizData.bin.length / 8).toBe(d.byteLength);
    expect(wizData.hex.length / 2).toBe(d.byteLength);

    expect(wizData.bin).toBe(d.binValue.substring(2));
    expect(wizData.hex).toBe(d.hexValue.substring(2));
    expect(wizData.number).toBe(d.numberValue);
    // expect(data.text).toBe(d.inputText); // TODO get from stack cache

    // if (d.numberValue !== undefined) expect(wizData.output).toBe(d.numberValue);
    // else expect(wizData.output).toBe(d.hexValue.substring(2));
  });
});

test("WizData class: text to wizData object test", () => {
  textTestData.forEach((d) => {
    const wizData: WizData = WizData.fromText(d.inputText);

    expect(wizData.input).toBe(d.inputText);

    expect(wizData.bytes.length).toBe(d.byteLength);
    expect(wizData.bin.length / 8).toBe(d.byteLength);
    expect(wizData.hex.length / 2).toBe(d.byteLength);

    expect(wizData.bin).toBe(d.binValue.substring(2));
    expect(wizData.hex).toBe(d.hexValue.substring(2));
    expect(wizData.number).toBe(d.numberValue);
    expect(wizData.text).toBe(d.inputText);

    // expect(wizData.output).toBe(d.inputText);
  });
});
