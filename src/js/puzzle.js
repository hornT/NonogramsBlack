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
        let needContinue = false;

        do{
            needContinue = false;

            for (let i = 0; i < this.RowCount; i++) {
                needContinue |= this._solveRow(i);
            }
    
            for (let i = 0; i < this.ColumnCount; i++) {
                needContinue |= this._solveColumn(i);
            }
        } while(needContinue);
    }

    _solveRow(i){
        const rowInfo = this.RowsInfo[i];
        const row = this._getRow(i);

        return this._trySolve(rowInfo, row);
    }
    _solveColumn(i){
        const columnInfo = this.ColumnsInfo[i];
        const column = this._getColumn(i);

        return this._trySolve(columnInfo, column);
    }

    _getRow(i){
        return this.Cells[i];
    }
    _getColumn(i){
        return this.Cells.map(row => row[i]);
    }

    _trySolve(groups, cells){// TODO remove and use _findByTwoSide
        let needContinue = false;

        needContinue |= this._findByTwoSide(groups, cells);

        return needContinue;
    }

    _findByTwoSide(groups, cells){
        let needContinue = false;

        const reverseGroups = [...groups].reverse();
        const reverseCells = [...cells].reverse();

        const leftSide = this._getSideCells(groups, cells);
        const rightSide = this._getSideCells(reverseGroups, reverseCells).reverse();

        const ln = cells.length;

        for(let i = 0; i < ln; i++){
            if(leftSide[i] == null || rightSide[i] == null || cells[i].State !== StateEnum.None){
                continue;
            }

            if(leftSide[i] === rightSide[i]){
                cells[i].State = StateEnum.Fill;
                needContinue = true;
            }
        }

        return needContinue;
    }
    _getSideCells(groups, cells){
        let index = 0;
        const side = new Array(cells.length);

        for(let i = 0; i < groups.length; i++){
            let group = groups[i];
            index = this._findLeftIndex(group.Count, i, cells, index);

            for(let j = 0; j < group.Count; j++){
                side[j + index] = group.Index; // set group id
            }

            index += group.Count + 1;
        }

        return side;
    }
    _findLeftIndex(groupLength, groupNum, cells, fromIndex){

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
                    {
                        founded = false;
                        // make left cell as Empty
                        const leftCell = cells[i];
                        if(leftCell && groupNum === 0){ // TODO
                            leftCell.State = StateEnum.Empty
                        }
                    }
            }

            if(founded === true)
                return i;
        }

        return -1
    }
}