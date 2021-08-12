import WizData from "../convertion";

export type Taproot = {
  tweak: WizData;
  scriptPubKey: WizData;
  bech32: string;
};
