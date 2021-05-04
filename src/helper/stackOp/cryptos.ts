import IStackData from "../../model/IStackData";
import { HASH160, HASH256, RIPEMD160, SHA1, SHA256, ECDSAVerify } from "../crypto";
import stackNumber from "../stackNumber";

const OP_RIPEMD160 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + RIPEMD160(stackData.byteValue);
  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_SHA1 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + SHA1(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_SHA256 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + SHA256(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_HASH160 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + HASH160(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_HASH256 = (stackData: IStackData): IStackData[] => {
  const hashedData = "0x" + HASH256(stackData.byteValue);

  return [{ byteValue: hashedData, byteValueDisplay: hashedData, input: hashedData }];
};

const OP_CHECKSIGFROMSTACK = (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData): IStackData[] => {
  // stackData1 = signature
  // stackData 2 = message
  // stackData 3 = pubkey
  const isVerifySuccess: boolean = ECDSAVerify(stackData1.byteValue, stackData2.byteValue, stackData3.byteValue);

  if (isVerifySuccess) return [stackNumber("1")];

  return [stackNumber("0")];
};

export { OP_RIPEMD160, OP_SHA1, OP_SHA256, OP_HASH160, OP_HASH256, OP_CHECKSIGFROMSTACK };
