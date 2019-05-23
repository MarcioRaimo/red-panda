import Column from './Column'
import Row from './Row';

export default class Dataframe {
    private columnsIds: Array<string> = []
    private rowsIds: Array<string> = []
    private id: string = ""
    private columns: any = {}
    private rows: any = {}

    constructor(obj?: DataframeParams) {
        if (obj) {
            let axis = obj.axis || 'column'
            if (obj.id) {
                this.id = obj.id
            }
            if (obj.columnsIds && obj.data) {
                let tempRows: any = {}
                if (obj.columnsIds.length !== obj.data.length && axis === 'column') {
                    throw new Error(`Length of columns(${obj.columnsIds.length}) and data(${obj.data.length}) must be the same`)
                }
                if (axis === 'column') {
                    for (let index = 0; index < obj.columnsIds.length; index++) {
                        const column = obj.columnsIds[index]
                        const serie = obj.data[index]
                        this.columnsIds.push(column)
                        this.columns[column] = new Column({ data: serie, id: column })
                    }
                    for (let index = 0; index < this.columnsIds.length; index++) {
                        const column = this.columnsIds[index]
                        const serie = this.columns[column].data
                        for (let valueIndex = 0; valueIndex < serie.length; valueIndex++) {
                            const cell = serie[valueIndex]
                            if (this.id === '') {
                                if (tempRows[`row${valueIndex}`] !== undefined) {
                                    tempRows[`row${valueIndex}`][column] = cell
                                } else {
                                    tempRows[`row${valueIndex}`] = {}
                                    tempRows[`row${valueIndex}`][column] = cell
                                }
                            } else {
                                if(this.columnsIds.indexOf(this.id) === -1) {
                                    throw new Error(`Column with name: ${this.id} is not present (${this.columnsIds})`)
                                }
                                let tempId = this.columns[this.id].data[valueIndex]
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
                        this.rows[rowId] = new Row({ data: tempRows[rowId], id: rowId })
                    }
                }
            }
        }
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
                return this.columns[temp]
            }
        }
        if (typeof index === 'string') {
            for (let i of this.columnsIds) {
                if (i == index) {
                    return this.columns[i]
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
                return this.rows[temp]
            }
        }
        if (typeof index === 'string') {
            for (let i of this.rowsIds) {
                if (i == index) {
                    return this.rows[i]
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
        if(this.rowsIds.length > 10) {
            for(let index = 0; index < 10; index++) {
                temp.push(this.rows[this.rowsIds[index]])
            }
        } else {
            for(let index = 0; index < this.rowsIds.length; index++) {
                temp.push(this.rows[this.rowsIds[index]])
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
    id?: string
    data?: Array<Array<any>>
    axis?: 'column' | 'row'
}