const ticTacToeGame = new TicTacToeGame();


document.getElementById("startGame").addEventListener("click", StartGame)

function StartGame() {
    document.getElementById("startGame").style.display = "none";
    ticTacToeGame.start();
    document.getElementById("startGame").removeEventListener("click", StartGame);
}
document.getElementById("restartGame").addEventListener("click", ReStartGame)

function ReStartGame() {
    window.location.href = "index.html";
}

var currentplayer = document.getElementById("currentplayer");

function TicTacToeGame() {
    const board = new Board();
    const humanPlayer = new HumanPlayer(board);
    const computerPlayer = new ComputerPlayer(board);
    let turn = 0;

    this.start = function() {

        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.position.forEach(el => observer.observe(el, config));
        takeTurn();
    }

    function takeTurn() {

        let checkwinner = board.checkForWinner();
        if (checkwinner.winner) {

            if (checkwinner.charcter == "X") {
                currentplayer.innerHTML = "Congratualtion You Win!!";
            } else {
                currentplayer.innerHTML = "Hard Luck You Lost!";
            }
            return;
        }
        if (turn % 2 === 0) {
            humanPlayer.takeTurn();
            humanplayed = true;
        } else {

            computerPlayer.takeTurn();
        }
        turn++;
    }
}


function Board() {
    this.position = Array.from(document.querySelectorAll(".col"));

    // 0 1 2
    // 3 4 5
    // 6 7 8
    this.checkForWinner = function() {
        let winner = false;
        let charcter;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];

        const positions = this.position;
        winningCombinations.forEach(el => {
            let pos0 = positions[el[0]].innerText;
            let pos1 = positions[el[1]].innerText;
            let pos2 = positions[el[2]].innerText;
            const iswinningcombo = pos0 != `` &&
                pos0 === pos1 && pos1 === pos2;

            if (iswinningcombo) {
                winner = true;
                charcter = pos0;
                el.forEach(index => {
                    positions[index].style.color = "blue";
                })
            }
        })
        return { winner, charcter };
    }
}

function HumanPlayer(board) {
    this.takeTurn = function() {
        board.position.filter(el => el.innerText == "")
            .forEach(el => el.addEventListener("click", handleTurnTaken));
    }

    function handleTurnTaken(event) {
        event.target.innerText = "X";
        event.target.style.color = "black";
        // event.target.color = "rgb(207, 114, 32)";
        board.position
            .forEach(el => el.removeEventListener("click", handleTurnTaken));
    }

}

function ComputerPlayer(board) {
    this.takeTurn = function() {
        if (board.position.every(el => el.innerHTML == "")) {
            return;
        }
        const availblepostion = board.position
            .filter(el => el.innerText == "");
        const move = Math.floor(Math.random() * availblepostion.length);
        availblepostion[move].innerText = "O";
        availblepostion[move].style.color = "white";
    }
}