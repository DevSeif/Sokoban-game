var gamemap = document.getElementById("gamemap");
var playerX = 10;
var playerY = 11;
var goalAmount = 6;
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

for (i = 0; i < tileMap03.mapGrid.length; i++) {
    for (j = 0; j < tileMap03.mapGrid[i].length; j++) {
        let element = document.createElement("div");
        if (tileMap03.mapGrid[i][j] == " ") { gamemap.appendChild(element).className = "E"; }
        else { gamemap.appendChild(element).className = tileMap03.mapGrid[i][j]; }
        gamemap.appendChild(element).id = `${i},${j}`;
    }
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
    console.log(positionCheck);
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
        setTimeout(function () {
            alert("Du vann");
        }, 100);
    }
}

function moveBox(posY, posX, y, x, current, movePos) {
    document.getElementById(`${posY},${posX}`).className = current;
    posX += x;
    posY += y;
    document.getElementById(`${posY},${posX}`).className = movePos;
    move(y, x);
}


