var gamemap = document.getElementById("gamemap");
var playerX = 0;
var playerY = 0;
var goalAmount = 0;
var levels = [tileMap01, tileMap02, tileMap03];
var level = 0;
var temp = "E";

document.addEventListener("keydown", function (e) {

    switch (e.key) {
        case "ArrowRight":
            tryMove(0, 1);
            break;

        case "ArrowLeft":
            tryMove(0, -1);
            break;

        case "ArrowDown":
            tryMove(1, 0);
            break;

        case "ArrowUp":
            tryMove(-1, 0);
            break;
    }

}, false);

function move(y, x) {
    document.getElementById(`${playerY},${playerX}`).className = temp;
    playerX += x;
    playerY += y;
    temp = document.getElementById(`${playerY},${playerX}`).className;
    document.getElementById(`${playerY},${playerX}`).className = "P";
    checkIfWin();
}

buildMap(level);

function buildMap(currentLevel){
    var map = levels[currentLevel].mapGrid;
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[i].length; j++) {
            let element = document.createElement("div");
            if (map[i][j] == " ") { gamemap.appendChild(element).className = "E"; }
            else if(map[i][j] == "P"){
                playerY = i;
                playerX = j;
                gamemap.appendChild(element).className = map[i][j];
            }
            else { gamemap.appendChild(element).className = map[i][j]; }
            gamemap.appendChild(element).id = `${i},${j}`;
        }
    }
    
    goalAmount = document.getElementsByClassName("G").length
}



function tryMove(y, x) {
    var positionCheck = document.getElementById(`${playerY + y},${playerX + x}`);
    if (positionCheck.className == "E") {
        move(y, x);
    }
    else if (positionCheck.className == "B") {
        checkBox(playerY + y, playerX + x, y, x);
    }
    else if (positionCheck.className == "BG") {
        checkBoxOnGoal(playerY + y, playerX + x, y, x);
    }
    else if (positionCheck.className == "G") {
        move(y, x);
    }
}

function checkBox(posY, posX, y, x) {
    var positionCheck = document.getElementById(`${posY + y},${posX + x}`);
    if (positionCheck.className == "E") {
        moveBox(posY, posX, y, x, "E", "B");
    }
    else if (positionCheck.className == "G") {
        moveBox(posY, posX, y, x, "E", "BG");
    }
}

function checkBoxOnGoal(posY, posX, y, x) {
    var positionCheck = document.getElementById(`${posY + y},${posX + x}`);
    if (positionCheck.className == "E") {
        moveBox(posY, posX, y, x, "G", "B");
    }
    else if (positionCheck.className == "G") {
        moveBox(posY, posX, y, x, "G", "BG");
    }
}

function checkIfWin() {
    if (goalAmount == document.getElementsByClassName("BG").length) {
        if(level < levels.length - 1){
            setTimeout(function () {
                level++;
                gamemap.innerHTML = "";
                buildMap(level);
            }, 100);
        }
        else{
            setTimeout(function () {
                alert("Du vann");
                gamemap.innerHTML = "Ctrl + R om du vill börja om";
            }, 100);
        }
    }
}

function moveBox(posY, posX, y, x, current, movePos) {
    document.getElementById(`${posY},${posX}`).className = current;
    posX += x;
    posY += y;
    document.getElementById(`${posY},${posX}`).className = movePos;
    move(y, x);
}


