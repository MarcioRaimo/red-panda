export default class Row {

  private columnsNames: Array<string> = []
  private data: Map<String, any> = new Map<String, any>()
  private id: string = ''

  constructor(obj: RowParams) {
    if (!obj.data) {
      throw new Error(`Cannot create empty row`)
    }
    if(!obj.id) {
      throw new Error('Row id cannot be empty')
    }
    this.id = obj.id
    this.columnsNames = Object.keys(obj.data)
    for (let index of this.columnsNames) {
      this.data.set(index, obj.data[index])
    }
  }

  getValue(index: number): any

  getValue(index: string): any

  getValue(index: any): any {

    if (typeof index === 'number') {
      if (this.data.get(this.columnsNames[index]) !== undefined) {
        return this.data.get(this.columnsNames[index])
      } else {
        throw new Error(`The column ${this.columnsNames[index]} isnt in this row`)
      }
    }
    if (this.data.get(index) !== undefined) {
      return this.data.get(index)
    } else {
      throw new Error(`The column ${this.columnsNames[index]} isnt in this row`)
    }
  }
}

type RowParams = {
  id: string
  data: {
    [key: string]: any
  }
}