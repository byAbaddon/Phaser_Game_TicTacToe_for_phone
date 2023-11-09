import {Scene} from'phaser';
import * as fnc from '../index.js';
import {cfg} from '../index.js'
import { GameScene } from "./gameScene.js";


export class ReloadScene extends Scene {
  constructor() {
    super('ReloadScene')
  }
  init() {
    console.log('GameScene was loading...')
    // this.game.sound.stopAll()
    // this.events.removeAllListeners()    //remove all events from Scene
    this.input.enabled = false;            // disable all click events on this Scene
  }

  preload() {
    this.load.image('human', '../assets/images/icons/playerHuman.png')
    this.load.image('AI1', '../assets/images/icons/aiHead1.png')
    this.load.image('AI1_2', '../assets/images/icons/aiHead1_2.png')
    this.load.image('AI2_1', '../assets/images/icons/head-android-ai.png')
    this.load.image('AI2_2', '../assets/images/icons/head-android-ai2.png')
  }
 
  create() { 
    //grid create for dev test
    // fnc.createGridSystem(this)

    if (cfg.global.typeOfGame == 'gameTwoPlayers') {
      this.add.image(30 , 100, 'human').setScale(1.4).setOrigin(0,0)
    } else if (cfg.global.typeOfGame == 'gameAI1') {
      this.ai1 = this.add.image(65, 130, 'AI1').setScale(1.4).setOrigin(0, 0)
      setTimeout(() => this.ai1.setTexture('AI1_2'), 200)
    } else {
     this.ai2 = this.add.image(-14, 100, 'AI2_1').setOrigin(0, 0)
     setTimeout(() => this.ai2.setTexture('AI2_2'), 200); 
    }
    
    // this.cameras.main.setBackgroundColor('#ff0000')
    // fnc.tweenAnimation.transitionBetweenScene(this, cfg)
    fnc.createText(this, 110, cfg.height - 240, 'LOADING...', 45,)
      .setStroke('blue', 8).setAlpha(.9)
    
    //remove and add scene again to reset all level
    this.anims.anims.clear();

    setTimeout(() => this.scene.remove('GameScene'), 100);     
    setTimeout(() => this.scene.add('GameScene', GameScene), 200);    
    setTimeout(() => this.scene.start('GameScene', GameScene), 500);
  }

  update(time, delta) {}
}
