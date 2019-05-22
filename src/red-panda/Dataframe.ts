import Column from './Column'

export default class Dataframe {
    private columnsNames: Array<string> = []
    private id: string = ""
    private columns: any = {}
    private rows: any = {}

    constructor(obj?: DataframeParams) {
        // this.columns.push(this.id)
        if (obj) {
            if (obj.id) {
                // this.id = obj.id
                // this.columns[0] = this.id
            }
            if (obj.columnsNames && obj.data) {
                if (obj.columnsNames.length !== obj.data.length) {
                    throw new Error(`Length of columns(${obj.columnsNames.length}) and data(${obj.data.length}) must be the same`)
                }
                for (let index = 0; index < obj.columnsNames.length; index++) {
                    const column = obj.columnsNames[index]
                    const serie = obj.data[index]
                    this.columnsNames.push(column)
                    this.columns[column] = new Column({ data: serie, id: column })
                }
            } else {
                if (obj.columnsNames) {
                    this.columnsNames = obj.columnsNames
                }
                if (obj.data) {
                    var tempRows = {}
                    for (let index = 0; index < obj.data.length; index++) {
                        let tempColumn = new Column({ id: `column${index}`, data: obj.data[index] })
                        this.columns[`column${index}`] = tempColumn
                        for(let data in tempColumn.getData()) {
                            if(this.id === '') {
                                // if(tempRows)
                            }
                        }
                    }
                }
            }
            if (Object.keys(this.columns).length > 0) {
            }
        }
    }

    getColumnsNames(): Array<string> {
        return this.columnsNames
    }

    getColumn(index: number): Column

    getColumn(name: string): Column

    getColumn(index: any): Column {
        if (typeof index === 'number') {
            if (index < this.columnsNames.length) {
                let temp = this.columnsNames[index]
                return this.columns[temp]
            }
        }
        if (typeof index === 'string') {
            for (let i of this.columnsNames) {
                if (i == index) {
                    return this.columns[i]
                }
            }
        }
        throw new Error(`Serie with name or index ${index} not exists in dataframe`)
    }

    size(): Array<Number> {
        return [this.columnsNames.length, Object.keys(this.rows).length]
    }

    head(): any {
        let temp: any = {}
        for (let index of this.columnsNames) {
            temp[index] = this.columns[index].head()
        }
        return temp
    }

    toString(): string {
        return JSON.stringify(this.columns)
    }
}

type DataframeParams = {
    columnsNames?: Array<string>
    id?: string
    data?: Array<Array<any>>
}