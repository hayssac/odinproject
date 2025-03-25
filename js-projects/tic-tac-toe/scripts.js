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
// [0, 1, 2], [0, 4, 8], [0, 3, 6], [3, 4, 5], [6, 7, 8], [2, 5, 8], [1, 4, 7], [2, 4, 6]
