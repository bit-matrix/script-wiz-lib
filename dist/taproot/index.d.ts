export declare const tagHash: (tag: string, data: Uint8Array) => string;
export declare const treeHelper: (script: string) => {
    data: string;
    h: string;
};
export declare const tapRoot: (pubKey: string, script: string) => void;
export declare const tweakAdd: () => void;
