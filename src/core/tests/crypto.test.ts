// import { numberTestData } from "./data/number";
import WizData from "../../convertion";
import { ecdsaVerify, hash160, hash256, ripemd160, sha1, sha256 } from "../crypto";

// test("Crypto ripemd160 test", () => {
//   const wizData: WizData = WizData.fromHex("ffffffff");

//   const signature = ripemd160(wizData);

//   expect(signature.sigBytes).toBe(20);
//   expect(signature.toString().length).toBe(40);
//   expect(signature.toString()).toBe("1d93841f0d404ce436f63143a0f09a7a9cbf9afd");
// });

// test("Crypto sha1 test", () => {
//   const wizData: WizData = WizData.fromHex("ffffffff");

//   const signature = sha1(wizData);

//   expect(signature.sigBytes).toBe(20);
//   expect(signature.toString().length).toBe(40);
//   expect(signature.toString()).toBe("f44fe052b6bae5efcb693c23071b0f6d3a4e1955");
// });

// test("Crypto sha256 test", () => {
//   const wizData: WizData = WizData.fromHex("ffffffff");

//   const signature = sha256(wizData);

//   expect(signature.sigBytes).toBe(32);
//   expect(signature.toString().length).toBe(64);
//   expect(signature.toString()).toBe("a44ba123189855990795e3260a64b34cdae6b29bf1c941818a34cba8bbc45575");
// });

// test("Crypto hash160 test", () => {
//   const wizData: WizData = WizData.fromHex("ffffffff");

//   const signature = hash160(wizData);

//   expect(signature.sigBytes).toBe(20);
//   expect(signature.toString().length).toBe(40);
//   expect(signature.toString()).toBe("929a0fdb637870bca1f72651eba9736eed59848b");
// });

// test("Crypto hash256 test", () => {
//   const wizData: WizData = WizData.fromHex("ffffffff");

//   const signature = hash256(wizData);

//   expect(signature.sigBytes).toBe(32);
//   expect(signature.toString().length).toBe(64);
//   expect(signature.toString()).toBe("02358e9106e9c481380f7060385afec5208603a2038a0443d5826fd144d88809");
// });

test("Crypto ecdsaVerify test", () => {
  const signatureData: WizData = WizData.fromHex(
    "3044022002748547ba97e986d26b48dc2093c21f04334aea4694470328d605c15971a8f302207501b30f114d1c27e5d8fa903635d9485dca60c705dbdf2a12daf795239d5e5e"
  );
  const messageData: WizData = WizData.fromHex("68656c6c6ff09f8c8e");
  const publicKeyData: WizData = WizData.fromHex("02211862a1f993b4578d595c3e00b0935cd9ccc29a869cab7a680e36efc2e7b548");

  const signature = ecdsaVerify(signatureData, messageData, publicKeyData);

  expect(signature.number).toBe(1);
});
