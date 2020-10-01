// to-do implement axis row

import Column from './Column'
import Row from './Row';
import { DataframeParams } from '../@types/DataframeParams';

export default class Dataframe {
    private columnsIds: Array<string> = []
    private rowsIds: Array<string> = []
    private id: string = ""
    private columns: Map<string, Column> = new Map()
    private rows: Map<string, Row> = new Map()

    constructor(obj?: DataframeParams) {
        console.log(obj)
        if (obj) {
            let axis = obj.axis || 'column'
            if (obj.id) {
                this.id = obj.id
            }
            if ((obj.columnsIds === null || obj.columnsIds === undefined) || obj.columnsIds.length === 0) {
                throw new Error('Columns ids is required and cannot be empty')
            }
            if (obj.data) {
                let tempRows: any = {}
                if (obj.columnsIds.length !== obj.data.length && axis === 'column') {
                    throw new Error(`Length of columns(${obj.columnsIds.length}) and data(${obj.data.length}) must be the same`)
                }
                if (axis === 'column') {
                    for (let index = 0; index < obj.columnsIds.length; index++) {
                        const column = obj.columnsIds[index]
                        const serie = obj.data[index]
                        this.columnsIds.push(column)
                        this.columns.set(column, new Column({ data: serie, id: column }))
                    }
                    for (let index = 0; index < this.columnsIds.length; index++) {
                        const column = this.columnsIds[index]
                        const serie = this.columns.get(column)
                        for (let valueIndex = 0; valueIndex < serie.getData().size; valueIndex++) {
                            const cell = serie.getData().get(valueIndex.toString())
                            if (this.id === '') {
                                if (tempRows[`row${valueIndex}`] !== undefined) {
                                    tempRows[`row${valueIndex}`][column] = cell
                                } else {
                                    tempRows[`row${valueIndex}`] = {}
                                    tempRows[`row${valueIndex}`][column] = cell
                                }
                            } else {
                                if (this.columnsIds.indexOf(this.id) === -1) {
                                    throw new Error(`Column with name: ${this.id} is not present (${this.columnsIds})`)
                                }
                                let tempId = this.columns.get(this.id).getData().get(valueIndex.toString())
                                if (tempRows[tempId] !== undefined) {
                                    tempRows[tempId][column] = cell
                                } else {
                                    tempRows[tempId] = []
                                    tempRows[tempId][column] = cell
                                }
                            }
                        }
                    }
                    this.rowsIds = Object.keys(tempRows)
                    for (let index = 0; index < this.rowsIds.length; index++) {
                        let rowId = this.rowsIds[index]
                        this.rows.set(rowId, new Row({ data: tempRows[rowId], id: rowId }))
                    }
                } else if (axis === 'row') {
                    if (obj.columnsIds.length !== obj.data[0].length) {
                        throw new Error(`Length of columns(${obj.columnsIds.length}) and data(${obj.data[0].length}) must be the same`)
                    }
                    this.columnsIds = obj.columnsIds
                    let tempRows: any = {}
                    for (let index = 0; index < obj.data.length; index++) {
                        if (this.id === '') {
                            if (tempRows[`row${index}`] === undefined) {
                                tempRows[`row${index}`] = {}
                            }
                        }
                    }
                }
            }
        }
    }

    private getRowIndex(row: string): number {
        for (let index = 0; index < this.rowsIds.length; index++) {
            const temp = this.rowsIds[index]
            if (row === temp) {
                return index
            }
        }
        throw new Error(`Row with id '${row}' do not exists.`)
    }

    private getRowName(row: number): string {
        return this.rowsIds[row]
    }

    private getColumnIndex(column: string): number {
        for (let index = 0; index < this.columnsIds.length; index++) {
            const temp = this.columnsIds[index]
            if (column === temp) {
                return index
            }
        }
        throw new Error(`Row with id '${column}' do not exists.`)
    }

    private getColumnName(column: number): string {
        return this.columnsIds[column]
    }

    /**
     * Get columns names
     * @returns {Array<string>}
     */
    getColumnsNames(): Array<string> {
        return this.columnsIds
    }

    /**
     * Get a column
     * @param {number | string} index The index/name of the column
     * @returns {Column}
     */
    getColumn(index: number): Column
    getColumn(index: string): Column
    getColumn(index: any): Column {
        if (typeof index === 'number') {
            return this.columns.get(this.getColumnName(index))
        }
        if (typeof index === 'string') {
            return this.columns.get(index)
        }
        throw new Error(`Column with id or index ${index} is not present in dataframe`)
    }

    /**
     * Return row names
     * @returns {Array<string>}
     */
    getRowsIds(): Array<string> {
        return this.rowsIds
    }

    /**
     * Get a row
     * @param {number | string} index The index/name of the row
     * @returns {Row}
     */
    getRow(index: number): Row
    getRow(index: string): Row
    getRow(index: any): Row {
        if (typeof index === 'number') {
            return this.rows.get(this.getRowName(index))
        }
        if (typeof index === 'string') {
            return this.rows.get(index)
        }
        throw new Error(`Row with id or index ${index} is not present in dataframe`)
    }

    /**
     * Return an array containing the number os rows and columns
     * @returns {Array<number>}
     */
    shape(): Array<number> {
        return [this.rows.size, this.columns.size]
    }

    /**
     * Return the first 10 rows (or less)
     * @returns {Array<Row>}
     */
    head(): Array<Row> {
        let temp: Array<Row> = []
        let counter = 0
        for (let row of this.rows) {
            if (counter <= 9) {
                counter++
                temp.push(row[1])
            } else {
                break
            }
        }
        return temp
    }

    /**
     * Return the last 10 rows (or less)
     * @returns {Array<Row>}
     */
    tail(): Array<Row> {
        let temp: Array<Row> = []
        let counter = 0
        for (let index = this.rowsIds.length - 1; index >= 0; index--) {
            const row = this.rowsIds[index]
            if (counter <= 9) {
                counter++
                temp.push(this.rows.get(row))
            } else {
                break
            }
        }
        return temp
    }

    /**
     * Delete the last row and return it
     * @returns {Row}
     */
    pop(): Row {
        const rowName = this.rowsIds.pop()
        const temp = this.rows.get(rowName)
        this.rows.delete(rowName)
        return temp
    }

    /**
     * Remove rows before of index
     * @param {number | string} index
     * @returns {Dataframe} New dataframe
     */
    truncateBefore(index: number): Dataframe
    truncateBefore(index: string): Dataframe
    truncateBefore(index: any): Dataframe {
        let rows = []
        let maxIndex = 0
        if (typeof index === 'number') {
            maxIndex = index
        } else if (typeof index === 'string') {
            maxIndex = this.getColumnIndex(index)
        }
        for (let i = 0; i < maxIndex; i++) {
            rows.push(this.getRow(i))
        }
        return new Dataframe({

        })
    }
}
