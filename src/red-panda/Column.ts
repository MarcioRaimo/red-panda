import { ColumnError } from "./errors/ColumnError";
import { COL01 } from "./errors/Errors";

// to-do rowsIds parameter
// to-do change data into Map

export default class Column {
    private data: Array<any> = []
    private id: string = ""
    private type: string = "string"

    constructor(obj?: ColumnParam) {
        if (obj) {
            this.id = obj.id || ""
            if (obj.data) {
                let temp: Array<Number> = []
                let control = false
                for (let portion of obj.data) {
                    if (!isNaN(portion)) {
                        temp.push(+portion)
                        control = true
                    } else {
                        break
                    }
                }
                if (control) {
                    this.data = temp
                    this.type = "number"
                } else {
                    this.data = obj.data
                }
            }
        } else {
            throw new ColumnError(COL01)
        }
    }

    getData(): Array<any> {
        return this.data
    }

    mean(): Number {
        if (this.validateForBinaryOperation(this)) {
            let sum = 0
            for (let index of this.data) {
                sum += index
            }
            return sum / this.data.length
        }
    }

    sum(): Number {
        if (this.validateForBinaryOperation(this)) {
            let sum = 0
            for (let index of this.data) {
                sum += index
            }
            return sum
        }
    }

    add(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] + serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    sub(serie: Column) {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] - serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    mul(serie: Column) {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] * serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    div(serie: Column) {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] * serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    pow(serie: Column, pow: number) {
        if (this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(Math.pow(this.data[index], pow))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    lt(serie: Column) {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] < serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    lte(serie: Column) {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] <= serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    gt(serie: Column) {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] > serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    gte(serie: Column) {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index = 0; index < serie.data.length; index++) {
                temp.push(this.data[index] > serie.data[index])
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    nte(serie: Column) {
        let temp = []
        for (let index = 0; index < serie.data.length; index++) {
            temp.push(this.data[index] !== serie.data[index])
        }
        return new Column({ data: temp, id: 'result' })
    }

    eq(serie: Column) {
        let temp = []
        for (let index = 0; index < serie.data.length; index++) {
            temp.push(this.data[index] === serie.data[index])
        }
        return new Column({ data: temp, id: 'result' })
    }

    private validateForBinaryOperation(serie: Column): Boolean {
        if (serie.type !== 'number') {
            throw new Error(`The type of the serie: ${serie.id} is not numeric`)
        }
        if (serie.data.length !== this.data.length) {
            throw new Error(`The length(${serie.data.length}) of the serie: ${serie.id} is differente from the length(${this.data.length}) current serie`)
        }
        return true
    }
}

type ColumnParam = {
    id: string
    data?: Array<any>
}