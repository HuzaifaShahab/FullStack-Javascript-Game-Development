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
        this.jumpHeight = 200; 
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

    // Function to update the Dino's position and behavior
    update() {
        if (this.controls.up && !this.isJumping) {
            // Start the jump if the up arrow key is pressed and Dino is not already jumping
            this.isJumping = true;
            this.jumpStartY = this.groundY; // Store the ground level before the jump
        }

        if (this.isJumping) {
            // Handle jumping up and falling back down
            this.jump();
        }

        // Draw the Dino in its updated position
        this.#draw();
    }

    // Function to handle the jumping logic
    jump() {
        // Move Dino up
        if (this.groundY > this.jumpStartY - this.jumpHeight) {
            this.groundY -= this.jumpSpeed; // Move up by jumpSpeed
        } else {
            while (this.groundY < this.jumpStartY) {
                this.groundY += this.fallSpeed; // Move down by fallSpeed

                if (this.groundY >= this.jumpStartY) {
                    this.groundY = this.jumpStartY; 
                    this.isJumping = false; 
                    break; 
                }
    }
    console.log(this.groundY);
        }
    }

    // Private method to draw the Dino
    #draw() {
        this.ctx.drawImage(this.image, this.xPosition, this.groundY, this.shrinkWidth, this.shrinkHeight);
    }
}

export default Dino;
