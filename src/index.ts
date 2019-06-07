import Dataframe, { readCsv } from './red-panda'

// let temp = readCsv(`${__dirname}/teste.csv`)
let temp = new Dataframe({
    columnsIds: ['coluna00', 'coluna01', 'id'],
    data: [['00-00', '00-01', '00-02'], ['01-00', '01-01', '01-02'], ['01', '02', '03']],
    id: 'id'
})

console.log(temp.head())