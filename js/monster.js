class Monster {
  constructor(positionX, hp) {
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'monster_box';
    this.elChildren = document.createElement('div');
    this.elChildren.className = 'monster';
    this.hpNode = document.createElement('div');
    this.hpNode.className = 'hp';
    this.hpValue = hp;
    this.defaultHpValue = hp;
    this.hpInner = document.createElement('span');
    this.positionX = positionX;
    this.progress = 0;

    this.init();
  }

  init() {
    this.hpNode.appendChild(this.hpInner);
    this.el.appendChild(this.hpNode);
    this.el.appendChild(this.elChildren);
    this.parentNode.appendChild(this.el);
    this.el.style.left = this.positionX + 'px';
  }

  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }

  updateHp(index) {
    this.hpValue = Math.max(0, this.hpValue - hero.attackDamage);
    this.progress = (this.hpValue / this.defaultHpValue) * 100;
    this.el.children[0].children[0].style.width = this.progress + '%';

    if (this.hpValue === 0) {
      this.dead(index);
    }
  }

  dead(index) {
    this.el.classList.add('remove');
    setTimeout(() => this.el.remove(), 200);
    allMonsterComProp.arr.splice(index, 1);
  }
}
