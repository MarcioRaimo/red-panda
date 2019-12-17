import { DataframeParams } from "./DataframeParams";
import { Column } from "./Column";
import { Row } from "./Row";

declare class Dataframe {
    constructor(obj?: DataframeParams)

    /**
     * Get columns names
     * @returns {Array<string>}
     */
    getColumnsNames(): Array<string>

    /**
     * Get a column
     * @param index {number | string} The index/name of the column
     * @returns {Column}
     */
    getColumn(index: number): Column
    getColumn(index: string): Column
    getColumn(index: any): Column

    /**
     * Return row names
     * @returns {Array<string>}
     */
    getRowsIds(): Array<string>

    /**
     * Get a row
     * @param {number | string} index The index/name of the row
     * @returns {Row}
     */
    getRow(index: number): Row
    getRow(index: string): Row
    getRow(index: any): Row

    /**
     * Return an array containing the number os rows and columns
     * @returns {Array<number>}
     */
    shape(): Array<number>

    /**
     * Return the first 10 rows (or less)
     * @returns {Array<Row>}
     */
    head(): Array<Row>

    /**
     * Return the last 10 rows (or less)
     * @returns {Array<Row>}
     */
    tail(): Array<Row>

    /**
     * Delete the last row and return it
     * @returns {Row}
     */
    pop(): Row

    /**
     * Remove rows before of index
     * @param {number | string} index
     * @returns {Dataframe} New dataframe
     */
    truncateBefore(): Dataframe
}