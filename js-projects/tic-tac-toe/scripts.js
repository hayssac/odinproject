let boxes = document.getElementsByClassName("tic-tac-toe_position");

function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return { getName, getSymbol };
}

const TicTacToeDOM = (function() {
    const drawOnBoard = (position, player) => {
        let divToPaint = document.querySelector("[data-position='" + position + "']")
        divToPaint.innerHTML = player.getName()
    }

    const showPopupWinner = (player, won) => {
        if (won) {
            console.log("The winner is: " + player.getName().toUpperCase())
        } else {
            console.log("Nobody won because they are losers lol")
        }
    }

    const repaint = () => {
        document.getElementById("playersForm").reset();
        document.getElementById("playersForm").style.visibility = "visible"    
        Array.from(boxes).forEach(function(box) {
            box.innerHTML ="";
        });

    }

    return {
        drawOnBoard, 
        showPopupWinner,
        repaint
    }
})();

const TicTacToe = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];
    let status = "PROGRESS";

    const getStatus = () => { return status }

    const setStatus = (st) => { status = st }

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        setStatus("PROGRESS");
    }

    const playOnBoard = (position, player) => {
        if (getStatus() == "FINISHED") {
            console.log("This game is over")
        } else {
            if (board[position] == "" && getStatus() == "PROGRESS") {            
                board[position] = player.getSymbol()
                if (verifyWin(player.getSymbol())) {
                    setStatus("FINISHED")
                    return "WIN";
                } else {
                    if (isBoardFull()) {
                        setStatus("FINISHED")
                        return "TIE";
                    } else {
                        return "CONTINUE";
                    }
                }
            } else if (board[position] != "" && getStatus() == "PROGRESS") {
                if (!isBoardFull()) {
                    return "INVALID";  
                } 
            } else {
                return "ENDED";
            }
        }
    }

    const isBoardFull = () => {
        return board.every(item => item !== "");
    }

    const verifyWin = (symbol) => {
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
        playOnBoard,
        reset
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
    form.style.visibility = "hidden";
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
    if (turn == "WIN") {
        TicTacToeDOM.drawOnBoard(position, window.currentPlayer)
        TicTacToeDOM.showPopupWinner(window.currentPlayer, true)

    } else if (turn == "CONTINUE") {
        console.log("Another player continues")
        TicTacToeDOM.drawOnBoard(position, window.currentPlayer)
        if (window.currentPlayer == window.player1) {
            window.currentPlayer = window.player2
        } else {
            window.currentPlayer = window.player1
        }
    } else if (turn == "INVALID") {
        console.log("This is an invalid move")
    } else if (turn == "TIE") {
        TicTacToeDOM.drawOnBoard(position, window.currentPlayer)
        TicTacToeDOM.showPopupWinner(window.currentPlayer, false)
    } else if (turn == "ENDED") {
        console.log("Game finished with no conditions of winning")

    }
}


Array.from(boxes).forEach(function(box) {
    box.addEventListener("click", markBoard);
});
