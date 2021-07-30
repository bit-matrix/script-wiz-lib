export declare enum VM_NETWORK {
    BTC = "BTC",
    LIQUID = "LIQUID"
}
export declare enum VM_NETWORK_VERSION {
    SEGWIT = "00",
    TAPSCRIPT = "01"
}
export declare type VM = {
    network: VM_NETWORK;
    ver: VM_NETWORK_VERSION;
};
