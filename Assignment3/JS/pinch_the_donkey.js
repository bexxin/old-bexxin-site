" use strict";
/*
Pinch The Donkey 

 */

//TODO: Cursor
//add instructions with timeout function to let setupGame

let donkey = document.getElementById("donkey");
let playGameButton = document.getElementById("start");
let resetLvlButton = document.getElementById("new-game");
let resetSpdButton = document.getElementById("reset-speed");
let pauseButton = document.getElementById("pause");
let instructions = document.getElementById('instructions');
//Array of donkey images
const donkeyImages = [
    "images/donkey01.png",
    "images/donkey02.png",
    "images/donkey03.png",
    "images/donkey04.png",
    "images/donkey05.png",
    "images/donkey06.png",
    "images/donkey07.png",
    "images/donkey08.png",
    "images/donkey09.png",
    "images/donkey10.png",
    "images/donkey11.png",
    "images/donkey12.png",
]

window.addEventListener("load", (event) => {
    setTimeout(hideInstructions, 5000);
    setupGame();
})
//Introduction
function hideInstructions(){
    instructions.style.visibility = "hidden";
}

let setupGame = () => {
    
    resetLvlButton.disabled = true;
    resetSpdButton.disabled = true;
    pauseButton.disabled = true;
    donkey.style.visibility = "hidden";
    //start new game
    playGameButton.onclick = startGame;
}


function startGame() {
    instructions.style.visibility = "hidden";
    //Reference objects in game
    let gameScore = document.getElementById("score");
    let gameLevel = document.getElementById("level");
    let paused = false;

    //Sets Game Settings
    gameScore.value = 0;
    gameLevel.value = 1;
    resetLvlButton.disabled = false;
    resetLvlButton.onclick = resetLevel, resetSpeed;
    resetSpdButton.disabled = false;
    resetSpdButton.onclick = resetSpeed;
    pauseButton.disabled = false;
    pauseButton.onclick = pauseResume;

    //show donkey
    donkey.style.visibility = "visible";
    //Move donkey
    let donkeyInterval;
    donkeyInterval = setInterval(moveDonkey, 2500);
    let newLevel;

    function moveDonkey() {
        donkey.style.visibility = "visible";
        
        //Change donkey image randomly
        let newImageIndex = Math.floor(Math.random() * 11)
        let newImageSrc = donkeyImages[newImageIndex];
        donkey.setAttribute("src",newImageSrc);
        //Change size randomly
        let zoomSize = Math.floor(Math.random() * 201)+ 100;
        donkey.setAttribute("zoom",zoomSize+"%");
        //Randomly flip image
        let randomFlip = Math.floor(Math.random()*500);
        if (randomFlip%2===0){
            donkey.style.transform = 'scaleX(-1)';
        }
        console.log(newImageSrc, zoomSize, randomFlip);
        let newPositionLeft = Math.floor(Math.random() * 890);
        let newPositionBottom = Math.floor(Math.random() * 300);
        donkey.style.left = `${newPositionLeft}px`;
        donkey.style.bottom = `${newPositionBottom}px`;

    }

    //increment score when donkey is clicked
    donkey.onclick = scoreUp;

    function scoreUp() {
        donkey.style.visibility = "hidden";
        newValue = parseInt(gameScore.value) + 1;
        gameScore.value = newValue;

        //increment level & speed every 10 points
        if (gameScore.value % 5 == 0) {
            newLevel = parseInt(gameLevel.value) + 1;
            gameLevel.value = newLevel;
            clearInterval(donkeyInterval);
            donkeyInterval = setInterval(moveDonkey, 2800 - (300 * newLevel));
        }
    }

    function resetLevel() {
        gameScore.value = 0;
        gameLevel.value = 1;

    }
    function resetSpeed() {
        clearInterval(donkeyInterval);
        donkeyInterval = setInterval(moveDonkey, 2500);
    }
    function pauseResume() {
        currentLevel = parseInt(gameLevel.value);

        paused = !paused;
        if(paused){
            console.log("paused");
            pauseButton.innerHTML = "RESUME GAME";
            clearInterval(donkeyInterval);
            donkey.style.visibility = "hidden";
            resetLvlButton.disabled = true;
            resetSpdButton.disabled = true;
            playGameButton.disabled = true;
        }else{
            console.log("resumed");
            pauseButton.innerHTML = "PAUSE GAME";
            resetLvlButton.disabled = false;
            resetSpdButton.disabled = false;
            playGameButton.disabled = false;
            donkeyInterval = setInterval(moveDonkey, 2800 - (300 * currentLevel));
        }
    }

}
