import { IParseResult, StackDataList } from "./model";
declare const parse: (input: string, stackDataList: StackDataList, currentScopeParse: boolean, currentScopeParseException: boolean) => IParseResult;
export default parse;
