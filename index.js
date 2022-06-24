var nome1 = window.prompt("Nome do Player 1: ")
if (!nome1) nome1 = "Player 1"

var nome2 = window.prompt("Nome do Player 2: ")   
if (!nome2) nome2 = "Player 2"

document.getElementById("player1").innerHTML = nome1
document.getElementById("player2").innerHTML = nome2

var grid = new Array(3);     
for (var i = 0; i < 3; i++) {
    grid[i] = new Array(3);    
    for (var j = 0; j < 3; j++){
        grid[i][j] = 0
    }   
}

//Logic functions
//0 = vazio
//1 = bolinha
//2 = X

function getIndex2d(x,y){
    return (x + 3 *  y) + 1;
}

function getIndex(casa){
    casa -= 1
    var y = Math.floor(casa / 3)
    var x = casa - (y * 3)

    return [y,x]
}

function setCasa(casa, valor){

    var pos = getIndex(casa)
    var x = pos[0],
        y = pos[1];

    grid[x][y] = valor

    console.log(grid)
}

function randomRange(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

PLAYER_BOLINHA = 1
PLAYER_X = 2

var playerVez = [PLAYER_BOLINHA, PLAYER_X][randomRange(0,1)]
var winned = false;

var player1 = 0
var player2 = 0

var jogadas = 0

function resetGame(){
    playerVez = [PLAYER_BOLINHA, PLAYER_X][randomRange(0,1)]
    for (var i = 0; i < 3; i++) {  
        for (var j = 0; j < 3; j++){
            grid[i][j] = 0
        }   
    }
    
    clearBoard()
    showCurrentPlayer(playerVez)
    winned = false
    jogadas = 0
}

function resetPlacar(){
    player1 = 0
    player2 = 0
    updateScore(player1, player2)
}

function clickCasa(casa){
    if (jogadas == 9)
        return

    if (winned)
        return

    var pos = getIndex(casa)
    var x = pos[0],
        y = pos[1];

    if (grid[x][y] == 1 || grid[x][y] == 2)
        return


    switch (playerVez){
        case PLAYER_BOLINHA:
            addBolinha(casa)
            setCasa(casa, PLAYER_BOLINHA)
            break
        case PLAYER_X:
            addX(casa)
            setCasa(casa, PLAYER_X)
            break
        default:
            break
    }

    var win = checkWinner()
    if (win){
        winned = true
        if (playerVez == PLAYER_BOLINHA)
            player1++
        else if (playerVez == PLAYER_X)
            player2++
        
        updateScore(player1,player2)

        alert(win)
    }

    playerVez = (playerVez == PLAYER_BOLINHA) ? PLAYER_X : PLAYER_BOLINHA
    showCurrentPlayer(playerVez)

    jogadas++
    if (jogadas == 9)
        alert("O jogo empatou!")
}

var vencedorCor = "#FF0000"

function setVencedorColor(value){
    if (value == PLAYER_BOLINHA)
        vencedorCor = "#0000FF"
    else if (value == PLAYER_X)
        vencedorCor = "#FF0000"
}

function checkWinner(){

    //Check for horizontal win
    // X X X
    for (var i = 0; i < 3; i++){
        var equal = true
        var value = grid[i][0]

        for (var j = 0; j < 3; j++){
            if (grid[i][j] != value){
                equal = false
                break;
            }
        }

        if (equal && value != 0){
            setVencedorColor(value)
            mudarCor(0, i)
            mudarCor(1, i)
            mudarCor(2, i)
            return ((value == 1) ? "Player 1 " : " Player 2") + " ganhou o jogo!"
        }
            
    }

    //Check for vertical win
    // X 0 0
    // X 0 0
    // X 0 0
    for (var i = 0; i < 3; i++){
        var equal = true
        var value = grid[0][i]

        for (var j = 0; j < 3; j++){
            if (grid[j][i] != value){
                equal = false
                break;
            }
        }

        if (equal && value != 0){
            setVencedorColor(value)
            mudarCor(i, 0)
            mudarCor(i, 1)
            mudarCor(i, 2)
            return ((value == 1) ? "Player 1 " : " Player 2") + " ganhou o jogo!"
        }
            
    }


    //Check diagonal win
    // X 0 X
    // 0 X 0
    // X 0 X

    //First diagonal
    var value = grid[0][0]
    
    if (value != 0 && grid[1][1] == value && grid[2][2] == value){
        setVencedorColor(value)
        mudarCor(0, 0)
        mudarCor(1, 1)
        mudarCor(2, 2)
        return ((value == 1) ? "Player 1 " : " Player 2") + " ganhou o jogo!" 
    }
        

    value = grid[2][0]

    if (value != 0 && grid[1][1] == value && grid[0][2] == value){
        setVencedorColor(value)
        mudarCor(2, 0)
        mudarCor(1, 1)
        mudarCor(0, 2)
        return ((value == 1) ? "Player 1 " : " Player 2") + " ganhou o jogo!" 
    }
    
}

//Graphic functions 
function updateScore(player1, player2){
    var s1 = document.getElementById("score1");
    var s2 = document.getElementById("score2");
    s1.innerHTML = player1
    s2.innerHTML = player2
}

function showCurrentPlayer(player){
    var c = document.getElementById("casa10");
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);

    if (player == PLAYER_BOLINHA)
        addBolinha(10, "#0000FF")
    else
        addX(10, "#FF0000")
}

function mudarCor(gridX, gridY){

    var casa = getIndex2d(gridX, gridY)
    
    //console.log(casa, gridX, gridY)
    var c = document.getElementById("casa" + casa);
    
    var ctx = c.getContext("2d");

    ctx.strokeStyle = vencedorCor


    ctx.stroke();
    
}

function addBolinha(casa, cor = "#000000"){
    var c = document.getElementById("casa" + casa);
    
    var ctx = c.getContext("2d");

    ctx.lineWidth = 10;
    ctx.strokeStyle = cor

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.stroke();

    
}

function addX(casa, cor = "#000000"){
    var c = document.getElementById("casa" + casa);

    var ctx = c.getContext("2d");
    ctx.lineWidth = 10;
    ctx.strokeStyle = cor
    var x = 100
    var y = 100
    ctx.beginPath();

    ctx.moveTo(x - 50, y - 50);
    ctx.lineTo(x + 50, y + 50);

    ctx.moveTo(x + 50, y - 50);
    ctx.lineTo(x - 50, y + 50);
    ctx.stroke();
}

function clearBoard(){
    for(var i = 1; i < 10; i++){
        var c = document.getElementById("casa" + i);
        var ctx = c.getContext("2d");

        ctx.clearRect(0, 0, c.width, c.height);
    }
}

showCurrentPlayer(playerVez)