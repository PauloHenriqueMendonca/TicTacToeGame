
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

$(document).on("click", "#restartbtn", restartGame);
$(document).on("click", ".box", boxClicked);
$(document).on("click", ".deleteGame", deleteGame);

function playerWon() {
    for (const condition of winningCombinations) {
        var [a, b, c] = condition;
        if (tabuleiro.spaces[a] && tabuleiro.spaces[a] == tabuleiro.spaces[b] && tabuleiro.spaces[a] == tabuleiro.spaces[c]) {

            return [a, b, c];
        }
    }
    return false;
}

function boxClicked(e) {
    const id = e.target.id;
    if (tabuleiro.bloqueado)
        return;

    if(!tabuleiro.spaces[id]) {
        tabuleiro.spaces[id] = tabuleiro.currentPlayer;
        e.target.innerText = tabuleiro.currentPlayer;
        tabuleiro.quantMoves++;

        var resultOfMove = playerWon();

        if (resultOfMove !== false) {
            resultOfMove.forEach(win => {
                var box = document.getElementById(win);
                box.classList.add("winningboxColor");
            });

            tabuleiro.bloqueado = true;
            game.winner = tabuleiro.currentPlayer;
            salvarGame();
            return;
        }

        tabuleiro.currentPlayer = tabuleiro.currentPlayer == X_Player ? O_Player : X_Player;
        if (tabuleiro.quantMoves == 9) {
            alert('Draw!');
            salvarGame();

        }
    }
}

function restartGame() {
    tabuleiro.spaces.fill(null);
    tabuleiro.bloqueado = false;
    tabuleiro.currentPlayer = X_Player;
    tabuleiro.quantMoves = 0;

    $('.winningboxColor').removeClass('winningboxColor');
    $('.box').text('');
    $('#savedGame').hide();
}

function lerDados() {
    var jogo = new Object();

    jogo.Date = new Date();
    jogo.UserId = game.userID;
    jogo.Winner = game.winner;
    jogo.QuantMoves = tabuleiro.quantMoves;

    return jogo;
}

function salvarGame() {
    //Montar o modelo
    var model = lerDados();

    //ajax call
    $.ajax({
        type: 'POST',
        url: window.location.origin + "/Home/SaveGame",
        data: JSON.stringify(model),
        //tratar o caminho de sucesso
        success: function (data) {
            if (data.Error) {
                alert(data.ErrorMessage);
            } else {
                $('#savedGame').show();
            }
        },
        dataType: 'json',
        contentType: "application/json; charset=utf",
    });

}

function deleteGame(e) {
    //Montar o modelo
    var gameID = $(e.target).closest('button').data('gameid');

    //ajax call
    $.ajax({
        type: 'POST',
        url: window.location.origin + "/Home/DeleteGame",
        data: {
            gameID: gameID,
        },
        //tratar o caminho de sucesso
        success: function (data) {
            if (data.Error) {
                alert(data.ErrorMessage);
            } else {
                window.location.reload();
            }
        },
    });
}