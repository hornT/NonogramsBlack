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

        return this._findByTwoSide(rowInfo, row);
    }
    _solveColumn(i){
        const columnInfo = this.ColumnsInfo[i];
        const column = this._getColumn(i);

        return this._findByTwoSide(columnInfo, column);
    }

    _getRow(i){
        return this.Cells[i];
    }
    _getColumn(i){
        return this.Cells.map(row => row[i]);
    }  

    _findByTwoSide(groups, cells){
        let needContinue = false;

        const reverseGroups = [...groups].reverse();
        const reverseCells = [...cells].reverse();

        const firstUnsolvedGroup = groups[0]; // TODO
        const firstUnsolvedGroupR = reverseGroups[0]; // TODO
        needContinue |= this._fillPossibleCells(firstUnsolvedGroup, cells);
        needContinue |= this._fillPossibleCells(firstUnsolvedGroupR, reverseCells);

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
    _fillPossibleCells(group, cells){
        let needContinue = false;
        const groupLength = group.Count;

        for(let i = 0; i < cells.length - groupLength + 1; i++){

            if(cells[i].State === StateEnum.Empty){
                continue;
            }

            let fillNext = false;
            for(let j = 0; j < groupLength; j++){
                let cell = cells[i + j];

                if(fillNext === true){
                    if(cell.State !== StateEnum.Fill){
                        cell.State = StateEnum.Fill;
                        needContinue = true;
                    }
                } else if(cell.State === StateEnum.Fill){
                    fillNext = true;
                }

                if(cell.State === StateEnum.Empty){// TODO
                    needContinue = true;

                    for(let k = 0; k < j; k++){
                        cells[i + k].State = StateEnum.Empty;
                    }

                    i = i + j;// TODO check
                    break;
                }
            }

            const rigthCell = cells[i + groupLength];
            if(rigthCell && rigthCell.State === StateEnum.Fill){
                // make left cell as Empty
                const leftCell = cells[i];
                if(leftCell){
                    needContinue = true;
                    leftCell.State = StateEnum.Empty;
                }
            }

            return needContinue;
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
                if(rigthCell && rigthCell.State === StateEnum.Fill){
                    founded = false;
                    // // make left cell as Empty
                    // const leftCell = cells[i];
                    // if(leftCell && groupNum === 0){ // TODO
                    //     leftCell.State = StateEnum.Empty
                    // }
                }
            }

            if(founded === true)
                return i;
        }

        return -1
    }
}