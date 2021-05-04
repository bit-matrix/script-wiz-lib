import { currentScope } from "..";
import { ParseResult } from "../../model";
import IStackDataList from "../../model/IStackDataList";

const OP_IF = (stackDataList: IStackDataList): boolean[] => {
  const lastStackData = stackDataList.main[stackDataList.main.length - 1];
  const newExpression: boolean = lastStackData.byteValue === "0x" ? false : !!lastStackData.byteValue;
  return [...stackDataList.flow, newExpression];
};

const OP_NOTIF = (stackDataList: IStackDataList): boolean[] => {
  const lastStackData = stackDataList.main[stackDataList.main.length - 1];
  const newExpression: boolean = lastStackData.byteValue === "0x" ? true : !lastStackData.byteValue;
  return [...stackDataList.flow, newExpression];
};

const OP_ELSE = (stackDataList: IStackDataList): boolean[] => {
  const newFlow = [...stackDataList.flow];
  newFlow.pop();
  return [...newFlow, !currentScope(stackDataList)];
};

const OP_ENDIF = (stackDataList: IStackDataList): boolean[] => stackDataList.flow.splice(0, stackDataList.flow.length - 1);

export { OP_IF, OP_NOTIF, OP_ELSE, OP_ENDIF };
