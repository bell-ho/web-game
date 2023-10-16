class Hero {
  constructor() {
    this.el = document.querySelector('.hero');
    this.moveX = 0;
    this.speed = 11;
    this.direction = 'right';
    this.attackDamage = 10000;
    this.hpProgress = 0;
    this.hpValue = 100000;
    this.defaultHpValue = this.hpValue;
    this.realDamage = 0;
  }

  keyMotion() {
    if (key.keyDown['left'] || key.keyDown['right']) {
      this.el.classList.add('run');
      if (key.keyDown['left']) {
        this.direction = 'left';
        this.el.classList.add('flip');

        this.moveX = this.moveX <= 0 ? 0 : this.moveX - this.speed;
      } else {
        this.direction = 'right';
        this.el.classList.remove('flip');
        this.moveX = this.moveX + this.speed;
      }
    }

    if (!key.keyDown['left'] && !key.keyDown['right']) {
      this.el.classList.remove('run');
    }

    if (key.keyDown['attack']) {
      if (!bulletComProp.launch) {
        this.el.classList.add('attack');
        bulletComProp.arr.push(new Bullet());
        bulletComProp.launch = true;
      }
    }

    if (!key.keyDown['attack']) {
      this.el.classList.remove('attack');
      bulletComProp.launch = false;
    }

    this.el.parentNode.style.transform = `translateX(${this.moveX}px)`;
  }

  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }

  size() {
    return {
      width: this.el.offsetWidth,
      height: this.el.offsetHeight,
    };
  }

  updateHp(monsterDamage) {
    this.hpValue = Math.max(0, this.hpValue - monsterDamage);
    this.hpProgress = (this.hpValue / this.defaultHpValue) * 100;
    const heroHpBox = document.querySelector('.state_box .hp span');
    heroHpBox.style.width = this.hpProgress + '%';
    this.crash();
    if (this.hpValue === 0) {
      this.dead();
    }
  }

  crash() {
    this.el.classList.add('crash');
    setTimeout(() => this.el.classList.remove('crash'), 400);
  }

  dead() {
    hero.el.classList.add('dead');
    endGame();
  }

  hitDamage() {
    this.realDamage = this.attackDamage - Math.round(Math.random() * this.attackDamage * 0.1);
  }

  heroUpgrade() {
    this.speed += 1.3;
    this.attackDamage += 15000;
  }
}
