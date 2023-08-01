
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

$(document).on("click", ".deleteGame", function(e) {
    $(e.target).closest('button').data('gameid');
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

});

function logar() {
    var model = new Object();
    model.usuario = document.getElementById('ilogin').value;
    model.senha = document.getElementById('isenha').value;

    $.ajax({
        type: 'POST',
        url: window.location.origin + "/Login/Logar",
        data: JSON.stringify(model),
        success: function (data, textStatus) {
            if (data.redirect) {
                // data.redirect contains the string URL to redirect to
                //window.location.href = data.redirect;
            } else {
                // data.form contains the HTML for the replacement form
                //$("#myform").replaceWith(data.form);
            }
        },
        dataType: 'json',
        contentType: "application/json; charset=utf",
    });
}

function cadastro() {
    var model = new Object();
    model.usuario = document.getElementById('loginCadastro').value;
    model.email = document.getElementById('emailCadastro').value;
    model.senha = document.getElementById('senhaCadastro').value;
    model.senhaConfirmacao = document.getElementById('senhaConfirmacao').value;

    $.ajax({
        type: "POST",
        url: window.location.origin + "/Login/Create",
        data: model,
        success: function (data, textStatus) {
            if (data.redirect) {
                // data.redirect contains the string URL to redirect to
                //window.location.href = data.redirect;
            } else {
                // data.form contains the HTML for the replacement form
                //$("#myform").replaceWith(data.form);
            }
        },
        dataType: "json"
    });

    fetch("/cadastro", {
        method: "POST",
        body: Json.stringify({
            usuario: usuario,
            email: email,
            senha: senha,
            senhaConfirmacao: senhaConfirmacao
        }),
        headers: { "content-type": "application/json" }
    })
        .then(async (resp) => {
            console.log('deu certo')

        });
}

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

function listarTabela() {
    var tbody = document.getElementById('tbody');
    tbody.innerText = '';
    for (var i = 0; i < this.game.arrayJogos.length; i++) {
        var tr = tbody.insertRow();

        var td_data = tr.insertCell();
        var td_gameId = tr.insertCell();
        var td_usuario = tr.insertCell();
        var td_winner = tr.insertCell();
        var td_quantMoves = tr.insertCell();
        var td_acoes = tr.insertCell();

        td_data.innerText = this.game.arrayJogos[i].data;
        td_gameId.innerText = this.game.arrayJogos[i].gameId;
        td_usuario.innerText = this.game.arrayJogos[i].usuario;
        td_winner.innerText = this.game.arrayJogos[i].winner;
        td_quantMoves.innerText = this.game.arrayJogos[i].quantMoves;
    }
}

function validarCampos(cadastros) {
    var msg = '';
    if (cadastros.usuario == '') {
        msg += 'Favor informe o nome do usuario \n';
    }
    if (cadastros.email == '') {
        msg += 'Favor informe o email do usuario \n';
    }
    if (cadastros.senha == '') {
        msg += 'Favor informe a senha \n';
    }
    if (cadastros.senhaConfirmacao == '') {
        msg += 'Favor confirme a senha \n';
    }
    if (cadastros.senha != cadastros.senhaConfirmacao) {
        msg += 'Senhas diferentes \n';
    }
    if (msg != '') {
        alert(msg);
        return false;
    }
    return true;
}


