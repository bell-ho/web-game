class Hero {
  constructor() {
    this.el = document.querySelector('.hero');
    this.moveX = 0;
    this.speed = 10;
    this.direction = 'right';
    this.attackDamage = 10000;
    this.hpProgress = 0;
    this.hpValue = 100000;
    this.defaultHpValue = this.hpValue;
    this.realDamage = 0;
    this.slideSpeed = 15;
    this.slideTime = 0;
    this.slideMaxTime = 30;
    this.slideDown = false;
    this.level = 1;
    this.exp = 0;
    this.maxExp = 3000;
    this.expProgress = 0;
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

    if (key.keyDown['slide']) {
      if (!this.slideDown) {
        this.el.classList.add('slide');
        if (this.direction === 'right') {
          this.moveX = this.moveX + this.slideSpeed;
        } else {
          this.moveX = this.moveX - this.slideSpeed;
        }

        if (this.slideTime > this.slideMaxTime) {
          this.el.classList.remove('slide');
          this.slideDown = true;
        }
        this.slideTime += 1;
      }
    }

    if (!key.keyDown['slide']) {
      this.el.classList.remove('slide');
      this.slideDown = false;
      this.slideTime = 0;
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

  minusHp(monsterDamage) {
    this.hpValue = Math.max(0, this.hpValue - monsterDamage);

    this.crash();
    if (this.hpValue === 0) {
      this.dead();
    }
    this.renderHp();
  }

  plusHp(hp) {
    this.hpValue = hp;
    this.renderHp();
  }

  renderHp() {
    this.hpProgress = (this.hpValue / this.defaultHpValue) * 100;
    const heroHpBox = document.querySelector('.state_box .hp span');
    heroHpBox.style.width = this.hpProgress + '%';
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
    this.attackDamage += 15000;
  }

  updateExp(exp) {
    this.exp += exp;
    this.expProgress = (this.exp / this.maxExp) * 100;
    document.querySelector('.hero_state .exp span').style.width = this.expProgress + '%';
    if (this.exp >= this.maxExp) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    this.exp = 0;
    this.maxExp = this.maxExp + this.level * 1000;
    document.querySelector('.level_box strong').innerText = this.level;
    const levelGuide = document.querySelector('.hero_box .level_up');
    levelGuide.classList.add('active');

    setTimeout(() => levelGuide.classList.remove('active'), 1000);
    this.updateExp(this.exp);
    this.heroUpgrade();
    this.plusHp(this.defaultHpValue);
  }
}
