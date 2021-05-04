import IStackDataList from "../../model/IStackDataList";
declare const OP_IF: (stackDataList: IStackDataList) => boolean[];
declare const OP_NOTIF: (stackDataList: IStackDataList) => boolean[];
declare const OP_ELSE: (stackDataList: IStackDataList) => boolean[];
declare const OP_ENDIF: (stackDataList: IStackDataList) => boolean[];
export { OP_IF, OP_NOTIF, OP_ELSE, OP_ENDIF };
