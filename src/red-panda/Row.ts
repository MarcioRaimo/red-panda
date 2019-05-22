export default class Row {

  private columnsNames: Array<string> = []
  private data: any = {}
  private id: string = ''

  constructor(obj: RowParams) {
    if (!obj.data) {
      throw new Error(`Cannot create empty row`)
    }
    this.columnsNames = Object.keys(obj.data)
    for (let index of this.columnsNames) {
      this.data[index] = obj.data[index]
    }
  }

  getValue(index: number): any

  getValue(index: string): any

  getValue(index: any): any {

    if (typeof index === 'number') {
      if (this.data[this.columnsNames[index]] !== undefined) {
        return this.data[this.columnsNames[index]]
      } else {
        throw new Error(`The column ${this.columnsNames[index]} isnt in this row`)
      }
    }
    if (this.data[this.columnsNames[index]] !== undefined) {
      return this.data[index]
    } else {
      throw new Error(`The column ${this.columnsNames[index]} isnt in this row`)
    }
  }
}

type RowParams = {
  id: string
  data: any
}