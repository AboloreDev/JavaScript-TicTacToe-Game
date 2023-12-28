const cellElements = document.querySelectorAll('.cells')
const board = document.getElementById('board');
const winningMessage = document.querySelector('.winning-page');
const winningMessageText = document.querySelector('.winning-message-text');
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const restartBtn = document.getElementById('restart')
let circleTurn;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0 ,3, 6],
    [1, 4, 7],
    [2, 5, 8],
]

// Start the game
startGame()

// Restart button event listener
restartBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true} )
    })   
    setBoardHover()
    winningMessage.classList.remove('show')
}

function handleClick(e) {
    // get cell Target
    const cellTarget = e.target;
    // Get current class whether circle or X
    const currentClass = circleTurn ? CIRCLE_CLASS :  X_CLASS;
    // Place the mark x or o
    placeMark(cellTarget, currentClass);
  
    // check for win
    if(checkForWin(currentClass)) {
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else {
          // switchTurn
        switchTurns()
        // set board hover
        setBoardHover()
    }
}

function placeMark(cellTarget,currentClass) {
    cellTarget.classList.add(currentClass)
}

function switchTurns() {
    circleTurn = !circleTurn
}

function setBoardHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }else {
        board.classList.add(X_CLASS)
    }
}

function checkForWin(currentClass) {
    return winningCombinations.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageText.textContent = 'Draw!'
    }else{
      winningMessageText.textContent = `${circleTurn ? "O's" : "X's"} Wins!`;  
    }
    winningMessage.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS)
        ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

