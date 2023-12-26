class Monster {
  constructor(property, positionX) {
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'monster_box ' + property.name;
    this.elChildren = document.createElement('div');
    this.elChildren.className = 'monster';
    this.hpNode = document.createElement('div');
    this.hpNode.className = 'hp';
    this.hpValue = property.hpValue;
    this.defaultHpValue = property.hpValue;
    this.hpInner = document.createElement('span');
    this.positionX = positionX;
    this.progress = 0;
    this.moveX = 0;
    this.speed = property.speed;
    this.crashDamege = property.crashDamage;
    this.score = property.score;
    this.exp = property.exp;

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
    this.hpValue = Math.max(0, this.hpValue - hero.realDamage);
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
    this.setScore();
    this.setExp();
  }

  moveMonster() {
    if (this.moveX + this.positionX + this.el.offsetWidth + hero.position().left - hero.moveX <= 0) {
      this.moveX = hero.moveX - this.positionX + gameProp.screenWidth - hero.position().left;
    } else {
      this.moveX -= this.speed;
    }
    this.el.style.transform = `translateX(${this.moveX}px)`;
    this.crash();
  }

  crash() {
    let rightDiff = 30;
    let leftDiff = 90;
    if (
      hero.position().right - rightDiff > this.position().left &&
      hero.position().left - leftDiff < this.position().right
    ) {
      hero.updateHp(this.crashDamege);
    }
  }

  setScore() {
    stageInfo.totalScore += this.score;
    document.querySelector('.score_box').innerText = stageInfo.totalScore;
  }

  setExp() {
    hero.updateExp(this.exp);
  }
}
