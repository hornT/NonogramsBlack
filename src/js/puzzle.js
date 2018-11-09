/*jshint esversion: 6 */
'use strict';

class Puzzle{

    constructor(puzzleText){

        this._parsePuzzle(puzzleText);
    }

    _parsePuzzle(puzzleText){

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
    }

    _parseGridSize(lines){

        const rc = lines[0].split(' ');

        this.RowCount = parseInt(rc[0]);
        this.ColumnCount = parseInt(rc[1]);

        lines.splice(0, 1);
    }

    _parseRows(lines){

        this.RowsInfo = lines
            .splice(0, this.RowCount)
            //.map(parseInt);
            .map(this._parseCellsInfo.bind(this));
    }

    _parseColumns(lines){

        this.ColumnsInfo = lines
            .splice(0, this.ColumnCount)
            //.map(parseInt);
            .map(this._parseCellsInfo.bind(this));
    }

    _parseCellsInfo(cellsInfo){

        const s = cellsInfo.split(' ');

        return s.map(x => parseInt(x))
    }

    Solve(){

        this._createEmptyCells();
    }

    _createEmptyCells(){

        this.Cells = new Array(this.RowCount);

        for (let i = 0; i < this.RowCount; i++) {
            this.Cells[i] = new Array(this.ColumnCount);

            for (let j = 0; j < this.ColumnCount; j++) {
                this.Cells[i][j] = {
                    Fill: false
                    //Info: this.RowsInfo[i].ColorBits & this.ColumnsInfo[j].ColorBits
                }
            }
        }
    }
}