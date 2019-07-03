import Dataframe, { readCsv, Column } from './red-panda'

// let temp = readCsv(`${__dirname}/teste.csv`)

new Column()

let temp = new Dataframe({
    columnsIds: ['coluna00', 'coluna01', 'id'],
    data: [['00-00', '00-01', '00-02'], ['01-00', '01-01', '01-02'], ['01', '02', '03']],
    id: 'id'
})

console.log(temp.getColumn(0))