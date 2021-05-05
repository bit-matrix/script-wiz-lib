import { StackData } from "../../model";
import IStackDataList from "../../model/IStackDataList";
declare const OP_IF: (stackDataList: IStackDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
declare const OP_NOTIF: (stackDataList: IStackDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
declare const OP_ELSE: (stackDataList: IStackDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
declare const OP_ENDIF: (stackDataList: IStackDataList) => {
    flow: boolean[];
    altFlow: boolean[];
};
declare const OP_VERIFY: (stackData: StackData) => boolean;
export { OP_IF, OP_NOTIF, OP_ELSE, OP_ENDIF, OP_VERIFY };
