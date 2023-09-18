class Bullet {
  constructor() {
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'hero_bullet';
    this.x = 0;
    this.y = 0;
    this.speed = 30;
    this.distance = 0;
    this.bulletDirection = 'right';
    this.init();
  }

  init() {
    this.bulletDirection = hero.direction === 'left' ? 'left' : 'right';
    this.x = this.bulletDirection === 'right' ? hero.movex + hero.size().width / 2 : hero.movex - hero.size().width / 2;

    this.y = hero.position().bottom - hero.size().height / 2;
    this.distance = this.x;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.parentNode.appendChild(this.el);
  }

  moveBullet() {
    let setRotate = '';
    if (this.bulletDirection === 'left') {
      this.distance -= this.speed;
      setRotate = 'rotate(180deg)';
    } else {
      this.distance += this.speed;
    }
    this.el.style.transform = `translate(${this.distance}px, ${this.y}px) ${setRotate}`;
    this.crashBullet();
  }

  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,

      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }

  crashBullet() {
    allMonsterComProp.arr.forEach((monster, i) => {
      if (this.position().left > monster.position().left && this.position().right < monster.position().right) {
        bulletComProp.arr.forEach((v, j) => {
          if (v === this) {
            bulletComProp.arr.splice(j, 1);
            this.el.remove();
            monster.updateHp(i);
          }
        });
      }
    });

    if (this.position().left > gameProp.screenWidth || this.position().right < 0) {
      bulletComProp.arr.forEach((v, i) => {
        if (v === this) {
          bulletComProp.arr.splice(i, 1);
          this.el.remove();
        }
      });
    }
  }
}
