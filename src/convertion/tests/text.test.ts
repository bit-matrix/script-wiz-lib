import textData from "./textData";
import Data from "../Data";

test("Data class: hex to data object test", () => {
  textData.forEach((d) => {
    const data: Data = Data.fromHex(d.hexValue.substring(2));

    expect(data.bytes.length).toBe(d.byteLength);
    expect(data.hex).toBe(d.hexValue.substring(2));
    expect(data.number).toBe(d.numberValue);
    // expect(data.text).toBe(d.inputText); // TODO get from stack cache
  });
});

test("Data class: text to data object test", () => {
  textData.forEach((d) => {
    const data: Data = Data.fromText(d.inputText);

    expect(data.bytes.length).toBe(d.byteLength);
    expect(data.hex).toBe(d.hexValue.substring(2));
    expect(data.number).toBe(d.numberValue);
    expect(data.text).toBe(d.inputText);
  });
});
