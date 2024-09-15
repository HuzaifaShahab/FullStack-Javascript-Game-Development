class Explosion{
    constructor(ctx,x,y){
        this.ctx=ctx;
        this.width=920;
        this.height=259;
        this.frame = 4;
        this.currentFrame = 0;
        this.actualWidth = this.width/this.frame;
        this.actualHeight = this.height;
        this.shrunkRate = 0.5;
        this.shrunkWidth = this.actualWidth * this.shrunkRate;
        this.shrunkHeight = this.actualHeight * this.shrunkRate;
        this.currentTime = 0;
        this.timeInterval = 300;
        this.spriteX = x;
        this.spriteY = y;
        this.speed = Math.random()*10+1; 
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src="./boomm.png";
        this.image.onload = () =>{
             console.log("img loaded!"); 
             this.update(0);
        }
        this.audio = new Audio();
        this.audio.src = 'Attack.wav';
    }

    update(difference){
        this.audio.play();
        if(this.currentTime > this.timeInterval) {
            this.currentTime = 0;
            console.log("Animation Frame Updated, Current Frame:", this.currentFrame);
    
            if (this.currentFrame >= this.frame - 1) {
                this.markedForDeletion = true;
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
export default Explosion;