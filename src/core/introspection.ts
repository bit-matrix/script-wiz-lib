import WizData from "@script-wiz/wiz-data";
import { TxInput, TxOutput } from "../model/TxData";

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

  return [WizData.fromHex(currentInputAssetId), WizData.fromNumber(1)];
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

  return [WizData.fromHex(currentInputPreviousTxId), WizData.fromHex(currentInputVout), WizData.fromHex("00")];
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

  return [WizData.fromHex(currentOutputAssetId), WizData.fromNumber(1)];
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
