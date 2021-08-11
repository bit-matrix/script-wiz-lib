import { tagHash, treeHelper } from ".";

test("taghash test", () => {
  let byteArrayData = new Uint8Array(1);
  byteArrayData[0] = 10;

  const tag = "TapLeaf";

  const result = tagHash(tag, byteArrayData);

  expect(result).toBe("51ea46053abf55dbe44701ee1738b6ed35c8a0d3c4496142710ff45ac7c8cb16");
});

test("tree helper test", () => {
  const data = "55935787";
  const result = treeHelper(data);

  expect(result.data).toBe("c00455935787");
  expect(result.h).toBe("0f20d41260bd81c46f4ee8a388b0f139d107f707e38fb2525f191b83a49c5013");
});
