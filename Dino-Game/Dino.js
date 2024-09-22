class Dino {
    constructor(canvasContext, controls) {
        this.ctx = canvasContext;
        this.controls = controls;
        this.actualwidth = 499; 
        this.actualheight = 499; 
        this.shrinkHeight = this.actualheight * 0.73;
        this.shrinkWidth = this.actualwidth * 0.4;
        this.groundY = 315; 
        this.xPosition = 0; 
        // Dino Jumping
        this.jumpHeight = 300; 
        this.isJumping = false; 
        this.jumpSpeed = 12; 
        this.fallSpeed = 5; 
        this.jumpStartY = this.groundY; 
        
        this.image = new Image();
        this.image.src = "./Images/Dino.png";
        this.image.onload = () => {
            console.log("Dino image loaded.");
        };
        
    }

    update() {
        if (this.controls.up && !this.isJumping) {
            this.isJumping = true;
            this.jumpStartY = this.groundY; 
        }

        if (this.isJumping) {
            this.jump();
        }
        this.#draw();
    }

    jump() {
        if (this.groundY > this.jumpStartY - this.jumpHeight) {
            this.groundY -= this.jumpSpeed; 
        } else {
            while (this.groundY < this.jumpStartY) {
                this.groundY += this.fallSpeed; 

                if (this.groundY >= this.jumpStartY) {
                    this.groundY = this.jumpStartY; 
                    this.isJumping = false; 
                    break; 
                }
    }
    console.log(this.groundY);
        }
    }
    #draw() {
        this.ctx.drawImage(this.image, this.xPosition, this.groundY, this.shrinkWidth, this.shrinkHeight);
    }
}
export default Dino;
