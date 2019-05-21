import Serie from './Serie'

export default class Dataframe {
    private columns: Array<string> = []
    private id: string = "id"
    private data: any = {}

    constructor(obj?: DataframeParams) {
        // this.columns.push(this.id)
        if (obj) {
            if (obj.columns && obj.data) {
                if (obj.columns.length !== obj.data.length) {
                    throw new Error(`Length of columns(${obj.columns.length}) and data(${obj.data.length}) must be the same`)
                }
                for (let index = 0; index < obj.columns.length; index++) {
                    const column = obj.columns[index]
                    const serie = obj.data[index]
                    this.columns.push(column)
                    this.data[column] = new Serie({ data: serie, id: column })
                }
            } else {
                if (obj.columns) {
                    this.columns = obj.columns
                }
                if (obj.data) {
                    for (let index = 0; index < obj.data.length; index++) {
                        this.data[`column${index}`] = new Serie({ id: `column${index}`, data: obj.data[index] })
                    }
                }
            }
            if (obj.id) {
                // this.id = obj.id
                // this.columns[0] = this.id
            }
        }
    }

    getColumns(): Array<string> {
        return this.columns
    }

    getSerie(index: number): Serie

    getSerie(name: string): Serie

    getSerie(index: any): Serie {
        if (typeof index === 'number') {
            if (index < this.columns.length) {
                let temp = this.columns[index]
                return this.data[temp]
            }
        }
        if (typeof index === 'string') {
            for (let i of this.columns) {
                if (i == index) {
                    return this.data[i]
                }
            }
        }
        throw new Error(`Serie with name or index ${index} not exists in dataframe`)
    }

    size(): Array<Number> {
        return [this.columns.length, Object.keys(this.data).length]
    }

    head(): any {
        let temp: any = {}
        for (let index of this.columns) {
            temp[index] = this.data[index].head()
        }
        return temp
    }

    toString(): string {
        return JSON.stringify(this.data)
    }
}

type DataframeParams = {
    columns?: Array<string>
    id?: string
    data?: Array<Array<any>>
}