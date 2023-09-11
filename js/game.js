const key = {
  keyDown: {},
  keyValue: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    88: 'attack',
  },
};

const bulletComProp = {
  launch: false,
  arr: [],
};

const gameBackground = {
  gameBox: document.querySelector('.game'),
};

const gameProp = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
};

const renderGame = () => {
  hero.keyMotion();
  setGameBackground();

  bulletComProp.arr.forEach((v, i) => {
    v.moveBullet();
  });
  window.requestAnimationFrame(renderGame);
};

const setGameBackground = () => {
  let parallaxValue = (hero.movex - gameProp.screenWidth / 3) * -1;
  let result = Math.min(0, parallaxValue);
  gameBackground.gameBox.style.transform = `translateX(${result}px)`;
};

const windowEvent = () => {
  window.addEventListener('keydown', (e) => {
    key.keyDown[key.keyValue[e.which]] = true;
  });

  window.addEventListener('keyup', (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });
};

const loadImg = () => {
  const preLoadImgSrc = ['../lib/images/ninja_attack.png', '../lib/images/ninja_run.png'];
  preLoadImgSrc.forEach((v) => {
    const img = new Image();
    img.src = v;
  });

  window.addEventListener('resize', (e) => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHeight = window.innerHeight;
  });
};

let hero;
const init = () => {
  hero = new Hero('.hero');
  loadImg();
  windowEvent();
  renderGame();
};

window.onload = () => {
  init();
};
