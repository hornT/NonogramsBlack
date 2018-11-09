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

        this._parseColors(lines);
        this._parseGridSize(lines);
        this._parseRows(lines);
        this._parseColumns(lines);
    }

    _parseColors(lines){

        const colorsCount = parseInt(lines[0]);
        lines.splice(0, 1); // Удаляем строку с количеством цветов

        this.Colors = lines.splice(0, colorsCount);
    }

    _parseGridSize(lines){

        const rc = lines[0].split(' ');

        this.RowCount = parseInt(rc[0]);
        this.ColumnCount = parseInt(rc[1]);

        lines.splice(0, 1); // Удаляем строку с размером таблицы
    }

    _parseRows(lines){

        this.RowsInfo = lines
            .splice(0, this.RowCount)
            .map(this._parseCellsInfo.bind(this));
    }

    _parseColumns(lines){

        this.ColumnsInfo = lines
            .splice(0, this.ColumnCount)
            .map(this._parseCellsInfo.bind(this));
    }

    _parseCellsInfo(cellsInfo){

        const s = cellsInfo.split(' ');

        const count = parseInt(s[0]);
        const groups = new Array(count);
        
        for (let i = 0; i < count; i++) {

            let left = i * 4 + 1;
            let groupInfo = s.slice(left, left + 4);

            groups[i] = this._parseGroupInfo(groupInfo);
        }

        const colorBits = groups
            .map(g => g.ColorIndex)
            .filter(onlyUnique)
            .reduce((prev, curr) => prev | (1 << curr), 0);

        return {
            Groups: groups,
            ColorBits: colorBits
        };
    }

    _parseGroupInfo(groupInfo){

        let cellCount = parseInt(groupInfo[0]);
        let r = parseInt(groupInfo[1]);
        let g = parseInt(groupInfo[2]);
        let b = parseInt(groupInfo[3]);
        let hexColor = rgbToHex(r, g, b);

        return {
            Count: cellCount,
            Color: hexColor,
            ColorIndex: this._getColorIndex(hexColor)
        };
    }

    _getColorIndex(hexColor){

        return this.Colors.indexOf(hexColor);
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
                    Info: this.RowsInfo[i].ColorBits & this.ColumnsInfo[j].ColorBits
                }
            }
        }
    }
}