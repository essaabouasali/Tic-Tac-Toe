document.getElementById("playerone").addEventListener("click", playervscomputer)

function playervscomputer(event) {
    event.target.href = "index.html"
}
document.getElementById("playertwo").addEventListener("click", playervsplayer)

function playervsplayer(event) {
    event.target.href = "PlayerVsPlayer.html"
}