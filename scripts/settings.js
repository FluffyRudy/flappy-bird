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

const scores = {
    '0': ("../assets/0.png"),
    '1': ("../assets/1.png"),
    '2': ("../assets/2.png"),
    '3': ("../assets/3.png"),
    '4': ("../assets/4.png"),
    '5': ("../assets/5.png"),
    '6': ("../assets/6.png"),
    '7': ("../assets/7.png"),
    '8': ("../assets/8.png"),
    '9': ("../assets/9.png")
};


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

export {bg, bird, pipe, message, scores, random, randint, floor};