import { tagHash } from ".";

test("taghash test", () => {
  let byteArrayData = new Uint8Array(1);
  byteArrayData[0] = 10;

  const tag = "TapLeaf";

  const result = tagHash(tag, byteArrayData);

  expect(result).toBe("51ea46053abf55dbe44701ee1738b6ed35c8a0d3c4496142710ff45ac7c8cb16");
});
