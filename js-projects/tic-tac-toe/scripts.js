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

const board = ["", "", "", "", "", "", "", ""]

function createPlayer(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.getSymbol = () => symbol;
    this.getName = () => name;
}

function ticTacToe() {
    this.board = board;
    const getBoard = () => board;
    const playOnBoard = (position, player) => {
        board[position] = player.getSymbol();
    }
    const verifyResults = (wantedSymbol, testPosition) => {
        if (testHorizontalWinner(0) || testHorizontalWinner(3) || testHorizontalWinner(6)) {
            return true;
        } else if (testVerticalWinner(0) || testVerticalWinner(1) || testVerticalWinner(3)) {
            return true;
        } else if (testCrossWinner(0)) {
            return true
        } else if (testCrossInverseWinner(2)) {
            return true;
        }
        return false
    }
    const testHorizontalWinner =  (position) => {
        return board[position + 1] == board[position + 2]
    }
    const testCrossInverseWinner = (position) => {
        return board[position + 2] == board[position + 4]
    }
    const testVerticalWinner = (position) => {
        return board[position + 3] == board[position + 6]
    }
    const testCrossWinner = (position) => {
        return board[position + 4] == board[position + 8]
    }
}
