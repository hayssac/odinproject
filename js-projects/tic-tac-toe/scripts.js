// Roadmap of the code
// 1. Create the board
// we can just designate the board shape with CSS, but make the places as numbers 0 to 8 (9 places)
// each time, alternatively, a player will play as X and the other as O
// 2. Generate items inside with data-cell
// 3. Add click event that will have to know which player is playing
// 3.1. With each click, beyond adding the symbol, testIfTheyCan(),
// 3.2. if they can, testWin()
// 3.2. if there is no winner, changePlayer() 
// 4. Apply conditions to win:
// 4.1. to win, we must have the following places with the same symbol, whatever they are:

const board = ["", "", "", "", "", "", "", "", ""]

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.getSymbol = () => symbol;
    this.getName = () => name;
}

function TicTacToe() {
    this.board = board
    this.status = "PROGRESS"
    this.getBoard = () => board;
    this.playOnBoard = (position, player) => {
        if (board[position] == "" && this.status == "PROGRESS") {            
            board[position] = player.getSymbol()
            if (verifyResults(player.getSymbol())) {
                console.log(player.getName() + " won the game, game ended")
                this.status = "FINISHED"
            } else {
                console.log("Another player continues")
            }

        } else if (board[position] != "" && this.status == "PROGRESS") {
            console.log("This place already has been marked, try another one")
        } else {
            console.log("Game ended")
        }
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
}
