import { readFileSync } from 'fs'
import Dataframe from '.';
const csvjson = require("csvjson")

export default function readCsv(path: string, mode?: string, id?: string): Dataframe {
    let columnsIds: Array<string> = []
    const file = readFileSync(path, mode || 'utf8')
    let data: Array<Array<any>> = []
    const json = csvjson.toColumnArray(file, {
        delimiter: ',',
        quote: '"'
    })
    columnsIds = Object.keys(json)
    for (let index = 0; index < columnsIds.length; index++) {
        data.push(json[columnsIds[index]])
    }
    return new Dataframe({
        id: id || "",
        columnsIds,
        data
    })
}