export declare type TxInput = {
    previousTxId: string;
    vout: string;
    sequence: string;
    scriptPubKey: string;
    amount: string;
    assetId?: string;
};
export declare type TxOutput = {
    scriptPubKey: string;
    amount: string;
    assetId?: string;
};
export declare type TxData = {
    inputs: TxInput[];
    outputs: TxOutput[];
    version: string;
    timelock: string;
    currentInputIndex: number;
};
