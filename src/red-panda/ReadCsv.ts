import { readFileSync } from 'fs'
import Dataframe from '.';
const csvjson = require("csvjson")

export default function readCsv(path: string, mode?: string): Dataframe {
    let columnsNames: Array<string> = []
    const file = readFileSync(path, mode || 'utf8')
    let data: Array<Array<any>> = []
    const json = csvjson.toColumnArray(file, {
        delimiter: ',',
        quote: '"'
    })
    columnsNames = Object.keys(json)
    for (let index = 0; index < columnsNames.length; index++) {
        data.push(json[columnsNames[index]])
    }
    return new Dataframe({
        columnsNames,
        data
    })
}