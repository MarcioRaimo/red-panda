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
        }
    }

    getData(): Array<any> {
        return this.data
    }

    mean(): Number {
        if (this.type === "number") {
            let sum = 0
            for (let index of this.data) {
                sum += index
            }
            return sum / this.data.length
        } else {
            throw new Error(`The serie ${this.id} is not numeric`)
        }
    }

    // add(serie: Column): Column {
    //     if(this.validateForBinaryOperation(serie)) {
    //         let temp = []
    //         for (let index = 0; index < serie.data.length; index++) {
    //             temp.push(serie.data[index] + this.data[index])
    //         }
    //         return new Column({ data: temp, id: 'result' })
    //     }
    // }

    // sub(serie: Column): Column {

    // }

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
    id?: string
    data?: Array<any>
}