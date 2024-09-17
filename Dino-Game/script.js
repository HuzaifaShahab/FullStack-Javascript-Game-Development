import Ground from "./ground.js";
import Dino from "./Dino.js";
import Controls from "./controls.js";
import Cactus from "./cactus.js";

console.log("Ready for game development.");
// Canvas info
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
let lastCactusX = canvas.width; 


function createCacti() {
    const minGap = 300; 
    const maxGap = 600; 
    const randomGap = Math.random() * (maxGap - minGap) + minGap; 

    if (cacti.length === 0 || cacti[cacti.length - 1].xPosition < canvas.width - minGap) {
        const newCactus = new Cactus(canvasContext, lastCactusX);
        cacti.push(newCactus);
        lastCactusX += randomGap; 
    }
}


function removeOffScreenCacti() {
    cacti = cacti.filter(cactus => !cactus.isOffScreen());
}

// Main animation function
function animate() {
    
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    ground.update();
    dino.update();
    createCacti();

    for (const cactus of cacti) {
        cactus.update(); 
    }
    removeOffScreenCacti();

    requestAnimationFrame(animate);
}

animate();
