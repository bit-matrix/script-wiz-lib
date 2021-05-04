import { currentScope } from "..";
import IStackDataList from "../../model/IStackDataList";

const OP_IF = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = stackDataList.main[stackDataList.main.length - 1];
  const newExpression: boolean = lastStackData.byteValue === "0x" ? false : !!lastStackData.byteValue;
  return { flow: [...stackDataList.flow, newExpression], altFlow: stackDataList.altFlow };
};

const OP_NOTIF = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = stackDataList.main[stackDataList.main.length - 1];
  const newExpression: boolean = lastStackData.byteValue === "0x" ? true : !lastStackData.byteValue;
  return { flow: [...stackDataList.flow, newExpression], altFlow: stackDataList.altFlow };
};

const OP_ELSE = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const newFlow = [...stackDataList.flow];
  newFlow.pop();
  return { flow: [...newFlow, !currentScope(stackDataList)], altFlow: stackDataList.altFlow };
};

const OP_ENDIF = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  return { flow: stackDataList.flow.splice(0, stackDataList.flow.length - 1), altFlow: stackDataList.altFlow };
};

export { OP_IF, OP_NOTIF, OP_ELSE, OP_ENDIF };
