/*jshint esversion: 6 */
'use strict';

class Parser{

    constructor(){
        this._pazzle = new Puzzle();
    }

    Parse(puzzleText){
        const lines = puzzleText
            .split('\n')
            .map(s => s.replace('\r', ''))
            .filter(l => l !== '');

        /**
         * Format:
         * x y size (x - rows count, y - column count)
         * x lines - rows description
         * y lines - columns description
         * 
         * Rows and Columns: array of numbers (len block)
         */

        this._parseGridSize(lines);
        this._parseRows(lines);
        this._parseColumns(lines);

        return this._pazzle;
    }

    _parseGridSize(lines){

        const rc = lines[0].split(' ');

        this._pazzle.RowCount = parseInt(rc[0]);
        this._pazzle.ColumnCount = parseInt(rc[1]);

        lines.splice(0, 1);
    }

    _parseRows(lines){

        this._pazzle.RowsInfo = lines
            .splice(0, this._pazzle.RowCount)
            .map(this._parseCellsInfo.bind(this));
    }

    _parseColumns(lines){

        this._pazzle.ColumnsInfo = lines
            .splice(0, this._pazzle.ColumnCount)
            .map(this._parseCellsInfo.bind(this));
    }

    _parseCellsInfo(cellsInfo){

        const s = cellsInfo.split(' ');

        return s.map(function(elem, index) {
            return {
                Count: parseInt(elem),
                Index: index
                //Solve: false
            } 
        });
    }
}