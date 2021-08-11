export declare const tagHash: (tag: string, data: Uint8Array) => string;
export declare const treeHelper: (script: string, version: string) => {
    data: string;
    h: string;
};
export declare const tweakAdd: (pubkey: Uint8Array, tweak: Uint8Array) => string;
export declare const tapRoot: (pubKey: string, script: string, version?: string) => string;
