class Raven{
    constructor(ctx,width,height){
        this.ctx=ctx;
        this.width=width;
        this.height=height;
        this.frame = 6;
        this.currentFrame = 0;
        this.actualWidth = 271;
        this.actualHeight = this.height;
        this.shrunkRate = 0.5;
        this.shrunkWidth = this.actualWidth * this.shrunkRate;
        this.shrunkHeight = this.actualHeight * this.shrunkRate;
        this.currentTime = 0;
        this.timeInterval = 300;
        this.spriteX = this.ctx.canvas.width;
        this.spriteY = Math.random()*(this.ctx.canvas.height - this.height);
        this.speed = Math.random()*10+1; 
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src="./raven.png";
        this.image.onload = () =>{
             console.log("img loaded!"); 
             this.update(0);
        }
    }
    update(difference,gameStats){
        if(this.spriteX <= -this.spriteWidth){
            gameStats.gameEnd = true;
        }
        this.spriteX-=this.speed;
        
        if(this.currentTime > this.timeInterval) {
            this.currentTime = 0;
            console.log("Animation Frame Updated, Current Frame:", this.currentFrame);
    
            if (this.currentFrame >= this.frame - 1) {
                this.currentFrame = 0;
            } else {
                this.currentFrame++;
            }
        } else {
            this.currentTime += difference;
            console.log(difference);
            console.log("Updated CurrentTime:", this.currentTime);
        }
        
        this.#draw();
    }
    #draw(){   
        this.ctx.drawImage(
            this.image,
            this.currentFrame * this.actualWidth, 0,
            this.actualWidth, this.height,
            this.spriteX, this.spriteY,
            this.shrunkWidth, this.shrunkHeight
        );  
    }
}
export default Raven;