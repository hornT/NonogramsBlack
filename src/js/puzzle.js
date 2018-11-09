/*jshint esversion: 6 */
'use strict';

class Puzzle{

    Solve(){

        this._createEmptyCells();
        this._solve();
    }

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