import Column from './Column'

export default class Dataframe {
    private columnsNames: Array<string> = []
    private id: string = "id"
    private data: any = {}

    constructor(obj?: DataframeParams) {
        // this.columns.push(this.id)
        if (obj) {
            if (obj.columnsNames && obj.data) {
                if (obj.columnsNames.length !== obj.data.length) {
                    throw new Error(`Length of columns(${obj.columnsNames.length}) and data(${obj.data.length}) must be the same`)
                }
                for (let index = 0; index < obj.columnsNames.length; index++) {
                    const column = obj.columnsNames[index]
                    const serie = obj.data[index]
                    this.columnsNames.push(column)
                    this.data[column] = new Column({ data: serie, id: column })
                }
            } else {
                if (obj.columnsNames) {
                    this.columnsNames = obj.columnsNames
                }
                if (obj.data) {
                    for (let index = 0; index < obj.data.length; index++) {
                        this.data[`column${index}`] = new Column({ id: `column${index}`, data: obj.data[index] })
                    }
                }
            }
            if (obj.id) {
                // this.id = obj.id
                // this.columns[0] = this.id
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
                return this.data[temp]
            }
        }
        if (typeof index === 'string') {
            for (let i of this.columnsNames) {
                if (i == index) {
                    return this.data[i]
                }
            }
        }
        throw new Error(`Serie with name or index ${index} not exists in dataframe`)
    }

    size(): Array<Number> {
        return [this.columnsNames.length, Object.keys(this.data).length]
    }

    head(): any {
        let temp: any = {}
        for (let index of this.columnsNames) {
            temp[index] = this.data[index].head()
        }
        return temp
    }

    toString(): string {
        return JSON.stringify(this.data)
    }
}

type DataframeParams = {
    columnsNames?: Array<string>
    id?: string
    data?: Array<Array<any>>
}