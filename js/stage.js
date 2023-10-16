class Stage {
  constructor() {
    this.level = 1;
    this.isStart = false;
    this.stageStart();
  }

  stageStart() {
    setTimeout(() => {
      this.isStart = true;
      this.stageGuide(`START LEVEL${this.level}`);
      this.callMonster();
    }, 2000);
  }

  stageGuide(stageLevel) {
    this.parentNode = document.querySelector('.game_app');
    this.textBox = document.createElement('div');
    this.textBox.className = 'stage_box';
    this.textNode = document.createTextNode(stageLevel);
    this.textBox.appendChild(this.textNode);
    this.parentNode.appendChild(this.textBox);

    setTimeout(() => this.textBox.remove(), 1500);
  }

  callMonster() {
    Array(10)
      .fill()
      .forEach((_, i) => {
        if (i === 9) {
          allMonsterComProp.arr[i] = new Monster(pinkMonBoss, hero.moveX + gameProp.screenWidth + 600 * i);
        } else {
          allMonsterComProp.arr[i] = new Monster(pinkMon, hero.moveX + gameProp.screenWidth + 700 * i);
        }
      });
  }

  clearCheck() {
    if (allMonsterComProp.arr.length === 0 && this.isStart) {
      this.isStart = false;
      this.level++;
      this.stageGuide('CLEAR!!');
      this.stageStart();
    }
  }
}
