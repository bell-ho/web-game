class Stage {
  constructor() {
    this.level = 0;
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
    allMonsterComProp.arr = Array(10)
      .fill(undefined, undefined, undefined)
      .map((_, i) => {
        const monsterType = i === 9 ? stageInfo.monster[this.level].bossMon : stageInfo.monster[this.level].defaultMon;
        const position = hero.moveX + gameProp.screenWidth + (i === 9 ? 600 : 700) * i;
        return new Monster(monsterType, position);
      });
  }

  clearCheck() {
    stageInfo.callPosition.forEach((arr) => {
      if (hero.moveX >= arr && allMonsterComProp.arr.length === 0) {
        this.stageGuide('곧 몬스터가 몰려옵니다');
        stageInfo.callPosition.shift();

        setTimeout(() => {
          this.callMonster();
          this.level++;
        }, 1000);
      }
    });
  }
}
