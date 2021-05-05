import { currentScope } from "..";
import { StackData } from "../../model";
import IStackDataList from "../../model/IStackDataList";

const OP_IF = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = stackDataList.main[stackDataList.main.length - 1];
  const newExpression: boolean = lastStackData.byteValue === "0x" ? false : !!Number(lastStackData.byteValue);

  const scope = currentScope(stackDataList);
  const newFlow = scope ? [...stackDataList.flow, newExpression] : stackDataList.flow;
  const newAltFlow = scope ? stackDataList.altFlow : [...stackDataList.altFlow, true];

  return { flow: newFlow, altFlow: newAltFlow };
};

const OP_NOTIF = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = stackDataList.main[stackDataList.main.length - 1];
  const newExpression: boolean = lastStackData.byteValue === "0x" ? true : !Number(lastStackData.byteValue);

  const scope = currentScope(stackDataList);
  const newFlow = scope ? [...stackDataList.flow, newExpression] : stackDataList.flow;
  const newAltFlow = scope ? stackDataList.altFlow : [...stackDataList.altFlow, true];

  return { flow: newFlow, altFlow: newAltFlow };
};

const OP_ELSE = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const emptyAltFlow = stackDataList.altFlow.length === 0;
  // const scope = currentScope(stackDataList);

  if (emptyAltFlow) {
    let newFlow = [...stackDataList.flow];
    newFlow.pop();
    newFlow = [...newFlow, !currentScope(stackDataList)];

    return { flow: newFlow, altFlow: stackDataList.altFlow };
  } else {
    const newAltFlow = [...stackDataList.altFlow];
    const reversedAltExpression = false; // !stackDataList.altFlow[stackDataList.altFlow.length - 1];
    newAltFlow.pop();
    newAltFlow.push(reversedAltExpression);

    return { flow: stackDataList.flow, altFlow: newAltFlow };
  }
};

const OP_ENDIF = (stackDataList: IStackDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const emptyAltFlow = stackDataList.altFlow.length === 0;
  // const scope = currentScope(stackDataList);
  const newFlow = [...stackDataList.flow];
  const newAltFlow = [...stackDataList.altFlow];

  if (emptyAltFlow) {
    return { flow: newFlow.splice(0, newFlow.length - 1), altFlow: newAltFlow };
  } else {
    return { flow: newFlow, altFlow: newAltFlow.splice(0, newAltFlow.length - 1) };
  }
};

const OP_VERIFY = (stackData: StackData): boolean => {
  return stackData.byteValue === "0x" ? false : !!Number(stackData.byteValue);
};

export { OP_IF, OP_NOTIF, OP_ELSE, OP_ENDIF, OP_VERIFY };
