import { pipe } from "./settings.js";
import { floor, random, randint } from "./settings.js";

export class Pipe {
    static allPipes = Object.keys(pipe);
    static pipeLength = this.allPipes.length;
    static pipes = [];
    static maxPipeHeight = 200;
    static gap = 150;
    static width = 50;
    static speed = 2;

    constructor(displaySurface) {
        this.displaySurface = displaySurface;
    }

    addPipe() {
        const height = floor(random() * Pipe.maxPipeHeight);
        const pipe_   = pipe[Pipe.allPipes[randint(0, Pipe.pipeLength)]];
        const pipeUp = {
            image: pipe_[1],
            x: this.displaySurface.width,
            y: 0,
            width: Pipe.width,
            height: height
        }
        const pipeDown = {
            image: pipe_[0],
            x: this.displaySurface.width,
            y: Pipe.gap + height,
            width: Pipe.width,
            height: this.displaySurface.height - (Pipe.gap + height),
        }
        Pipe.pipes.push(pipeUp, pipeDown);
    }

    drawPipe(context) {
        for (let pipe_ of Pipe.pipes) {
            context.drawImage(
                pipe_.image, 
                pipe_.x, pipe_.y, 
                pipe_.width, pipe_.height
            );
        }
    }

    updatePipe() {
        for (let i = 0; i < Pipe.pipes.length; i++) {
            const pipe_ = Pipe.pipes[i];
            pipe_.x -= Pipe.speed;
            if (pipe_.x + Pipe.width < 0)
                Pipe.pipes.splice(i--, 1);
        }
        if (Pipe.pipes.length === 0 || Pipe.pipes[Pipe.pipes.length-1].x <= this.displaySurface.width-200)
                this.addPipe();
    }

    getPipes() {
        return Pipe.pipes;
    }

    emptyPipes() {
        Pipe.pipes = [];
    }
}