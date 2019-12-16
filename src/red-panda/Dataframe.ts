// to-do implement axis row
// to-do implement Columns data to Map

import Column from './Column'
import Row from './Row';

export default class Dataframe {
    private columnsIds: Array<string> = []
    private rowsIds: Array<string> = []
    private id: string = ""
    private columns: Map<string, Column> = new Map()
    private rows: Map<string, Row> = new Map()

    constructor(obj?: DataframeParams) {
        if (obj) {
            if (obj.axis === undefined || obj.axis === null) {
                obj.axis = 'row'
            }
            if (obj.axis === 'row') {
                for (let index = 0; index < obj.data.length; index++) {
                    this.rows.set(index.toString(), new Row({ data: obj.data[index], id: index.toString() }))
                }
            } else {
                for (let index = 0; index < obj.data.length; index++) {
                    this.columns.set(index.toString())
                }
            }
        }
        // if (obj) {
        //     let axis = obj.axis || 'column'
        //     if (obj.id) {
        //         this.id = obj.id
        //     }
        //     if (!obj.columnsIds && obj.columnsIds.length > 0) {
        //         throw new Error('Columns ids is required and cannot be empty')
        //     }
        //     if (obj.data) {
        //         let tempRows: any = {}
        //         if (obj.columnsIds.length !== obj.data.length && axis === 'column') {
        //             throw new Error(`Length of columns(${obj.columnsIds.length}) and data(${obj.data.length}) must be the same`)
        //         }
        //         if (axis === 'column') {
        //             for (let index = 0; index < obj.columnsIds.length; index++) {
        //                 const column = obj.columnsIds[index]
        //                 const serie = obj.data[index]
        //                 this.columnsIds.push(column)
        //                 this.columns.set(column, new Column({ data: serie, id: column }))
        //             }
        //             for (let index = 0; index < this.columnsIds.length; index++) {
        //                 const column = this.columnsIds[index]
        //                 const serie = this.columns.get(column)
        //                 for (let valueIndex = 0; valueIndex < serie.getData().size; valueIndex++) {
        //                     const cell = serie.getData()[valueIndex]
        //                     if (this.id === '') {
        //                         if (tempRows[`row${valueIndex}`] !== undefined) {
        //                             tempRows[`row${valueIndex}`][column] = cell
        //                         } else {
        //                             tempRows[`row${valueIndex}`] = {}
        //                             tempRows[`row${valueIndex}`][column] = cell
        //                         }
        //                     } else {
        //                         if (this.columnsIds.indexOf(this.id) === -1) {
        //                             throw new Error(`Column with name: ${this.id} is not present (${this.columnsIds})`)
        //                         }
        //                         let tempId = this.columns.get(this.id).getData()[valueIndex]
        //                         if (tempRows[tempId] !== undefined) {
        //                             tempRows[tempId][column] = cell
        //                         } else {
        //                             tempRows[tempId] = []
        //                             tempRows[tempId][column] = cell
        //                         }
        //                     }
        //                 }
        //             }
        //             this.rowsIds = Object.keys(tempRows)
        //             for (let index = 0; index < this.rowsIds.length; index++) {
        //                 let rowId = this.rowsIds[index]
        //                 this.rows.set(rowId, new Row({ data: tempRows[rowId], id: rowId }))
        //             }
        //         } else if (axis === 'row') {
        //             if (obj.columnsIds.length !== obj.data[0].length) {
        //                 throw new Error(`Length of columns(${obj.columnsIds.length}) and data(${obj.data[0].length}) must be the same`)
        //             }
        //             this.columnsIds = obj.columnsIds
        //             let tempRows: any = {}
        //             for (let index = 0; index < obj.data.length; index++) {
        //                 if(this.id === '') {
        //                     if(tempRows[`row${index}`] === undefined) {
        //                         tempRows[`row${index}`] = {}
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    getColumnsNames(): Array<string> {
        return this.columnsIds
    }

    getColumn(index: number): Column
    getColumn(index: string): Column
    getColumn(index: any): Column {
        if (typeof index === 'number') {
            if (index < this.columnsIds.length) {
                let temp = this.columnsIds[index]
                return this.columns.get(temp)
            }
        }
        if (typeof index === 'string') {
            for (let i of this.columnsIds) {
                if (i == index) {
                    return this.columns.get(i)
                }
            }
        }
        throw new Error(`Column with id or index ${index} is not present in dataframe`)
    }

    getRowsIds(): Array<string> {
        return this.rowsIds
    }

    getRow(index: number): Row
    getRow(index: string): Row
    getRow(index: any): Row {
        if (typeof index === 'number') {
            if (index < this.rowsIds.length) {
                let temp = this.rowsIds[index]
                this.rows.get(temp)
            }
        }
        if (typeof index === 'string') {
            for (let i of this.rowsIds) {
                if (i == index) {
                    this.rows.get(i)
                }
            }
        }
        throw new Error(`Row with id or index ${index} is not present in dataframe`)
    }

    size(): Array<Number> {
        return [this.columnsIds.length, Object.keys(this.rows).length]
    }

    head(): Array<Row> {
        let temp: Array<Row> = []
        if (this.rowsIds.length > 10) {
            for (let index = 0; index < 10; index++) {
                temp.push(this.rows.get(this.rowsIds[index]))
            }
        } else {
            for (let index = 0; index < this.rowsIds.length; index++) {
                temp.push(this.rows.get(this.rowsIds[index]))
            }
        }
        return temp
    }

    toString(): string {
        return JSON.stringify(this.columns)
    }
}

type DataframeParams = {
    columnsIds?: Array<string>
    columnId?: string
    rowsIds?: Array<string>
    rowId?: string
    id?: string
    data?: Array<Array<any>>
    axis?: 'column' | 'row'
}