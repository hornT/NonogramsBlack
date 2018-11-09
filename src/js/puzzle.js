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

        for (let i = 0; i < this.ColumnCount; i++) {
            this._solveColumn(i);
        }
    }

    _solveRow(i){
        const rowInfo = this.RowsInfo[i];
        const row = this.Cells[i];
    }

    _solveColumn(i){
        const columnInfo = this.ColumnsInfo[i];
        const column = this.Cells.map(row => row[i]);
    }
}