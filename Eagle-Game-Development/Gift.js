class Gift {
    constructor(ctx){
        this.ctx = ctx;
        this.width = 418;
        this.height = 192;
        this.frames = 3;
        this.currentFrame = 0;
        this.actualWidth = this.width / this.frames;
        this.actualHeight = this.height;
        this.shrinkRate = 0.8; 
        this.shrinkWidth = this.actualWidth * this.shrinkRate;
        this.shrinkHeight = this.height * this.shrinkRate;
        this.spriteX = this.ctx.canvas.width;
        this.spriteY = Math.random() * (this.ctx.canvas.height - this.shrinkHeight);
        this.speed = Math.random() * 7 + 6;
        this.currentTime = 0;
        this.timeInterval = 50;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = './Giftt.png';
        this.image.onload = () =>{
        this.update(0);
        }  
        this.audio = new Audio();
        this.audio.src="./bonus.wav";  
     }

     update(difference,rocket,gameStats){ 

        if (this.spriteX > -this.shrinkWidth) {
            this.spriteX -= this.speed; 
        } else {
            this.spriteX = this.ctx.canvas.width;
            this.spriteY = Math.random() * (this.ctx.canvas.height - this.shrinkHeight);
        }
    if(this.checkCollision(rocket,gameStats)){
        // this.audio.play();
        gameStats.score+=10;
         if(this.currentTime > this.timeInterval){
             this.currentTime = 0;
                 if(this.currentFrame >= this.frames -1){
                     this.markedForDeletion = true;
                }else{
                     this.currentFrame++;
            }
         }else{
             this.currentTime += difference;
        }
        this.#draw(); 
    }
    else{
        this.#draw();
    }  
     }

    #draw(){
         this.ctx.drawImage(this.image, this.currentFrame * this.actualWidth,0,this.actualWidth,this.actualHeight,
            this.spriteX,this.spriteY,this.shrinkWidth,this.shrinkHeight);
    }

    checkCollision(rocket) {
        return (
            this.spriteX < rocket.spriteX + rocket.shrinkWidth &&
            this.spriteX + this.shrinkWidth > rocket.spriteX &&
            this.spriteY < rocket.spriteY + rocket.shrinkHeight &&
            this.spriteY + this.shrinkHeight > rocket.spriteY
        );
    }

}
export default Gift;