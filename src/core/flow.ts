import WizData from "@script-wiz/wiz-data";
import { WizDataList } from "../model";
import { currentScope } from "../utils";

export const flowIf = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = wizDataList.main[wizDataList.main.length - 1];

  const newExpression: boolean = lastStackData.hex === "0x" ? false : !!Number(lastStackData.hex);

  const scope = currentScope(wizDataList);
  const newFlow = scope ? [...wizDataList.flow, newExpression] : wizDataList.flow;
  const newAltFlow = scope ? wizDataList.altFlow : [...wizDataList.altFlow, true];

  return { flow: newFlow, altFlow: newAltFlow };
};

export const flowNotIf = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const lastStackData = wizDataList.main[wizDataList.main.length - 1];
  const newExpression: boolean = lastStackData.hex === "0x" ? true : !Number(lastStackData.hex);

  const scope = currentScope(wizDataList);
  const newFlow = scope ? [...wizDataList.flow, newExpression] : wizDataList.flow;
  const newAltFlow = scope ? wizDataList.altFlow : [...wizDataList.altFlow, true];

  return { flow: newFlow, altFlow: newAltFlow };
};

export const flowElse = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const emptyAltFlow = wizDataList.altFlow.length === 0;

  if (emptyAltFlow) {
    let newFlow = [...wizDataList.flow];
    newFlow.pop();
    newFlow = [...newFlow, !currentScope(wizDataList)];

    return { flow: newFlow, altFlow: wizDataList.altFlow };
  } else {
    const newAltFlow = [...wizDataList.altFlow];
    const reversedAltExpression = false; // !stackDataList.altFlow[stackDataList.altFlow.length - 1];
    newAltFlow.pop();
    newAltFlow.push(reversedAltExpression);

    return { flow: wizDataList.flow, altFlow: newAltFlow };
  }
};

export const flowEndIf = (wizDataList: WizDataList): { flow: boolean[]; altFlow: boolean[] } => {
  const emptyAltFlow = wizDataList.altFlow.length === 0;
  const newFlow = [...wizDataList.flow];
  const newAltFlow = [...wizDataList.altFlow];

  if (emptyAltFlow) {
    return { flow: newFlow.splice(0, newFlow.length - 1), altFlow: newAltFlow };
  } else {
    return { flow: newFlow, altFlow: newAltFlow.splice(0, newAltFlow.length - 1) };
  }
};

export const flowVerify = (wizData: WizData): boolean => {
  return wizData.hex === "0x" ? false : !!Number(wizData.hex);
};
