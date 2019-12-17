import { ColumnParams } from "./ColumnParams";

declare class Column {
    constructor(obj?: ColumnParams)

    /**
     * Return a map of row values
     * @returns {Map<string, any>}
     */
    getData(): Map<string, any>

    /**
     * Calculate mean of row value
     * @returns {number}
     */
    mean(): number

    /**
     * Sum of row values
     * @returns {number}
     */
    sum(): number

    /**
     * Sum this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    add(serie: Column): Column

    /**
     * Subtract this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    sub(serie: Column): Column

    /**
     * Multiply this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    mul(serie: Column): Column

    /**
     * Divide this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    div(serie: Column): Column

    /**
     * Exponential power of this rows values to another
     * @param {Column} serie
     * @returns {Column} New column with the result
     */
    pow(serie: Column, pow: number): Column

    /**
     * Compare less than of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    lt(serie: Column): Column

    /**
     * Compare less than or equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    lte(serie: Column): Column

    /**
     * Compare greater than of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    gt(serie: Column): Column

    /**
     * Compare greater than or equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    gte(serie: Column): Column

    /**
     * Compare not equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    nte(serie: Column): Column

    /**
     * Compare equal of this row values with another
     * @param {Column} serie
     * @returns {Column} New column with the results value by value
     */
    eq(serie: Column): Column

    /**
     * Validate the values for binary operations
     * @param {Column} serie 
     * @returns {boolean}
     */
    private validateForBinaryOperation(serie: Column): boolean
}