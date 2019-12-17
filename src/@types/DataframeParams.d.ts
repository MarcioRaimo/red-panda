export interface DataframeParams {
    columnsIds?: Array<string>
    columnId?: string
    rowsIds?: Array<string>
    rowId?: string
    id?: string
    data?: Array<Array<any>>
    axis?: 'column' | 'row'
}