//player turn toggle
let playerToggle = true;

//Object to store player 1 vs player 2 moves
const player1 = {

    player: "player1",
    playerPositions:[],
    rowCounts: {},
    cellCounts: {},

    resetCounts: function () {
        this.rowCounts = {};
        this.cellCounts = {};
    }
}

const player2 = {

    player: "player2",
    playerPositions: [],
    rowCounts: {},
    cellCounts: {},

    resetCounts: function () {
        this.rowCounts = {};
        this.cellCounts = {};
    }
}


// Start Game button to display Game board
const gameBoard = (( ) => {

    'use strict';

    //DOM Selector
    const startButton = document.getElementById("start-game"); //Start game button
    const gameBoardContainer = document.querySelector(`div[class="gameboard-container"]`); //Game board container to add the game board into this div
    const tbl = document.createElement("table"); //Create table element used for the game of tictactoe

    //Start game button event handler
    startButton.addEventListener("click", ( ) =>{

        //Insert 3 rows with the classes to identify each row + with each row created create 3 cells with class to identify each cell
        for (let i = 0; i < 3; i++) {

            const tblRow = tbl.insertRow();
            tblRow.classList.add("row" + i, "gameBoardRow");

                for (let j = 0; j < 3; j++) {
                    const tableData = tblRow.insertCell();
                    tableData.classList.add("cell" + j, "gameBoardCell");
                    tableData.innerHTML = "<div class='inputDiv'> </div>";//Additional div inside the cells so that dynamically added text/img/svg does not affect the height of each boxes
                }
        }
        
        tbl.classList.add("gameboard");
        gameBoardContainer.appendChild(tbl);

    }, {once: true});


    //Event handler for td element when clicked
    tbl.addEventListener("click", ( e ) => {

        const tdClicked = e.target.closest("td"); //Select the closest element which is a td
        
        if (!tdClicked) return;

        const inputDiv = tdClicked.firstChild; //Selecting the Div (should be child of td);

        //Edit the content of the input div to have an "x" or an "o"
        gameFunction(tdClicked, inputDiv);
        
    });

}) ( );

const getPositions = (r,t) => {

    const boxParentClassList = r.parentElement.classList;
    const boxParentArray = Array.from(boxParentClassList);
    const rowClicked = boxParentArray[0];

    const boxClassList = r.classList
    const boxClassArray = Array.from(boxClassList);
    const cellClicked = boxClassArray[0];

    if (t === false) {
        let positionArray = [rowClicked, cellClicked];
        player2.playerPositions.push(positionArray);
    } else if (!t === false) {
        let positionArray = [rowClicked, cellClicked];
        player1.playerPositions.push(positionArray);
    }

}

const positionEvaluator = ( e ) => {

    console.log(e);

    const positions = e.playerPositions;

    console.log(positions);

    let rowCounts = e.rowCounts;
    let cellCounts = e.cellCounts;

    e.resetCounts();

    positions.forEach(function(e) {
        rowCounts[e[0]] = (rowCounts[e[0]] || 0)+1;
        cellCounts[e[1]] = (cellCounts[e[1]] || 0)+1;
    });
    
    const rowArray = Object.values(rowCounts);
    console.log(rowArray);
    const cellArray = Object.values(cellCounts);
    console.log(cellArray);
    const winbyRows = rowArray.includes(3);
    const winbyCells = cellArray.includes(3);
    if (winbyRows === true || winbyCells === true) {

        if (e.player == "player1") {
            console.log("player1 win beeetcchhh!");
        } else if (e.player == "player2") {
            console.log("player2 wins hehehe!");
        }

    } else if (rowArray == [1,1,1] && cellArray == [1,1,1]) {

        if (e.player == "player1") {
            console.log("player1 win beeetcchhh!");
        } else if (e.player == "player2") {
            console.log("player2 wins hehehe!");
        }

    } 
    
    else {
        return;
    }

}

const gameEvaluator = ( e ) => {

    console.log(e);

    if (e === true) {

        positionEvaluator(player1);

    } else if (e === false) {

        positionEvaluator(player2);

    }

}


//Move game function out of the iffe module and run it when target is clicked.
const gameFunction = (e,d) => {

    const input = d;
    const tdClicked = e;

    if (playerToggle === false) {

        input.innerHTML = "<i class='far fa-circle'></i>";
        
        getPositions(tdClicked, playerToggle);
        gameEvaluator(false);

        playerToggle = true;
    } else if (playerToggle === true) {

        input.innerHTML = "<i class='fas fa-times'></i>";

        getPositions(tdClicked, playerToggle);
        gameEvaluator(true);

        playerToggle = false;
    }
    
};

//Add logic to toggle between xs and os
//Add function to evaluate winnders and losers
//Add player 1 and player 2