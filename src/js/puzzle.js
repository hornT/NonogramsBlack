/*jshint esversion: 6 */
'use strict';

class Puzzle{

    // constructor(puzzleText){

    //     //this._parsePuzzle(puzzleText);
    // }

    Solve(){

        this._createEmptyCells();
        this._solve();
    }

    // _parsePuzzle(puzzleText){

    //     const lines = puzzleText
    //         .split('\n')
    //         .map(s => s.replace('\r', ''))
    //         .filter(l => l !== '');

    //     /**
    //      * Format:
    //      * x y size (x - rows count, y - column count)
    //      * x lines - rows description
    //      * y lines - columns description
    //      * 
    //      * Rows and Columns: array of numbers (len block)
    //      */

    //     this._parseGridSize(lines);
    //     this._parseRows(lines);
    //     this._parseColumns(lines);
    // }

    // _parseGridSize(lines){

    //     const rc = lines[0].split(' ');

    //     this.RowCount = parseInt(rc[0]);
    //     this.ColumnCount = parseInt(rc[1]);

    //     lines.splice(0, 1);
    // }

    // _parseRows(lines){

    //     this.RowsInfo = lines
    //         .splice(0, this.RowCount)
    //         .map(this._parseCellsInfo.bind(this));
    // }

    // _parseColumns(lines){

    //     this.ColumnsInfo = lines
    //         .splice(0, this.ColumnCount)
    //         .map(this._parseCellsInfo.bind(this));
    // }

    // _parseCellsInfo(cellsInfo){

    //     const s = cellsInfo.split(' ');

    //     return s.map(function(elem) {
    //         return {
    //             Count: parseInt(elem),
    //             Solve: false
    //         } 
    //       });
    // }

    _createEmptyCells(){

        this.Cells = new Array(this.RowCount);

        for (let i = 0; i < this.RowCount; i++) {
            this.Cells[i] = new Array(this.ColumnCount);

            for (let j = 0; j < this.ColumnCount; j++) {
                this.Cells[i][j] = {
                    Fill: false
                }
            }
        }
    }

    _solve(){
        for (let i = 0; i < this.RowCount; i++) {
            this._solveRow(i);
        }
    }

    _solveRow(i){
        const rowInfo = this.RowsInfo[i];
    }
}