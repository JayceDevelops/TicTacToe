let playerOneName = 'Player One';
let playerTwoName = 'Player Two';

let playerOneScore = 0;
let playerTwoScore = 0;

let playerOneNumOfMoves = 0;
let playerTwoNumOfMoves = 0;

let currentPlayer = 0;

function spot(position, element) {
    this.Position = position;
    this.Element = element;
} 

let spots = [];

const mainMenu = document.querySelector('main');
const game = document.querySelector('.game');

const current = document.querySelector('.Current');

const playerOneScoreText = document.querySelector('.playerOneScore');
const playerTwoScoreText = document.querySelector('.playerTwoScore');

const playAgain = document.querySelector('.playAgain');

const beginButton = document.querySelector('.begin');
beginButton.addEventListener("click", () => {

    // Get Players Names
    const nameOne = document.querySelector('#OneName');
    const nameTwo = document.querySelector('#TwoName');

    if (nameOne.value.trim()){
        playerOneName = nameOne.value;
    }

    if (nameTwo.value.trim()){
        playerTwoName = nameTwo.value;
    }

    // Change state to game
    mainMenu.style.display = 'none';

    game.style.display = 'grid';

    // Change Player Names Text
    const playerOneNameText = document.querySelector('.playerOneStats > h2');
    playerOneNameText.textContent = `${playerOneName} :`;

    const playerTwoNameText = document.querySelector('.playerTwoStats > h2');
    playerTwoNameText.textContent = `${playerTwoName} :`;

    // Generate The Board
    generateBoard();
});

const generateBoard = () => {
    const board = document.querySelector('.board');

    for (let i = 1; i < 10; i++){
        const element = document.createElement('div');
        element.className = 'spot';

        element.addEventListener("click", () => {

            if (element.textContent === ''){
                if (currentPlayer === 0){

                    playerOneNumOfMoves += 1;

                    if (playerOneNumOfMoves >= 3){
                        element.textContent = 'X';
                        element.style.color = 'var(--Secondary)';
                        checkWinner();
                    }
                    else {
                        element.textContent = 'X';
                        element.style.color = 'var(--Secondary)';
                    }

                    
                    currentPlayer += 1;
                    current.textContent = 'O Move';
                }
                else {
                    playerTwoNumOfMoves += 1;

                    if (playerTwoNumOfMoves >= 3){
                        element.textContent = 'O';
                        element.style.color = 'var(--Accent)';
                        checkWinner();
                    }
                        else {
                        element.textContent = 'O';
                        element.style.color = 'var(--Accent)';
                    }

                    currentPlayer -= 1;
                    current.textContent = 'X Move';
                }
            }
        });

        let newSpot = new spot(i, element);
        spots.push(newSpot);

        board.appendChild(element);
    }

    const mainMenuButton = document.querySelector('.mainMenu');
    mainMenuButton.addEventListener("click", () => {
        mainMenu.style.display = 'flex';
        
        const nameOne = document.querySelector('#OneName');
        nameOne.value = '';

        const nameTwo = document.querySelector('#TwoName');
        nameTwo.value = '';

        const winner = document.querySelector('.winner');

        playerOneName = 'Player One';
        playerTwoName = 'Player Two';

        playerOneScore = 0;
        playerTwoScore = 0;

        playerOneScoreText.textContent = playerOneScore;
        playerTwoScoreText.textContent = playerTwoScore;

        playerOneNumOfMoves = 0;
        playerTwoNumOfMoves = 0;

        spots = [];

        currentPlayer = 0;
        
        const allSpots = document.querySelectorAll('.spot');
        allSpots.forEach((element) => {
            element.remove();
        });

        winner.textContent = '';
        current.textContent = 'X Move';

        playAgain.style.display = 'none';

        game.style.display = 'none';
    });
}


function checkWinner(){

    const winner = document.querySelector('.winner');

    let winnningSpots = [];

    let letter = 'X';

    let winnerFound = false;
    let tieFound = false;

    if (currentPlayer === 1){
        letter = 'O';
    }

    console.log(spots);
    console.log(spots[2].Element.textContent);

    // Horizontal Check
    if (spots[0].Element.textContent === letter && spots[1].Element.textContent === letter && spots[2].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [0, 1, 2];
    }
    else if (spots[3].Element.textContent === letter && spots[4].Element.textContent === letter && spots[5].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [3, 4, 5];
    }
    else if (spots[6].Element.textContent === letter && spots[7].Element.textContent === letter && spots[8].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [6, 7, 8];
    }

    // Vertical Check
    else if (spots[0].Element.textContent === letter && spots[3].Element.textContent === letter && spots[6].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [0, 3, 6];
    }
    else if (spots[1].Element.textContent === letter && spots[4].Element.textContent === letter && spots[7].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [1, 4, 7];
    }
    else if (spots[2].Element.textContent === letter && spots[5].Element.textContent === letter && spots[8].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [2, 5, 8];
    }

    // Diagonal Check
    else if (spots[0].Element.textContent === letter && spots[4].Element.textContent === letter && spots[8].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [0, 4, 8];
    }
    else if (spots[2].Element.textContent === letter && spots[4].Element.textContent === letter && spots[6].Element.textContent === letter){
        winnerFound = true;
        winnningSpots = [2, 4, 6];
    }

    // Tie Check
    tieFound = true;

    const allSpots = document.querySelectorAll('.spot');
    allSpots.forEach((element) => {
        if (element.textContent === ''){
            tieFound = false;
        }      
    });

    if (winnerFound){

        spots.forEach((element) => {
            element.Element.style.pointerEvents = 'none';
        })

        if (letter === 'X'){
            winner.textContent = `${playerOneName} Won!`;
            playerOneScore += 1;

            winnningSpots.forEach((element) => {
                spots[element].Element.style.backgroundColor = '#E1ECF7';
            });
            
            
            playerOneScoreText.textContent = playerOneScore;
        }
        else {
            winner.textContent = `${playerTwoName} Won!`;
            playerTwoScore += 1;
            
            winnningSpots.forEach((element) => {
                spots[element].Element.style.backgroundColor = '#FBE6DC';
            });

            
            playerTwoScoreText.textContent = playerTwoScore;
        }

        const playAgain = document.querySelector('.playAgain');
        playAgain.style.display = 'inline-block';
        playAgain.addEventListener("click", () => {
            spots = [];

            currentPlayer = 0;

            playerOneNumOfMoves = 0;
            playerTwoNumOfMoves = 0;

            const allSpots = document.querySelectorAll('.spot');
            allSpots.forEach((element) => {
                element.remove();
            });

            winner.textContent = '';
            current.textContent = 'X Move';
            playAgain.style.display = 'none';

            generateBoard();
        });
    }
    else if (winnerFound || tieFound){

        winner.textContent = 'Tie!';

        const playAgain = document.querySelector('.playAgain');
        playAgain.style.display = 'inline-block';
        playAgain.addEventListener("click", () => {
            spots = [];

            currentPlayer = 0;

            playerOneNumOfMoves = 0;
            playerTwoNumOfMoves = 0;

            const allSpots = document.querySelectorAll('.spot');
            allSpots.forEach((element) => {
                element.remove();
            });

            winner.textContent = '';
            current.textContent = 'X Move';

            generateBoard();
        });
    }
};