/*jshint esversion: 6 */
'use strict';

const StateEnum = Object.freeze({"None": 0, "Empty": 1, "Fill": 2})

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
                    State: StateEnum.None
                    //GroupIndex: -1
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
        const row = this._getRow(i);

        const solvedCells = this._trySolve(rowInfo, row);

        this._setSolvedCellsInRow(i, solvedCells);
    }

    _solveColumn(i){
        const columnInfo = this.ColumnsInfo[i];
        const column = this._getColumn(i);

        const solvedCells = this._trySolve(columnInfo, column);

        this._setSolvedCellsInColumn(i, solvedCells);
    }

    _getRow(i){
        return [...this.Cells[i]];
    }
    _setSolvedCellsInRow(rowNum, solvedRow){
        const row = this.Cells[rowNum];

        for(let i = 0; i < row.length; i++){
            if(solvedRow[i] === true){
                row[i].State = StateEnum.Fill;
            }
        }
    }

    _getColumn(i){
        return this.Cells.map(row => row[i]);
    }
    _setSolvedCellsInColumn(columnNum, solvedColumn){
        for(let i = 0; i < solvedColumn.length; i++){
            if(solvedColumn[i] === true){
                this.Cells[i][columnNum].State = StateEnum.Fill;
            }
        }
    }

    _trySolve(groups, cells){

        const reverseGroups = [...groups].reverse();
        const reverseCells = [...cells].reverse();

        const leftSide = this._getSideCells(groups, cells);
        const rightSide = this._getSideCells(reverseGroups, reverseCells).reverse();

        const ln = cells.length;
        const result = new Array(ln);

        for(let i = 0; i < cells.length; i++){
            if(leftSide[i] == null || rightSide[i] == null){
                continue;
            }
            result[i] = leftSide[i] === rightSide[i];
        }

        return result;
    }

    _getSideCells(groups, cells){
        let index = 0;
        const side = new Array(cells.length);

        for(let i = 0; i < groups.length; i++){
            let group = groups[i];
            index = this._findLeftIndex(group.Count, cells, index);

            for(let j = 0; j < group.Count; j++){
                side[j + index] = group.Index; // set group id
            }

            index += group.Count + 1;
        }

        return side;
    }

    _findLeftIndex(groupLength, cells, fromIndex){

        for(let i = fromIndex; i < cells.length - groupLength + 1; i++){
            
            let founded = true;
            for(let j = 0; j < groupLength; j++){
                if(cells[i + j].State === StateEnum.Empty){
                    founded = false;
                    break;
                }
            }

            // if rigth cell is Fill
            if(founded === true){
                const rigthCell = cells[i + groupLength];
                if(rigthCell && rigthCell.State === StateEnum.Fill)
                    founded = false;
            }

            if(founded === true)
                return i;
        }

        return -1
    }
}