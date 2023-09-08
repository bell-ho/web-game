const key = {
    keyDown: {},
    keyValue: {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        88: 'attack',
    }
}

const gameProp = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
}

const renderGame = () => {
    hero.keyMotion();
    window.requestAnimationFrame(renderGame);
}

const windowEvent = () => {
    window.addEventListener('keydown', e => {
        key.keyDown[key.keyValue[e.which]] = true;
    });

    window.addEventListener('keyup', e => {
        key.keyDown[key.keyValue[e.which]] = false;
    });
};

const loadImg = () => {
    const preLoadImgSrc = ['../lib/images/ninja_attack.png', '../lib/images/ninja_run.png'];
    preLoadImgSrc.forEach(v => {
        const img = new Image();
        img.src = v;
    });
}

let hero;
const init = () => {
    hero = new Class('.hero');
    loadImg();
    windowEvent();
    renderGame();
};

window.onload = () => {
    init();
};
