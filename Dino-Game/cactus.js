class Cactus {
    constructor(canvasContext, xPosition) {
        this.ctx = canvasContext;
        this.cactusWidth = 424 * 0.3;
        this.cactusHeight = 600 * 0.3;
        this.groundY = 400; // The y-position of the cactus (ground level)
        this.xPosition = xPosition; // Start cactus off-screen to the right
        console.log("X position inside Cactus Class"+xPosition);
        this.speed = 25; // Speed at which the cactus moves to the left

        this.image = new Image();
        this.image.src = "./Images/cactus.png";
        this.image.onload = () => {
            console.log("Cactus image loaded.");
        };
    }

    update() {
        this.xPosition -= this.speed; // Move the cactus to the left
        this.#draw();
    }

    #draw() {
        this.ctx.drawImage(this.image, this.xPosition, this.groundY, this.cactusWidth, this.cactusHeight);
    }

    // Check if the cactus is off-screen
    isOffScreen() {
        console.log("Goes out of screen");
        return this.xPosition + this.cactusWidth < 0; // Returns true if cactus is completely off-screen
    }
}

export default Cactus;
