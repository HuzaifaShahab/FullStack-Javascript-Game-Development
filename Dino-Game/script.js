import Ground from "./ground.js";
import Dino from "./Dino.js";
import Controls from "./controls.js";
import Cactus from "./cactus.js";

console.log("Ready for game development.");
const canvas = document.getElementById("drawCanvas");
canvas.width = 1900;
canvas.height = 600;
const canvasContext = canvas.getContext("2d");

// Canvas Background (sky to ground gradient)
const gradient = canvasContext.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "skyblue");
gradient.addColorStop(1, "lightgreen");

const controls = new Controls();
const ground = new Ground(canvasContext); 
const dino = new Dino(canvasContext, controls);
let cacti = []; 

// Game stats to track score and game state
const gameStats = {
    score: 0,
    gameEnd: false
};
function drawScore(){
    canvasContext.beginPath();
    canvasContext.fillStyle = "White";
    canvasContext.fillRect(1480, 20, 170, 50); // Increased fillRect size
    canvasContext.fillStyle = "Red"; // Set fillStyle to Black
    canvasContext.font = "30px Candara"; // Increased font size and changed to Candara
    canvasContext.fillText("Score: ", 1500, 50); // Adjusted position due to larger size
    canvasContext.fillText(gameStats.score, 1600, 50); // Adjusted position for score
}

function checkCollision(dino, cactus) {
    // Dino's bounding box
    const dinoLeft = dino.xPosition;
    console.log("DinoLeft"+dinoLeft);
    const dinoRight = dino.xPosition + dino.shrinkWidth;
    console.log("Dino Right"+dinoRight);
    
    const cactusLeft = cactus.xPosition;
    console.log("Cactus Left"+cactusLeft);
    const cactusRight = cactus.xPosition + cactus.cactusWidth;
    console.log("Cactus Right"+cactusRight);
    // const cactusTop = cactus.groundY;
    // const cactusBottom = cactus.groundY + cactus.cactusHeight;

    if (dinoRight < cactusLeft && dinoLeft < cactusRight) {
            console.log("true");
        return true; 
        }
    return false; 
}

function createCacti() {
    const minGap = 300; 
    const maxGap = 600; 
    const randomGap = Math.random() * (maxGap - minGap) + minGap; 
    console.log(randomGap);
    if (cacti.length === 0 || cacti[cacti.length - 1].xPosition < canvas.width - minGap) {
        const newCactus = new Cactus(canvasContext, canvas.width);
        console.log("LastCactus pass to new Catus"+);
        cacti.push(newCactus);
        lastCactusX += randomGap; 
        console.log("***********************************");
    }
}

// Remove cacti that have gone off-screen
function removeOffScreenCacti() {
    cacti = cacti.filter(cactus => !cactus.isOffScreen());
}

function animate() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    if (gameStats.gameEnd) {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = "Black";
        canvasContext.font = "50px Candara";
        canvasContext.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
        return; 
    }

    ground.update();
    dino.update();
    createCacti();

    // Update and draw each cactus
    for (const cactus of cacti) {
        cactus.update(); 

        if(checkCollision(dino,cacti)){
            gameStats.gameEnd=true;
        }
    }
    removeOffScreenCacti();

    gameStats.score += 1;
    drawScore();

    requestAnimationFrame(animate);
}
animate();
