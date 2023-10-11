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

const allMonsterComProp = {
  arr: [],
};

const jumpProps = {
  launch: false,
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
  gameOver: false,
};

const endGame = () => {
  gameProp.gameOver = true;
  key.keyDown.left = false;
  key.keyDown.right = false;
  document.querySelector('.game_over').classList.add('active');
};

const renderGame = () => {
  hero.keyMotion();
  setGameBackground();
  bulletComProp.arr.forEach((v, i) => {
    v.moveBullet();
  });
  allMonsterComProp.arr.forEach((v, i) => {
    v.moveMonster();
  });
  window.requestAnimationFrame(renderGame);
};

const setGameBackground = () => {
  let parallaxValue = (hero.moveX - gameProp.screenWidth / 3) * -1;
  let result = Math.min(0, parallaxValue);
  gameBackground.gameBox.style.transform = `translateX(${result}px)`;
};

const windowEvent = () => {
  window.addEventListener('keydown', (e) => {
    if (!gameProp.gameOver) {
      key.keyDown[key.keyValue[e.which]] = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });

  // window.addEventListener('resize', (e) => {
  //   gameProp.screenWidth = window.innerWidth;
  //   gameProp.screenHeight = window.innerHeight;
  // });
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
  hero = new Hero();
  allMonsterComProp.arr[1] = new Monster(700, 7770);
  loadImg();
  windowEvent();
  renderGame();
};

window.onload = () => {
  init();
};
