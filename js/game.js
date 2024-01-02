const key = {
  keyDown: {},
  keyValue: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    88: 'attack',
    67: 'slide',
    13: 'enter',
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

const stageInfo = {
  stage: [],
  totalScore: 0,
  monster: [
    { defaultMon: greenMon, bossMon: greenMonBoss },
    { defaultMon: yellowMon, bossMon: yellowMonBoss },
    { defaultMon: pinkMon, bossMon: pinkMonBoss },
  ],
  callPosition: [1000, 5000, 9000],
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

  npcOne.crash();

  bulletComProp.arr.forEach((v, i) => {
    v.moveBullet();
  });
  allMonsterComProp.arr.forEach((v, i) => {
    v.moveMonster();
  });
  stageInfo.stage.clearCheck();
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
    if (key.keyDown['enter']) {
      npcOne.talk();
    }
  });

  window.addEventListener('keyup', (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });

  window.addEventListener('resize', (e) => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHeight = window.innerHeight;
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
let npcOne;

const levelQuest = {
  positionX: 600,
  idleMessage: '<p>큰일이야.. <br>사람들이 좀비로 변했어.. <br><span>대화 Enter</span></p>',
  quest: () => {
    const message = {
      start: '마을에 몬스터가 출몰했어요 <span>레벨을 5이상</span>으로 만들어 힘을 증명하세요',
      ing: '아직 레벨을 달성하지 못했어요',
      suc: '레벨을 달성했구나 힘을줄게!',
      end: '고마워 행운을 빌어!',
    };

    let messageState = '';
    if (!npcOne.questStart) {
      messageState = message.start;
      npcOne.questStart = true;
    } else if (npcOne.questStart && !npcOne.questEnd && hero.level < 5) {
      messageState = message.ing;
    } else if (npcOne.questStart && !npcOne.questEnd && hero.level >= 5) {
      messageState = message.suc;
      npcOne.questEnd = true;
      hero.heroUpgrade(50000);
    } else if (npcOne.questStart && this.questEnd) {
      messageState = message.end;
    }

    let questContent =
      "        <figure class='npc_img'>" +
      "          <img src='./lib/images/npc.png' alt=''>" +
      '        </figure>' +
      '        <p>' +
      `         ${messageState}` +
      '        </p>';
    const modalInner = document.querySelector('.quest_modal .inner_box .quest_talk');
    modalInner.innerHTML = questContent;
  },
};

const init = () => {
  hero = new Hero();
  stageInfo.stage = new Stage();
  npcOne = new Npc(levelQuest);

  loadImg();
  windowEvent();
  renderGame();
};

window.onload = () => {
  init();
};
