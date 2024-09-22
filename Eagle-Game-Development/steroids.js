class FireBall {
    constructor(ctx){
        this.ctx = ctx;
        this.width = 500;
        this.height = 500;
        this.shrinkRate = 0.1; 
        this.shrinkWidth = this.width * this.shrinkRate;
        this.shrinkHeight = this.height * this.shrinkRate;
        
        this.spriteX = this.ctx.canvas.width;
        this.spriteY = Math.random() * (this.ctx.canvas.height - this.shrinkHeight);

        this.speed = Math.random() * 7 + 2;
        this.gameEndCount = 0;
        this.image = new Image();
        this.image.src = "./fireball.png";

        this.image.onload = () => {
            this.update(0); // Optional initial drawing
        };
        this.audio = new Audio();
        this.audio.src = './loseSound.wav';
    }

    update(gameStats, rocket) {
        // Move fireball leftwards
        if (this.spriteX > -this.shrinkWidth) {
            this.spriteX -= this.speed; 
        } else {
            gameStats.score++;
            this.spriteX = this.ctx.canvas.width;
            this.spriteY = Math.random() * (this.ctx.canvas.height - this.shrinkHeight);
        }
        
        if (this.checkCollision(rocket)) {
            this.audio.play();
            gameStats.gameEnd = true; 
        }
        this.#draw(); 
    }

    #draw() {
        this.ctx.drawImage(this.image, this.spriteX, this.spriteY, this.shrinkWidth, this.shrinkHeight);
    }

    // Collision detection between fireball and rocket
    checkCollision(rocket) {
        return (
            this.spriteX < rocket.spriteX + rocket.shrinkWidth &&
            this.spriteX + this.shrinkWidth > rocket.spriteX &&
            this.spriteY < rocket.spriteY + rocket.shrinkHeight &&
            this.spriteY + this.shrinkHeight > rocket.spriteY
        );
    }
}
export default FireBall;
