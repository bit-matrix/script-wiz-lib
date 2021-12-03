import WizData from "@script-wiz/wiz-data";
import { TxInput, TxOutput } from "../model/TxData";

export const inspectInputAsset = (wizData: WizData, txInputs: TxInput[]): WizData[] => {
  const currentTxInputIndex = wizData.number;
  const txInputLength = txInputs.length;

  if (!currentTxInputIndex) throw "Invalid transaction input index!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  const txInputIndex = currentTxInputIndex - 1;

  if (txInputLength < currentTxInputIndex) throw "Input index must less than transaction inputs length!";

  const currentInputAssetId = txInputs[txInputIndex].assetId;

  if (!currentInputAssetId) throw "Asset id not found! Check your transaction template.";

  return [WizData.fromHex(currentInputAssetId), WizData.fromHex("01")];
};

export const inspectInputValue = (wizData: WizData, txInputs: TxInput[]): WizData[] => {
  const currentTxInputIndex = wizData.number;
  const txInputLength = txInputs.length;

  if (!currentTxInputIndex) throw "Invalid transaction input index!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  const txInputIndex = currentTxInputIndex - 1;

  if (txInputLength < currentTxInputIndex) throw "Input index must less than transaction inputs length!";

  const currentInputAmount = txInputs[txInputIndex].amount;

  if (!currentInputAmount) throw "Amount not found! Check your transaction template.";

  return [WizData.fromHex(currentInputAmount), WizData.fromHex("01")];
};

export const inspectInputOutPoint = (wizData: WizData, txInputs: TxInput[]): WizData[] => {
  const currentTxInputIndex = wizData.number;
  const txInputLength = txInputs.length;

  if (!currentTxInputIndex) throw "Invalid transaction input index!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  const txInputIndex = currentTxInputIndex - 1;

  if (txInputLength < currentTxInputIndex) throw "Input index must less than transaction inputs length!";

  const currentInputPreviousTxId = txInputs[txInputIndex].previousTxId;
  const currentInputVout = txInputs[txInputIndex].vout;

  if (!currentInputPreviousTxId) throw "Previous Tx Id not found! Check your transaction template.";

  if (!currentInputVout) throw "Vout not found! Check your transaction template.";

  return [WizData.fromHex(currentInputPreviousTxId), WizData.fromHex(currentInputVout), WizData.fromHex("00")];
};

export const inspectInputSequence = (wizData: WizData, txInputs: TxInput[]): WizData => {
  const currentTxInputIndex = wizData.number;
  const txInputLength = txInputs.length;

  if (!currentTxInputIndex) throw "Invalid transaction input index!";

  if (txInputLength === 0) throw "Transaction input template must include at least an element.";

  const txInputIndex = currentTxInputIndex - 1;

  if (txInputLength < currentTxInputIndex) throw "Input index must less than transaction inputs length!";

  const currentInputSequence = txInputs[txInputIndex].sequence;

  if (!currentInputSequence) throw "Sequence not found! Check your transaction template.";

  return WizData.fromHex(currentInputSequence);
};

export const inspectOutputAsset = (wizData: WizData, txOutputs: TxOutput[]): WizData[] => {
  const currentTxOutputIndex = wizData.number;
  const txOutputLength = txOutputs.length;

  if (!currentTxOutputIndex) throw "Invalid transaction output index!";

  if (txOutputLength === 0) throw "Transaction output template must include at least an element.";

  const txOutputIndex = currentTxOutputIndex - 1;

  if (txOutputLength < currentTxOutputIndex) throw "Output index must less than transaction outputs length!";

  const currentOutputAssetId = txOutputs[txOutputIndex].assetId;

  if (!currentOutputAssetId) throw "Output Asset id not found! Check your transaction template.";

  return [WizData.fromHex(currentOutputAssetId), WizData.fromHex("01")];
};

export const inspectOutputValue = (wizData: WizData, txOutputs: TxOutput[]): WizData[] => {
  const currentTxOutputIndex = wizData.number;
  const txOutputLength = txOutputs.length;

  if (!currentTxOutputIndex) throw "Invalid transaction output index!";

  if (txOutputLength === 0) throw "Transaction output template must include at least an element.";

  const txOutputIndex = currentTxOutputIndex - 1;

  if (txOutputLength < currentTxOutputIndex) throw "Output index must less than transaction outputs length!";

  const currentOutputAmount = txOutputs[txOutputIndex].amount;

  if (!currentOutputAmount) throw "Amount not found! Check your transaction template.";

  return [WizData.fromHex(currentOutputAmount), WizData.fromHex("01")];
};
