import { ColumnError } from "./errors/ColumnError";
import { COL01 } from "./errors/Errors";
import { ColumnParams } from "../@types/ColumnParams";

// to-do rowsIds parameter
// to-do change data into Map

export default class Column {
    private data: Map<string, any> = new Map<string, any>()
    private id: string = ""
    private type: string = "string"

    constructor(obj?: ColumnParams) {
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
                    for (let index = 0; index < temp.length; index++) {
                        this.data.set(`${index}`, temp[index])
                    }
                    this.type = "number"
                } else {
                    for (let index = 0; index < temp.length; index++) {
                        this.data.set(`${index}`, obj.data[index])
                    }
                }
            }
        } else {
            throw new ColumnError(COL01)
        }
    }

    /**
     * Return a map of row values
     * @returns {Map<string, any>}
     */
    getData(): Map<string, any> {
        return this.data
    }

    /**
     * Calculate mean of row value
     * @returns {number}
     */
    mean(): number {
        if (this.validateForBinaryOperation(this)) {
            let sum = 0
            for (let index of this.data) {
                sum += index[1]
            }
            return sum / this.data.size
        }
    }

    /**
     * Sum of row values
     * @returns {number}
     */
    sum(): number {
        if (this.validateForBinaryOperation(this)) {
            let sum = 0
            for (let index of this.data) {
                sum += index[1]
            }
            return sum
        }
    }

    /**
     * Sum this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    add(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] + serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Subtract this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    sub(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] - serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Multiply this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    mul(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] * serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Divide this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    div(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] * serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Exponential power of this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    pow(serie: Column, pow: number): Column {
        if (this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(Math.pow(index[1], pow))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Compare less than of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    lt(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] < serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Compare less than or equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    lte(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] <= serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Compare greater than of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    gt(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] > serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Compare greater than or equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    gte(serie: Column): Column {
        if (this.validateForBinaryOperation(serie) && this.validateForBinaryOperation(this)) {
            let temp = []
            for (let index of this.data) {
                temp.push(index[1] > serie.data.get(index[0]))
            }
            return new Column({ data: temp, id: 'result' })
        }
    }

    /**
     * Compare not equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    nte(serie: Column): Column {
        let temp = []
        for (let index of this.data) {
            temp.push(index[1] !== serie.data.get(index[0]))
        }
        return new Column({ data: temp, id: 'result' })
    }

    /**
     * Compare equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    eq(serie: Column): Column {
        let temp = []
        for (let index of this.data) {
            temp.push(index[1] === serie.data.get(index[0]))
        }
        return new Column({ data: temp, id: 'result' })
    }

    /**
     * Validate the values for binary operations
     * @param {Column} serie 
     * @returns {boolean}
     */
    private validateForBinaryOperation(serie: Column): boolean {
        if (serie.type !== 'number') {
            throw new Error(`The type of the serie: ${serie.id} is not numeric`)
        }
        if (serie.data.size !== this.data.size) {
            throw new Error(`The length(${serie.data.size}) of the serie: ${serie.id} is differente from the length(${this.data.size}) current serie`)
        }
        return true
    }
}