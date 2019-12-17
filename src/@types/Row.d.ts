import { RowParams } from "./RowParams";

declare class Row {
    constructor(obj?: RowParams)

    /**
     * Return the value of a column
     * @param {number | string} index
     * @returns {any}
     */
    getValue(index: number): any
    getValue(index: string): any
    getValue(index: any): any
}