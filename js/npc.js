class Npc {
  constructor() {
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'npc_box';
    this.npcCrash = false;
    this.talkOn = false;
    this.modal = document.querySelector('.quest_modal');
    this.questStart = false;
    this.questEnd = false;
    this.init();
  }

  init() {
    let npcTalk = '';
    npcTalk += `    <div class='talk_box'>`;
    npcTalk += `      <p>큰일이야.. <br>사람들이 좀비로 변했어.. <br><span>대화 Enter</span></p>`;
    npcTalk += `    </div>`;
    npcTalk += `    <div class='npc'></div>`;
    this.el.innerHTML = npcTalk;
    this.parentNode.appendChild(this.el);
  }

  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }

  crash() {
    this.npcCrash = hero.position().right > this.position().left && hero.position().left < this.position().right;
  }

  talk() {
    if (!this.talkOn && this.npcCrash) {
      this.talkOn = true;
      this.quest();
      this.modal.classList.add('active');
    } else if (this.talkOn) {
      this.talkOn = false;
      this.modal.classList.remove('active');
    }
  }

  quest() {
    const message = {
      start: '마을에 몬스터가 출몰했어요 <span>레벨을 5이상</span>으로 만들어 힘을 증명하세요',
      ing: '아직 레벨을 달성하지 못했어요',
      suc: '레벨을 달성했구나 힘을줄게!',
      end: '고마워 행운을 빌어!',
    };

    let messageState = '';
    if (!this.questStart) {
      messageState = message.start;
      this.questStart = true;
    } else if (this.questStart && !this.questEnd && hero.level < 5) {
      messageState = message.ing;
    } else if (this.questStart && !this.questEnd && hero.level >= 5) {
      messageState = message.suc;
      this.questEnd = true;
      hero.heroUpgrade(50000);
    } else if (this.questStart && this.questEnd) {
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
  }
}
