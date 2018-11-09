/*jshint esversion: 6 */
'use strict';

$(document).ready(function () {
    var dropZone = $('#dropZone');


    if (typeof (window.FileReader) === 'undefined') {
        dropZone.text('Не поддерживается браузером!');
        dropZone.addClass('error');
    }

    dropZone[0].ondragover = function () {
        dropZone.addClass('hover');
        return false;
    };

    dropZone[0].ondragleave = function () {
        dropZone.removeClass('hover');
        return false;
    };

    dropZone[0].ondrop = function (event) {
        event.preventDefault();
        dropZone.removeClass('hover');
        dropZone.addClass('drop');

        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        //reader.onload = onFileLoad;
        reader.onload = function (e) {
            onFileLoad(e, file.name);
        };
        reader.readAsDataURL(file);
    };
});

function log(text) {
    console.log(text);
}

function dropZoneOnClick() {
    $('#fileInput').trigger('click');
}

function fileChange(e) {

    var reader = new FileReader();
    var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    reader.onload = function (e) {
        onFileLoad(e, files[0].name);
    };
    reader.readAsDataURL(files[0]);
}

/**
 * File load
 * @param {any} e
 * @param {any} fileName
 */
function onFileLoad(e, fileName) {

    const data = e.target.result;
    const fileText = atob(data.split(',')[1]);

    const puzzle = new Puzzle(fileText);

    puzzle.Solve();
    drawSolvedPuzzle(puzzle);
}

function drawSolvedPuzzle(puzzle){

    const puzzleContainer = document.querySelector('#solvePuzzle');
    
    puzzleContainer.innerHTML = '';

    const table = document.createElement('table');
    const firstRow = createFirstRow(puzzle);

    table.appendChild(firstRow);

    for (let i = 0; i < puzzle.RowCount; i++) {
        let row = document.createElement('tr');

        const rowInfo = puzzle.RowsInfo[i];
        let cellInfo = createCellInfo(rowInfo);
        row.appendChild(cellInfo);

        for (let j = 0; j < puzzle.ColumnCount; j++){
            let cell = document.createElement('td');
            cell.style.backgroundColor = puzzle.Cells[i][j].Color;
            cell.innerHTML = puzzle.Cells[i][j].Info; // TODO

            row.appendChild(cell);
        }
        
        table.appendChild(row);
    }

    puzzleContainer.appendChild(table);
}

function createFirstRow(puzzle){

    const row = document.createElement('tr');

    const emptyCell = document.createElement('td');
    row.appendChild(emptyCell);

    for (let i = 0; i < puzzle.ColumnCount; i++) {
        
        const columnInfo = puzzle.ColumnsInfo[i];
        let cell = createCellInfo(columnInfo);
        
        row.appendChild(cell);
    }

    return row;
}

function createCellInfo(info){
    const cell = document.createElement('td');
    const span = document.createElement('span');
    
    for(let j = 0; j < info.Groups.length; j++){
        
        let div = document.createElement('div');

        div.innerHTML = info.Groups[j].Count;
        div.style.backgroundColor = info.Groups[j].Color;

        span.appendChild(div);
        
    }

    cell.appendChild(span);

    return cell;
}