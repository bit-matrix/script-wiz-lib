import WizData from "@script-wiz/wiz-data";
import { TxInput, TxOutput } from "../model/TxData";
import * as crypto from "../core/crypto";

export const inspectInputOutPoint = (wizData: WizData, txInputs: TxInput[]): WizData[] => {
  let currentTxInputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxInputIndex = 0;
  }
  const txInputLength = txInputs.length;

  if (currentTxInputIndex === undefined) throw "Invalid transaction input index!";

  if (currentTxInputIndex < 0) throw "Invalid transaction input index must at least zero!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  if (txInputLength < currentTxInputIndex + 1) throw "Input index must less than transaction inputs length!";

  const currentInputPreviousTxId = txInputs[currentTxInputIndex].previousTxId;
  const currentInputVout = txInputs[currentTxInputIndex].vout;

  if (!currentInputPreviousTxId) throw "Previous Tx Id not found! Check your transaction template.";

  if (!currentInputVout) throw "Vout not found! Check your transaction template.";

  const inputPreviousTxIdLE = Buffer.from(currentInputPreviousTxId, "hex").reverse().toString("hex");

  return [WizData.fromHex(inputPreviousTxIdLE), WizData.fromHex(currentInputVout), WizData.fromHex("00")];
};

export const inspectInputAsset = (wizData: WizData, txInputs: TxInput[]): WizData[] => {
  let currentTxInputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxInputIndex = 0;
  }
  const txInputLength = txInputs.length;

  if (currentTxInputIndex === undefined) throw "Invalid transaction input index!";

  if (currentTxInputIndex < 0) throw "Invalid transaction input index must at least zero!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  //   const txInputIndex = currentTxInputIndex - 1;

  if (txInputLength < currentTxInputIndex + 1) throw "Input index must less than transaction inputs length!";

  const currentInputAssetId = txInputs[currentTxInputIndex].assetId;

  if (!currentInputAssetId) throw "Asset id not found! Check your transaction template.";

  const inputAssetIdLE = Buffer.from(currentInputAssetId, "hex").reverse().toString("hex");

  return [WizData.fromHex(inputAssetIdLE), WizData.fromNumber(1)];
};

export const inspectInputValue = (wizData: WizData, txInputs: TxInput[]): WizData[] => {
  let currentTxInputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxInputIndex = 0;
  }
  const txInputLength = txInputs.length;

  if (currentTxInputIndex === undefined) throw "Invalid transaction input index!";

  if (currentTxInputIndex < 0) throw "Invalid transaction input index must at least zero!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  if (txInputLength < currentTxInputIndex + 1) throw "Input index must less than transaction inputs length!";

  const currentInputAmount = txInputs[currentTxInputIndex].amount;

  if (!currentInputAmount) throw "Amount not found! Check your transaction template.";

  return [WizData.fromHex(currentInputAmount), WizData.fromNumber(1)];
};

export const inspectInputScriptPubKey = (wizData: WizData, txInputs: TxInput[]): WizData[] => {
  let currentTxInputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxInputIndex = 0;
  }
  const txInputLength = txInputs.length;

  if (currentTxInputIndex === undefined) throw "Invalid transaction input index!";

  if (currentTxInputIndex < 0) throw "Invalid transaction input index must at least zero!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  if (txInputLength < currentTxInputIndex + 1) throw "Input index must less than transaction inputs length!";

  if (!txInputs[currentTxInputIndex].scriptPubKey) {
    const emptyScriptPupKeyHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    return [WizData.fromHex(emptyScriptPupKeyHash), WizData.fromNumber(-1)];
  } else {
    const currentScriptPubKey = txInputs[currentTxInputIndex].scriptPubKey;

    const witnessVersion = currentScriptPubKey.substr(0, 2);
    const witnessProgram = currentScriptPubKey.substring(4);
    const witnessProgramLength = WizData.fromHex(witnessProgram).bytes.length;

    let result: WizData[] = [];
    // Segwit (v0): first byte = 0, witnessProgram length 32 or 20 byte
    if (witnessVersion === "00" && (witnessProgramLength === 20 || witnessProgramLength === 32)) {
      result = [WizData.fromHex(witnessProgram), WizData.fromNumber(0)];
      // Taproot (v1):first byte = 51, witnessProgram length 32 byte
    } else if (witnessVersion === "51" && witnessProgramLength === 32) {
      result = [WizData.fromHex(witnessProgram), WizData.fromNumber(1)];
    } else {
      // Legacy: none segwit and none taproot
      const pubKeySha256 = crypto.sha256(WizData.fromHex(currentScriptPubKey)).toString();
      result = [WizData.fromHex(pubKeySha256), WizData.fromNumber(-1)];
    }
    return result;
  }
};

export const inspectInputIssuance = (wizData: WizData, txInputs: TxInput[]): WizData => {
  let currentTxInputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxInputIndex = 0;
  }
  const txInputLength = txInputs.length;

  if (currentTxInputIndex === undefined) throw "Invalid transaction input index!";

  if (currentTxInputIndex < 0) throw "Invalid transaction input index must at least zero!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  if (txInputLength < currentTxInputIndex + 1) throw "Input index must less than transaction inputs length!";

  return WizData.fromNumber(0);
};

