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
  npcList.forEach((v) => {
    v.crash();
  });

  bulletComProp.arr.forEach((v) => {
    v.moveBullet();
  });
  allMonsterComProp.arr.forEach((v) => {
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
      npcList.forEach((v) => {
        v.talk();
      });
    }
  });

  window.addEventListener('keyup', (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });

  window.addEventListener('resize', () => {
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

  window.addEventListener('resize', () => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHeight = window.innerHeight;
  });
};

const createMessage = (start, ing, suc, end) => {
  return { start, ing, suc, end };
};

const createLevelQuest = (positionX, idleMessage, level, heroUpgrade) => ({
  positionX,
  idleMessage,
  quest: (npc) => {
    const message = createMessage(
      `마을에 몬스터가 출몰했어요 <span>레벨을 ${level}이상</span>으로 만들어 힘을 증명하세요`,
      '아직 레벨을 달성하지 못했어요',
      '레벨을 달성했구나 힘을줄게!',
      '고마워 행운을 빌어!',
    );

    let messageState = '';
    if (!npc.questStart) {
      messageState = message.start;
      npc.questStart = true;
    } else if (npc.questStart && !npc.questEnd && hero.level < level) {
      messageState = message.ing;
    } else if (npc.questStart && !npc.questEnd && hero.level >= level) {
      messageState = message.suc;
      npc.questEnd = true;
      hero.heroUpgrade(heroUpgrade);
    } else if (npc.questStart && npc.questEnd) {
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
});

let hero;
let npcList = [];

const init = () => {
  hero = new Hero();
  stageInfo.stage = new Stage();
  npcList.push(new Npc(createLevelQuest(600, '<p>큰일이야.. 좀비왕이 부활했어..<span>대화 Enter</span></p>', 5, 5000)));
  npcList.push(
    new Npc(createLevelQuest(1000, '<p>큰일이야2.. 좀비왕이 부활했어..<span>대화 Enter</span></p>', 10, 5000)),
  );
  npcList.push(
    new Npc(createLevelQuest(1300, '<p>큰일이야3.. 좀비왕이 부활했어..<span>대화 Enter</span></p>', 15, 5000)),
  );

  loadImg();
  windowEvent();
  renderGame();
};

window.onload = () => {
  init();
};
