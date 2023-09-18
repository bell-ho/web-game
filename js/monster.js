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
    this.hpTextNode = document.createTextNode(this.hpValue);
    this.positionX = positionX;
    this.init();
  }

  init() {
    this.hpNode.appendChild(this.hpTextNode);
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

  updateHp() {
    this.hpValue = Math.max(0, this.hpValue - hero.attackDamage);
    this.el.children[0].innerText = this.hpValue;
  }
}
