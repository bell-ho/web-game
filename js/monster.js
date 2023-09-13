class Monster {
  constructor() {
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'monster_box';
    this.elChildren = document.createElement('div');
    this.elChildren.className = 'monster';

    this.init();
  }

  init() {
    this.el.appendChild(this.elChildren);
    this.parentNode.appendChild(this.el);
  }
}
