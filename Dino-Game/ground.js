class Ground {
    constructor(canvasContext) {
        this.ctx = canvasContext;
        this.width = 600; 
        this.height = 112; 
        this.shrinkWidth = this.width;
        this.shrinkHeight = this.height;
        this.groundY = 500; 
        this.xPosition = 0; 
        this.speed = 25;
        this.image1 = new Image();
        this.image1.src = "./Images/ground.png";
        this.image1.onload = () => {
            console.log("Ground image loaded.");
        };
       
    }
    update() {
        this.xPosition -= this.speed;
        if (this.xPosition <= -this.width) {
            this.xPosition = 0;
        }
        this.#draw();
    }
    #draw() {
        const canvasWidth = this.ctx.canvas.width;
        const numImages = Math.ceil(canvasWidth / this.shrinkWidth) + 1; //Calculating images to be set in frame

        for (let i = 0; i < numImages; i++) {
            let x = this.xPosition + i * this.shrinkWidth;
            this.ctx.drawImage(this.image1, x, this.groundY, this.shrinkWidth, this.shrinkHeight);
        }
    }
}
export default Ground;