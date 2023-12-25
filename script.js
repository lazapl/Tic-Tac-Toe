const move = document.querySelector(".move");
const squares = document.querySelectorAll(".square");
const zwyciezna = document.querySelector(".zwyciezna")
let currentMove = "X";
let selectedX = [];
let selectedO = [];
let gameOver = false;
let wygrany = null;

squares.forEach((square, index) => {
    square.addEventListener("click", () => {
        if (!gameOver) {
            squareClicked(index);
        }
    });
});

function squareClicked(value) {
    if (!gameOver && !selectedX.includes(value) && !selectedO.includes(value)) {
        const createP = document.createElement("p");
        const clickedSquare = document.querySelector(`.square-${value}`);
        clickedSquare.appendChild(createP);
        createP.innerHTML = currentMove;

        if (currentMove === "X") {
            selectedX.push(value);
        } else {
            selectedO.push(value);
        }

        checkWin();
        switchMove();
    }
}

function switchMove() {
    currentMove = currentMove === "X" ? "O" : "X";
    move.innerHTML = currentMove;
}

const winCombinationsX = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const winCombinationsO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    const winCombinations = currentMove === "X" ? winCombinationsX : winCombinationsO;

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        const selected = currentMove === "X" ? selectedX : selectedO;
        if (selected.includes(a) && selected.includes(b) && selected.includes(c)) {
            wygrany = currentMove;
            zwyciezna.innerHTML = ` ${currentMove} has WON!`;
            gameOver = true;
            disableBoard();
            showWinner();
        }
    }
}

function disableBoard() {
    squares.forEach(square => {
        square.removeEventListener("click", squareClickHandler);
    });
}

function showWinner() {
    zwyciezna.innerHTML = ` ${wygrany} wygrywa!`;
}