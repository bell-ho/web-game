class Stage {
  constructor() {
    this.stageStart();
  }

  stageStart() {
    this.callMonster();
    this.stageGuide();
  }

  stageGuide() {
    this.parentNode = document.querySelector('.game_app');
    this.textBox = document.createElement('div');
    this.textBox.className = 'stage_box';
    this.textNode = document.createTextNode('START LEVEL 1');
    this.textBox.appendChild(this.textNode);
    this.parentNode.appendChild(this.textBox);

    setTimeout(() => this.textBox.remove(), 2000);
  }

  callMonster() {
    Array(10)
      .fill()
      .forEach((_, i) => {
        if (i === 9) {
          allMonsterComProp.arr[i] = new Monster(pinkMonBoss, gameProp.screenWidth + 700 * i);
        } else {
          allMonsterComProp.arr[i] = new Monster(pinkMon, gameProp.screenWidth + 700 * i);
        }
      });
  }
}
