import Dataframe, { readCsv } from './red-panda'

console.log(readCsv(`${__dirname}/teste.csv`).getSerie("Data_value").head())