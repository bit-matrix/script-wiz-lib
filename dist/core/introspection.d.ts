import WizData from "@script-wiz/wiz-data";
import { TxInput, TxOutput } from "../model/TxData";
export declare const inspectInputAsset: (wizData: WizData, txInputs: TxInput[]) => WizData[];
export declare const inspectInputValue: (wizData: WizData, txInputs: TxInput[]) => WizData[];
export declare const inspectInputOutPoint: (wizData: WizData, txInputs: TxInput[]) => WizData[];
export declare const inspectInputSequence: (wizData: WizData, txInputs: TxInput[]) => WizData;
export declare const inspectOutputAsset: (wizData: WizData, txOutputs: TxOutput[]) => WizData[];
export declare const inspectOutputValue: (wizData: WizData, txOutputs: TxOutput[]) => WizData[];
