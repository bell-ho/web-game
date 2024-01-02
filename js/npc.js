class Npc {
  constructor(property) {
    this.property = property;
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'npc_box';
    this.npcCrash = false;
    this.talkOn = false;
    this.modal = document.querySelector('.quest_modal');
    this.init();
  }

  init() {
    let npcTalk = '';
    npcTalk += `    <div class='talk_box'>`;
    npcTalk += this.property.idleMessage;
    npcTalk += `    </div>`;
    npcTalk += `    <div class='npc'></div>`;
    this.el.innerHTML = npcTalk;
    this.el.style.left = this.property.positionX + 'px';
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
      this.property.quest(this);
      this.modal.classList.add('active');
    } else if (this.talkOn) {
      this.talkOn = false;
      this.modal.classList.remove('active');
    }
  }
}
