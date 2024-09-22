import Controls from './controls.js'; // Import the Controls class

class Rocket {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 499;
        this.height = 499;
        this.shrinkRate = 0.22; 
        this.shrinkWidth = this.width * this.shrinkRate;
        this.shrinkHeight = this.height * this.shrinkRate;

        this.spriteX = 10; 
        this.spriteY = 300; 

        this.speed = 5; 
        this.image = new Image();
        this.image.src = "./rocket.png";
        
        this.controls = new Controls(); 

        this.image.onload = () => {
            console.log("Image loaded")
            this.update(0); 
        };
    }
    update() {
        this.#move(); 
        this.#draw(); 
    }
    #move() {
        if (this.controls.left) {
            this.spriteX -= this.speed; 
        }
        if (this.controls.right) {
            this.spriteX += this.speed; 
        }
        if (this.controls.up) {
            this.spriteY -= this.speed; 
        }
        if (this.controls.down) {
            this.spriteY += this.speed; 
        }

        this.spriteX = Math.max(0, Math.min(this.spriteX, 1900 - this.shrinkWidth));
        this.spriteY = Math.max(0, Math.min(this.spriteY, 800 - this.shrinkHeight));
    }
    #draw() {
        this.ctx.drawImage(this.image, this.spriteX, this.spriteY, this.shrinkWidth, this.shrinkHeight);
    }
}
export default Rocket;
