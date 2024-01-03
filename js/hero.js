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

  updateClass(action, className) {
    if (action) {
      this.el.classList.add(className);
    } else {
      this.el.classList.remove(className);
    }
  }

  move(direction) {
    const isLeft = direction === 'left';
    this.updateClass(isLeft, 'flip');
    const change = isLeft ? -this.speed : this.speed;
    this.moveX = Math.max(this.moveX + change, 0);
  }

  slide() {
    const shouldSlide = key.keyDown['slide'] && !this.slideDown;
    this.updateClass(shouldSlide, 'slide');

    if (shouldSlide) {
      const change = this.direction === 'right' ? this.slideSpeed : -this.slideSpeed;
      this.moveX = Math.max(this.moveX + change, 0);

      if (this.slideTime > this.slideMaxTime) {
        this.el.classList.remove('slide');
        this.slideDown = true;
      }
      this.slideTime += 1;
    } else {
      this.slideDown = false;
      this.slideTime = 0;
    }
  }

  attack() {
    this.updateClass(key.keyDown['attack'], 'attack');
    if (key.keyDown['attack'] && !bulletComProp.launch) {
      bulletComProp.arr.push(new Bullet());
      bulletComProp.launch = true;
    } else if (!key.keyDown['attack']) {
      bulletComProp.launch = false;
    }
  }

  keyMotion() {
    const isMoving = key.keyDown['left'] || key.keyDown['right'];
    this.updateClass(isMoving, 'run');

    if (isMoving) {
      this.direction = key.keyDown['left'] ? 'left' : 'right';
      this.move(this.direction);
    }

    this.attack();
    this.slide();

    this.el.parentNode['style'].transform = `translateX(${this.moveX}px)`;
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

  heroUpgrade(upDamage = 5000) {
    this.attackDamage += upDamage;
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
