import { readFileSync } from 'fs'
import Dataframe from '.';
const csvjson = require("csvjson")

export default function readCsv(path: string, mode?: string): Dataframe {
    let columns: Array<string> = []
    const file = readFileSync(path, mode || 'utf8')
    let data: Array<Array<any>> = []
    const json = csvjson.toColumnArray(file, {
        delimiter: ',',
        quote: '"'
    })
    columns = Object.keys(json)
    for (let index = 0; index < columns.length; index++) {
        data.push(json[columns[index]])
    }
    return new Dataframe({
        columns,
        data
    })
}