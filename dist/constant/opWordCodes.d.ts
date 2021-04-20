interface IOpWordCode {
    word: string;
    opcode: number;
    hex: string;
    output?: number;
}
declare const opWordCodes: IOpWordCode[];
export default opWordCodes;
export { IOpWordCode };
