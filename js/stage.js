class Stage {
  constructor() {
    this.level = 0;
    this.isStart = false;
    // this.stageStart();
  }

  // stageStart() {
  //   setTimeout(() => {
  //     this.isStart = true;
  //     this.stageGuide(`START LEVEL${this.level + 1}`);
  //     this.callMonster();
  //   }, 2000);
  // }

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
          allMonsterComProp.arr[i] = new Monster(
            stageInfo.monster[this.level].bossMon,
            hero.moveX + gameProp.screenWidth + 600 * i,
          );
        } else {
          allMonsterComProp.arr[i] = new Monster(
            stageInfo.monster[this.level].defaultMon,
            hero.moveX + gameProp.screenWidth + 700 * i,
          );
        }
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
    // if (allMonsterComProp.arr.length === 0 && this.isStart) {
    //   this.isStart = false;
    //   this.level++;
    //
    //   if (this.level < stageInfo.monster.length) {
    //     this.stageGuide('CLEAR!!');
    //     this.stageStart();
    //     hero.heroUpgrade();
    //   } else {
    //     this.stageGuide('ALL CLEAR!!');
    //   }
    // }
  }
}
