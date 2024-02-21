import { bird } from "./settings.js";
import { random, randint, floor } from "./settings.js";

export class Bird {    
    static birdTypes  = Object.keys(bird["idle"]);
    static birdLength = this.birdTypes.length;
    constructor(displaySurface) {
        this.displaySurface = displaySurface;
        this.birdType   = Bird.birdTypes[randint(0, Bird.birdLength)];
        this.birdFrames = bird["idle"][this.birdType];
        this.width  = this.birdFrames[0].width;
        this.height = this.birdFrames[0].height;
        this.posX   = floor((displaySurface.width-this.birdFrames[0].width) / 2)-1;
        this.posY   = floor(displaySurface.height / 2 + this.birdFrames[0].width);
        this.velocity = 0;
        this.lift = -8;
        this.gravity  = 0.4;
        this.frameIndex = 0;
        this.prevTime = Date.now() / 100.0;
    }

    configurePosition() {
        this.posX   = 20;
        this.posY   = floor((this.displaySurface.height - this.birdFrames[0].height) / 2);
    }

    setInitPos() {
        this.posX   = floor((this.displaySurface.width-this.birdFrames[0].width) / 2)-1;
        this.posY   = floor(this.displaySurface.height / 2 + this.birdFrames[0].width);   
    }

    draw(context) {
        const now = Date.now() / 100.0;
        if (now - this.prevTime >= 1) {
            this.frameIndex = (this.frameIndex + 1) % Bird.birdLength;
            this.prevTime = now;
        }
        this.birdFrames[this.frameIndex].onload = () => {
            context.drawImage(this.birdFrames[this.frameIndex], this.posX, this.posY);
        }   
    }
    
    update() {
        this.velocity += this.gravity;
        this.posY += this.velocity;
        if (this.posY < 0)  
            this.posY = 0
        else if (this.posY + this.birdFrames[0].height >= this.displaySurface.height)
            this.posY = this.displaySurface.height- this.birdFrames[0].height;
    }

    flapUp() {
        this.velocity = this.lift;
    }

    resetAttributes() {
        this.setInitPos();
        this.velocity = 0;
        this.frameIndex = 0;
    }
}