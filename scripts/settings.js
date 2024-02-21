const bg = {
    day: loadImage("../assets/background-day.png"),
    night: loadImage("../assets/background-night.png"),
    length: 2
};
const bird = {
    idle: {
        blue: [
            loadImage("../assets/bluebird-downflap.png"),
            loadImage("../assets/bluebird-midflap.png"),
            loadImage("../assets/bluebird-upflap.png")
        ],
        red: [
            loadImage("../assets/redbird-downflap.png"),
            loadImage("../assets/redbird-midflap.png"),
            loadImage("../assets/redbird-upflap.png")
        ],
        yellow: [
            loadImage("../assets/yellowbird-downflap.png"),
            loadImage("../assets/yellowbird-midflap.png"),
            loadImage("../assets/yellowbird-upflap.png")
        ],
    }
}

const pipe = {
    red: [
        loadImage("../assets/pipe-red.png"),
        loadImage("../assets/rotated-pipe-red.png")
    ],
    green: [
        loadImage("../assets/pipe-green.png"),
        loadImage("../assets/rotated-pipe-green.png")
    ]
}

const message = {
    welcome: loadImage("../assets/message.png"),
    gameOver: loadImage("../assets/gameover.png")
}

function random() {
    return Math.random();
}

function randint(start, end) {
    return floor(random() * (end - start));
}

function floor(num) {
    return Math.floor(num);
}

function loadImage(path) {
    const image = new Image();
    image.src   = path;
    return image;
}

export {bg, bird, pipe,message, random, randint, floor};