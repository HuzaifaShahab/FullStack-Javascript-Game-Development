import Raven from "./raven.js";
import Explosion from "./explosion.js";

const canvas = document.getElementById("testCanvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
let currentInterval = 0;
let previousInterval = 0;
const canvasContext = canvas.getContext("2d");

const gradient = canvasContext.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "lightgreen"); // light red
gradient.addColorStop(1, "skyblue"); // peachy orange


const ravens = [];
const explosions = [];
const ravenCount = 15;
let score=0;
const gameStats ={
    score : 0,
    gameEnd : false
}
window.addEventListener("click" , (e) => {
    for (let raven of ravens){
        if(e.offsetX >= raven.spriteX && e.offsetX <= raven.spriteX + raven.shrunkWidth
             && e.offsetY >= raven.spriteY && e.offsetY <= raven.spriteY+raven.shrunkHeight){
            explosions.push(new Explosion(canvasContext,e.offsetX,e.offsetY));
            gameStats.score++;
            raven.markedForDeletion = true;
           
        }
    }
});
function createRaven(){
    if(ravens.length<ravenCount){
        ravens.push(new Raven(canvasContext,1626,419));
    }
}

function drawScore (){
canvasContext.beginPath();
canvasContext.fillStyle="black";
canvasContext.font = "34px Arial";
canvasContext.fillText(score.toString(),100,100);
}

function animate(){
    const timestamp = new Date().getTime();
     drawScore();
    if(previousInterval === 0){
        previousInterval = timestamp;
    }
    currentInterval = timestamp ;
    const difference = currentInterval - previousInterval ;
    previousInterval = currentInterval;
    canvasContext.clearRect(0,0,canvas.width,canvas.height) ;
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    createRaven();
   
    for(let i=0; i < ravens.length;i++){
        if(ravens[i].markedForDeletion){
            ravens.splice(i,1);
        }else{
            ravens[i].update(difference,gameStats);
        }
    }
    for(let i=0; i < explosions.length;i++){
        if(explosions[i].markedForDeletion){
            explosions.splice(i,1);
        }else{
            explosions[i].update(difference);
        }
    }

    if(gameStats.gameEnd){

    }else{
        requestAnimationFrame(animate);
    }

}
animate();




