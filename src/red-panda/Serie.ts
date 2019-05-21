export default class Serie {
    private data: Array<any> = []
    private id: string = ""
    private type: string = "string"

    constructor(obj?: SerieParam) {
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

    mean(): Number {
        if(this.type === "number") {
            let sum = 0
            for(let index of this.data) {
                sum += index
            }
            return sum/this.data.length
        } else {
            throw new Error (`The serie ${this.id} is not numeric`)
        }
    }

    head(): Array<any> {
        let temp = []
        for (let index = 0; index < 10; index++) {
            temp.push(this.data[index])
        }
        return temp
    }
}

type SerieParam = {
    id?: string
    data?: Array<any>
}