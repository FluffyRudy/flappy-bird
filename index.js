import { bg, randint } from "./scripts/settings.js";
import { Bird } from "./scripts/player.js";
import { Pipe } from "./scripts/pipe.js";
import { scores } from "./scripts/settings.js";
import { message } from "./scripts/settings.js";
import { floor } from "./scripts/settings.js";


class Game {
    static gameInstance = null;

    constructor() {
        if (Game.gameInstance) {
            return Game.gameInstance;
        }
        this.canvas    = document.getElementById("canvas");
        this.context   = this.canvas.getContext("2d");
        this.draw      = this.draw.bind(this);
        this.bg        = bg[Object.keys(bg)[randint(0, bg.length)]];
        this.gamestart = false;
        this.gameover  = false;
        this.keyDown   = false;

        this.score = 0;
        this.scoreCells = document.querySelectorAll(".score-cell");
        this.scoreCells[0].src = scores['0'];

        this.player = new Bird(this.canvas);
        this.pipe   = new Pipe(this.canvas);
    
        Game.gameInstance = this;
    }

    draw() {
        this.bg.onload = () => {
            this.context.drawImage(
                this.bg, 0, 0, 
                this.canvas.width, this.canvas.height
            );
        }
        if (!this.gamestart && !this.gameover) {
            this.context.drawImage(
                message.welcome,
                floor(this.canvas.width - message.welcome.width)/2,
                floor(this.canvas.height - message.welcome.height) / 2,
                message.welcome.width,
                message.welcome.height 
            )
        } 
        else if (this.gameover) {
            this.pipe.drawPipe(this.context);
            this.context.drawImage(
                message.gameOver,
                floor(this.canvas.width - message.welcome.width)/2,
                floor(this.canvas.height - message.welcome.height) / 2,
            );
        }
        else {
            this.player.draw(this.context);
            this.player.update();
            this.pipe.updatePipe();
            this.pipe.drawPipe(this.context);
            if (this.detectCollision()) {
                this.gameover = true;
                this.gamestart = false;
            }
            this.handleScoring();
        }
        this.player.draw(this.context);
        requestAnimationFrame(this.draw);
    }

    detectCollision() {
        const allPipes = this.pipe.getPipes();
        if (this.player.posY + this.player.height >= this.canvas.height)
            return true;
        for (let pipe_ of allPipes) {
            if (
                this.player.posX < pipe_.x + pipe_.width &&
                this.player.posX + this.player.width > pipe_.x &&
                this.player.posY < pipe_.y + pipe_.height &&
                this.player.posY + this.player.height > pipe_.y
            ) return true;
        }
        return false;
    }

    handleScoring() {
        const allPipes = this.pipe.getPipes();
        for (let pipe_ of allPipes) {
            if (this.player.posX > pipe_.x + pipe_.width && !pipe_.scoreCounted) {
                this.score++;
                pipe_.scoreCounted = true;
                this.drawScore();
            }            
        }
    }

    drawScore() {
        const strdScore = this.score.toString().split('');
        strdScore.forEach((char, i) => {
            this.scoreCells[i].src = scores[char];
        })
    }
    
    resetAttributes() {
        this.pipe.emptyPipes();
        this.player.resetAttributes();
        this.gamestart = false;
        this.gameover = false;
        this.score = 0;
        [...this.scoreCells].forEach(cell => {
            cell.src = "";
        })
        this.scoreCells[0].src = scores['0'];
    }
}

const game = new Game();
game.draw();

document.addEventListener('keypress', (e) => {
    if (!game.gamestart && (e.code === "Space" || e.key === " ") && !game.gameover) {
        game.gamestart = true;
        game.player.configurePosition();
    }
    else if (!game.keyDown && (e.code === "Space" || e.key === " ") && !game.gameover) {
        game.keyDown = true;
        game.player.flapUp();
    } else if (game.gameover && (e.code === "Space" || e.key === " ")) {
        game.resetAttributes();   
    }
})

document.addEventListener("keyup", (e) => {
    if (e.code === "Space" || e.key === " ") {
        game.keyDown = false;
    }
})