import WizData from "@script-wiz/wiz-data";

export type Taproot = {
  tweak: WizData;
  scriptPubKey: WizData;
  bech32: string;
};
