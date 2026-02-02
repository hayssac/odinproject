function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return { getName, getSymbol };
}

const TicTacToe = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = null;
    let status = "PROGRESS";

    const getStatus = () => { return status }

    const setStatus = (st) => { status = st }

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    const playOnBoard = (position, player) => {
        if (getStatus() == "FINISHED") {
            console.log("This game is over")
        } else {
            if (board[position] == "" && getStatus() == "PROGRESS") {            
                board[position] = player.getSymbol()
                if (verifyResults(player.getSymbol())) {
                    drawOnBoard(position, player)
                    console.log(player.getName() + " won the game, game ended")
                    setStatus("FINISHED")
                    callForReset();
                } else {
                    console.log("Another player continues")
                    drawOnBoard(position, player)
                }
                return true;
            } else if (board[position] != "" && getStatus() == "PROGRESS") {
                if (!isBoardFull()) {
                    console.log("This place already has been marked, try another one")
                    return false;  
                } else {
                    console.log("Nobody won because board is full and no combination was done")
                }
          
            } else {
                console.log("Game ended")
                return false;
            }
        }
    }

    const isBoardFull = () => {
        return board.every(item => item !== "");
    }

    const drawOnBoard = (position, player) => {
        let divToPaint = document.querySelector("[data-position='" + position + "'")
        divToPaint.innerHTML = player.getName()
    }

    const callForReset = () => {
        // i have to put a logic here to throw a window with the name of the winner and
        // a call to action to reset
        reset();
        // also maybe a repaint method
        // repaint();
    }

    const verifyResults = (symbol) => {
        if (testHorizontalWinner(0, symbol) || testHorizontalWinner(3, symbol) || testHorizontalWinner(6, symbol)) {
            console.log("horizontal combination", symbol);
            return true;
        } else if (testVerticalWinner(0, symbol) || testVerticalWinner(1, symbol) || testVerticalWinner(3, symbol)) {
            console.log("vertical combination", symbol);
            return true;
        } else if (testCrossWinner(0, symbol)) {
            console.log("cross ", symbol)
            return true
        } else if (testCrossInverseWinner(2, symbol)) {
            console.log("cross inverse ", symbol);
            return true;
        }
        return false
    }
    const testHorizontalWinner =  (position, symbol) => {
        return board[position] == board[position + 1] && board[position] == board[position + 2] && board[position] == symbol
    }
    const testCrossInverseWinner = (position, symbol) => {
        return board[position] == board[position + 2] && board[position] == board[position + 4] && board[position] == symbol
    }
    const testVerticalWinner = (position, symbol) => {
        return board[position] == board[position + 3] && board[position] == board[position + 6] && board[position] == symbol
    }
    const testCrossWinner = (position, symbol) => {
        return board[position] == board[position + 4] && board[position] == board[position + 8] && board[position] == symbol
    }

    return {
        playOnBoard
    }
 
})();

let form = document.getElementById("playersForm"); 
const handleForm = (event) => { 
    event.preventDefault();
    const name1 = new FormData(form).get("firstPlayer");
    const name2 = new FormData(form).get("secondPlayer");
    const player1 = createPlayer(name1, "X");
    const player2 = createPlayer(name2, "O");
    // Hide form
    form.style.display = "none";
    startGame(player1, player2);
}
form.addEventListener("submit", handleForm)

const startGame = (p1, p2) => {
    window.currentPlayer = p1; 
    window.player1 = p1;
    window.player2 = p2
    // how do i enable button?
}

let markBoard = (event) => {
    let position = event.target.getAttribute("data-position");
    let turn = TicTacToe.playOnBoard(position, window.currentPlayer)
    if (turn) {
        if (window.currentPlayer == window.player1) {
            window.currentPlayer = window.player2
        } else {
            window.currentPlayer = window.player1
        }
    }
}

let elements = document.getElementsByClassName("tic-tac-toe_position");

Array.from(elements).forEach(function(element) {
    element.addEventListener("click", markBoard);
});
