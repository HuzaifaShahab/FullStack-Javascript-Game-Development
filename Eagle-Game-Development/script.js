import FireBall from "./steroids.js";
import Rocket from "./eagle.js";
import Gift from "./Gift.js";

console.log("Eagle Game Development");

const canvas = document.getElementById("drawCanvas");
canvas.width = 1900;
canvas.height = 800;
canvas.style.border = "2px solid green";
const canvasCtx = canvas.getContext("2d"); 
const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "skyblue");
gradient.addColorStop(1, "lightgreen");

// const audio = new Audio();
// audio.src="./rocket.wav";
// audio.loop=true;
// audio.play();

let previousInterval = 0;
let currentInterval = 0;
const fireball = [];
const gift = [];
const giftCount = 5;
const fireballCount = 15;
const rocket = new Rocket(canvasCtx); 

const gameStats = {
    score: 0,
    gameEndCount: 0,
    gameEnd: false
};

function createFireBalls(){
    if(fireball.length < fireballCount){
       fireball.push(new FireBall(canvasCtx));
    }
}

function createGifts(){
    if(gift.length < giftCount){
       gift.push(new Gift(canvasCtx));
    }
}

function drawScore(){
    // audio.play();
    canvasCtx.beginPath();
    canvasCtx.fillRect(1480, 20, 170, 50); 
    canvasCtx.fillStyle = "Red"; 
    canvasCtx.font = "30px Candara"; 
    canvasCtx.fillText("Score: ", 1500, 50); 
    canvasCtx.fillText(gameStats.score, 1600, 50); 
}
function drawGameEnd(){
    canvasCtx.beginPath();
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    canvasCtx.fillStyle = "Red";
    canvasCtx.font = "bold 100px Candara";
    canvasCtx.fillText("Better Luck Next Time !",430,canvasCtx.canvas.height/2);
    canvasCtx.fillStyle = "Red";
    canvasCtx.font = "bold 50px Candara";
    canvasCtx.fillText("Your Score : "+gameStats.score,750,500);
}

function animate() {
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(0,0,canvas.width,canvas.height)
    const timestamp = new Date().getTime();
    if(previousInterval === 0){
    previousInterval = timestamp;
    }
    currentInterval = timestamp;
    const difference = currentInterval - previousInterval;
    previousInterval = currentInterval;
    drawScore();   
    createFireBalls();
    createGifts();
    rocket.update(); 

    for(let i = 0; i < fireball.length; i++){
        if(fireball[i].markedForDeletion){
            fireball.splice(i, 1);
        } else {
            fireball[i].update(gameStats,rocket);
        }
    }

    for(let i = 0; i < gift.length; i++){
        if(gift[i].markedForDeletion){
            gift.splice(i, 1);
        } else {
            gift[i].update(difference,rocket,gameStats);
        }
    }
    
    if(gameStats.gameEnd){
        
         drawGameEnd();
    } else {
     requestAnimationFrame(animate);
    }
}

animate();
