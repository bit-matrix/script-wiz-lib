import WizData from "@script-wiz/wiz-data";
import { WizDataList } from "../model";
import { currentScope } from "../utils";

export const flowVerify = (wizData: WizData): boolean => wizData.hex !== "" && wizData.hex !== "00";

export const flowIf = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = wizDataList.main[wizDataList.main.length - 1];
  const newExpression: boolean = flowVerify(lastStackData);
  const newFlow = [...wizDataList.flow, newExpression];

  return { flow: newFlow, altFlow: [] };
};

export const flowNotIf = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = wizDataList.main[wizDataList.main.length - 1];
  const newExpression: boolean = !flowVerify(lastStackData);
  const newFlow = [...wizDataList.flow, newExpression];

  return { flow: newFlow, altFlow: [] };
};

export const flowElse = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  if (wizDataList.altFlow.length === 0) {
    let newFlow = [...wizDataList.flow];
    newFlow.pop();
    newFlow = [...newFlow, !currentScope(wizDataList)];
    return { flow: newFlow, altFlow: [] };
  }

  return { flow: wizDataList.flow, altFlow: wizDataList.altFlow };
};

export const flowEndIf = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  if (wizDataList.altFlow.length === 0) {
    const newFlow = [...wizDataList.flow];
    return { flow: newFlow.splice(0, newFlow.length - 1), altFlow: [] };
  }

  const newAltFlow = [...wizDataList.altFlow];
  return { flow: wizDataList.flow, altFlow: newAltFlow.splice(0, newAltFlow.length - 1) };
};
