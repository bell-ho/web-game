class Hero {
  constructor() {
    this.el = document.querySelector('.hero');
    this.movex = 0;
    this.movey = 0;

    this.speed = 11;
    this.jumpSpeed = 10;
    this.jumpHeight = 200;
    this.jumpCounter = 0;

    this.direction = 'right';

    this.jumping = false;
  }

  keyMotion() {
    if (key.keyDown['left'] || key.keyDown['right']) {
      this.el.classList.add('run');
      if (key.keyDown['left']) {
        this.direction = 'left';
        this.el.classList.add('flip');

        this.movex = this.movex <= 0 ? 0 : this.movex - this.speed;
      } else {
        this.direction = 'right';
        this.el.classList.remove('flip');
        this.movex = this.movex + this.speed;
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

    this.el.parentNode.style.transform = `translateX(${this.movex}px)`;
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
}