export const inspectInputSequence = (wizData: WizData, txInputs: TxInput[]): WizData => {
  let currentTxInputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxInputIndex = 0;
  }
  const txInputLength = txInputs.length;

  if (currentTxInputIndex === undefined) throw "Invalid transaction input index!";

  if (currentTxInputIndex < 0) throw "Invalid transaction input index must at least zero!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  if (txInputLength < currentTxInputIndex + 1) throw "Input index must less than transaction inputs length!";

  const currentInputSequence = txInputs[currentTxInputIndex].sequence;

  if (!currentInputSequence) throw "Sequence not found! Check your transaction template.";

  return WizData.fromHex(currentInputSequence);
};

export const inspectOutputAsset = (wizData: WizData, txOutputs: TxOutput[]): WizData[] => {
  let currentTxOutputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxOutputIndex = 0;
  }
  const txOutputLength = txOutputs.length;

  if (currentTxOutputIndex === undefined) throw "Invalid transaction output index!";

  if (currentTxOutputIndex < 0) throw "Invalid transaction output index must at least zero!";

  if (txOutputLength === 0) throw "Transaction output template must include at least an element.";

  if (txOutputLength < currentTxOutputIndex + 1) throw "Output index must less than transaction outputs length!";

  const currentOutputAssetId = txOutputs[currentTxOutputIndex].assetId;

  if (!currentOutputAssetId) throw "Output Asset id not found! Check your transaction template.";

  const outputAssetIdLE = Buffer.from(currentOutputAssetId, "hex").reverse().toString("hex");

  return [WizData.fromHex(outputAssetIdLE), WizData.fromNumber(1)];
};

export const inspectOutputValue = (wizData: WizData, txOutputs: TxOutput[]): WizData[] => {
  let currentTxOutputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxOutputIndex = 0;
  }
  const txOutputLength = txOutputs.length;

  if (currentTxOutputIndex === undefined) throw "Invalid transaction output index!";

  if (currentTxOutputIndex < 0) throw "Invalid transaction output index must at least zero!";

  if (txOutputLength === 0) throw "Transaction output template must include at least an element.";

  if (txOutputLength < currentTxOutputIndex + 1) throw "Output index must less than transaction outputs length!";

  const currentOutputAmount = txOutputs[currentTxOutputIndex].amount;

  if (!currentOutputAmount) throw "Amount not found! Check your transaction template.";

  return [WizData.fromHex(currentOutputAmount), WizData.fromNumber(1)];
};

export const inspectOutputNonce = (wizData: WizData, txOutputs: TxOutput[]): WizData => {
  let currentTxOutputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxOutputIndex = 0;
  }
  const txOutputLength = txOutputs.length;

  if (currentTxOutputIndex === undefined) throw "Invalid transaction output index!";

  if (currentTxOutputIndex < 0) throw "Invalid transaction output index must at least zero!";

  if (txOutputLength === 0) throw "Transaction output template must include at least an element.";

  if (txOutputLength < currentTxOutputIndex + 1) throw "Output index must less than transaction outputs length!";

  return WizData.fromNumber(0);
};

export const inspectOutputScriptPubKey = (wizData: WizData, txOutputs: TxOutput[]): WizData[] => {
  let currentTxOutputIndex = wizData.number;
  if (wizData.hex === "00") {
    currentTxOutputIndex = 0;
  }
  const txOutputLength = txOutputs.length;

  if (currentTxOutputIndex === undefined) throw "Invalid transaction output index!";

  if (currentTxOutputIndex < 0) throw "Invalid transaction output index must at least zero!";

  if (txOutputLength === 0) throw "Transaction output template must include at least an element.";

  if (txOutputLength < currentTxOutputIndex + 1) throw "Output index must less than transaction outputs length!";

  if (!txOutputs[currentTxOutputIndex].scriptPubKey) {
    const emptyScriptPupKeyHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    return [WizData.fromHex(emptyScriptPupKeyHash), WizData.fromNumber(-1)];
  } else {
    const currentScriptPubKey = txOutputs[currentTxOutputIndex].scriptPubKey;

    const witnessVersion = currentScriptPubKey.substr(0, 2);
    const witnessProgram = currentScriptPubKey.substring(4);
    const witnessProgramLength = WizData.fromHex(witnessProgram).bytes.length;

    let result: WizData[] = [];
    // Segwit (v0): first byte = 0, witnessProgram length 32 or 20 byte
    if (witnessVersion === "00" && (witnessProgramLength === 20 || witnessProgramLength === 32)) {
      result = [WizData.fromHex(witnessProgram), WizData.fromNumber(0)];
      // Taproot (v1):first byte = 51, witnessProgram length 32 byte
    } else if (witnessVersion === "51" && witnessProgramLength === 32) {
      result = [WizData.fromHex(witnessProgram), WizData.fromNumber(1)];
    } else {
      // Legacy: none segwit and none taproot
      const pubKeySha256 = crypto.sha256(WizData.fromHex(currentScriptPubKey)).toString();
      result = [WizData.fromHex(pubKeySha256), WizData.fromNumber(-1)];
    }
    return result;
  }
};
