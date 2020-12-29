const gameDOM = (function(){

'use strict';

    return {
            gameBoardContainer: document.querySelector(`div[class="gameboard-container"]`),

            startGameButton: document.getElementById("start-game"),

            createSquares: function createSquares( i ) {
                const div = document.createElement("div");
                div.classList.add(i, "square");
                this.gameBoardContainer.appendChild(div);
                return div;
            },

            createGameBoard: function ( ) {
                const divsCreated = [];
                let i = 0;
                const numOfDivs = 9;
                for (i; i < numOfDivs; i++) {

                    divsCreated.push(this.createSquares(i));
                    this.gameBoardContainer.appendChild(divsCreated[i]);

                }
            },

            inputSymbols: function inputSymbols (  ) {
            },
        
            boxClicked: function boxClicked ( e ) {
                const divClicked = e.target;
                if (divClicked.tagName != "DIV") return;
                const divClickedChildren = Array.from(divClicked.children);
                if (divClickedChildren.length != 0) {
                    return;
                } else {
                    if (gameflow.playerTurn === true) {
                        divClicked.innerHTML = "<i class='fas fa-times'></i>";                        
                        gameFunctions.positionEvaluator( e );
                        gameflow.playerTurn = false;
                    } else {
                        divClicked.innerHTML = "<i class='far fa-circle'></i>";
                        gameFunctions.positionEvaluator( e );
                        gameflow.playerTurn = true;
                    }
                }
            },

            // Modal

            //Modal selector
            modal: document.getElementById("myModal"),
            //Modal Win Message to display
            modalMessage: document.querySelector(".winMessage"),
            //close modal
            close: document.getElementsByClassName("close")[0],
    }

}) ( );

const gameFunctions = (function ( ){

    'use strict';

    return {

        player1: {
            player: "player1",
            symbol: "x",
            positions: []
        },

        player2: {
            player: "player2",
            symbol: "o",
            positions: []
        },

        winConditionsObject: {
            winByRows: {
                row1: [0,1,2],
                row2: [3,4,5],
                row3: [6,7,8]
            },
            winByColumns: {
                column1: [0,3,6],
                column2: [1,4,7],
                column3: [2,5,8]
            },
            winDiagonal: {
                diagonal1: [0,4,8],
                diagonal2: [6,4,2]
            }
        },

        checkCondition: function (array, playerArr) {
            console.log(array, playerArr);
            const checkArray = array.every(position => playerArr.includes(position))
            console.log(checkArray);
            return checkArray;
        },

        winEvaluator: function ( playerTurn, divClass, e ) {

            let i = 0;
            let j = 0;
            let numOfConditions = 3;
            let numOfConditionsdiagonal = 2;

            const winByRowConditions = Object.values(this.winConditionsObject.winByRows);
            const winByColumnConditions = Object.values(this.winConditionsObject.winByColumns);
            const winByDiagonalConditions = Object.values(this.winConditionsObject.winDiagonal);

            const playerPositions = playerTurn;

            console.log(playerPositions);
            playerPositions.push(divClass);

            for (i; i < numOfConditions; i++) {
                    
                const checkConditionRows = this.checkCondition(winByRowConditions[i],playerPositions);
                const checkConditionsColumns = this.checkCondition(winByColumnConditions[i],playerPositions);
                
                if (checkConditionRows === true || checkConditionsColumns === true) {
                    
                    gameDOM.modal.style.display = "block";
                    gameDOM.modalMessage.textContent = `${e} wins beetch`;
                    return;
                } else {
                    numOfConditions = 2;
                    for (j; j < numOfConditionsdiagonal; j++) {
                    console.log("checking...");
                    const checkConditiondiagonal = this.checkCondition(winByDiagonalConditions[j],playerPositions);
                    if (checkConditiondiagonal === true) {
                            gameDOM.modal.style.display = "block";
                            gameDOM.modalMessage.textContent = `${e} wins beetch`;
                            return;
                        }
                    }
                    numOfConditions = 3;
                }
            }
        },

        positionEvaluator: function positionEvaluator( e ) {

            const inputDiv = e.target;
            const inputDivClass = parseInt(inputDiv.classList[0]);

            if (gameflow.playerTurn == true) {
                
                this.winEvaluator(this.player1.positions,inputDivClass,"Player 1");

            } else {

                this.winEvaluator(this.player2.positions,inputDivClass,"Player 2");

            }

        }

    }

}) ( );


const gameflow = (function ( ){

    'use strict';

    let playerTurn = true;

    //1. Start game with creating board
    gameDOM.startGameButton.addEventListener("click", ( ) => {
        gameDOM.createGameBoard ( );
    }, {once: true})

    //2. Box clicked --> 1. Change DOM to have correct sign. 2. Save positions of each symbol in arrray 3. Evaluate if win conditions are met.
    gameDOM.gameBoardContainer.addEventListener("click", function ( e ) {

        gameDOM.boxClicked(e);

    })

    return {

        playerTurn: playerTurn
        
    }
    
}) ( );