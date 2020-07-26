const ticTacToeGame = new TicTacToeGame();


document.getElementById("startGame").addEventListener("click", StartGame)

function StartGame() {
    console.log("you cliced the bootton");
    ticTacToeGame.start();
    document.getElementById("startGame").removeEventListener("click", StartGame);
}
document.getElementById("restartGame").addEventListener("click", ReStartGame)

function ReStartGame() {
    window.location.href = "PlayerVsPlayer.html";
}

var currentplayer = document.getElementById("currentplayer");

function TicTacToeGame() {
    const board = new Board();
    const playerone = new Playerone(board);
    const playertwo = new Playertwo(board);
    let turn = 0;

    this.start = function() {

        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.position.forEach(el => observer.observe(el, config));
        takeTurn();
    }

    function takeTurn() {

        if (board.checkForWinner()) {
            currentplayer.innerHTML = "Congratualtion You Win!!"
            return;
        }
        if (turn % 2 === 0) {
            currentplayer.innerHTML = "Player 1 is playing"
            playerone.takeTurn();
        } else {
            currentplayer.innerHTML = "Player 2 is playing"
            playertwo.takeTurn();
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
                el.forEach(index => {
                    positions[index].style.color = "blue";
                })
            }
        })
        return winner;
    }
}

function Playerone(board) {
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

function Playertwo(board) {
    this.takeTurn = function() {
        board.position.filter(el => el.innerText == "")
            .forEach(el => el.addEventListener("click", handleTurnTaken));

    }

    function handleTurnTaken(event) {
        event.target.innerText = "O";
        event.target.style.color = "white";
        board.position
            .forEach(el => el.removeEventListener("click", handleTurnTaken));
    }
}