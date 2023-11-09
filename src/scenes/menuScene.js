import {Scene, Tilemaps} from'phaser';
import * as fnc from '../index.js';
import {cfg} from '../index.js'
import { GameScene } from "../scenes/gameScene.js";


export class MenuScene extends Scene {
  constructor() {
    super('MenuScene')
  }
  init() {
    console.log('MenuScene was loading...')
    this.sound.removeAll() //remove all sounds
    //============== (((RESET DATA and restart GameScene))) =========
    cfg.global.round = 1
    cfg.global.wins = 0
    cfg.global.winsP2 =  0
    cfg.global.ties =  0
    cfg.global.losses =  0
    cfg.global.lossesP2 =  0
    setTimeout(() => this.scene.remove('GameScene', GameScene), 10)
    setTimeout(() => this.scene.add('GameScene', GameScene), 200)
    //================================================================
  }

  preload() {
    //grid create for dev test
    // fnc.createGridSystem(this)

    //------------------------------load AUDIO
    this.load.audio('btnClick', '/assets/sounds/effects/btnClick/click0.wav')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('fire', '../assets/sounds/effects/items/fire.wav')

    //-------------------------------load IMAGES
    //-bg
    this.load.image('bg', '../assets/images/backgrounds/bgMenu.png')

    //flares   
    this.load.atlas('flares', '../assets/images/particles/flares.png', '../assets/images/particles/flares.json');

    //buttons 
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png') //---btnExit

    //control buttons Sprite
    this.load.spritesheet('controlButtons', '../assets/images/buttons/longBtn_470_170.png', {
      frameWidth: 470,
      frameHeight: 170,
      startFrame: 0,
      endFrame: 5
    })


    //icons
    this.load.image('twoPlayers', '../assets/images/icons/twoPlayers.png')
    this.load.image('aiRed', '../assets/images/icons/aiRed.png')
    this.load.image('aiBlue', '../assets/images/icons/aiBlue.png')
    

  }

  create() {
    //---------------- add background by black color
    // this.cameras.main.setBackgroundColor('#000000')
    //--bg
    this.add.image(0, 0, 'bg').setOrigin(0, 0)

    //---------------------------------((((add AUDIO))))-----------------------------
    //---bg if music not play, start
    try {
      if (!this.sound.get('bgIntro').isPlaying) this.sound.get('bgIntro').play()
    } catch {}


    this.soundBtnClick = () => fnc.createAudio(this, 'btnClick').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClick').play()
    this.sound.add('fire', { volume: 0.5 }).play()
    //--------------------------------((((add TEXT))))------------------------------
    //---title
    const titleText = fnc.createText(this, 30,  cfg.height / 5 - 20, `Make  You  Choice...`, 32)
      // .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
      .setStroke('blue', 4)

 


    //--------------------------------((((add IMAGES)))) --------------------------

    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)
    
    //-----------control buttons 
    //-----------------btn credits
    this.btnCredits = this.add.sprite(cfg.width / 2 + 6, cfg.height / 2 - 155, 'controlButtons', 0).setScale(0.5)
    //-credits label
    fnc.createText(this, cfg.width / 2 - 60, cfg.height / 2 - 165, 'CREDITS', 24)
    //---label
    const creditsText = fnc.createText(this, cfg.width / 7 + 10, cfg.height / 2 - 105 , 'Press button to show credits', 16)
    .setShadow(1, 1, "#0000ff", 1, true, true)

   
    //------------btn Play Game Two Player
    this.btnPlayGame = this.add.sprite(cfg.width / 2 , cfg.height - 440, 'controlButtons', 5).setScale(0.5, 0.5)
    //---icon
    this.add.image(cfg.width / 2 + 60, cfg.height - 440, 'twoPlayers').setScale(0.35)
    //---label
    fnc.createText(this, cfg.width / 2 - 85, cfg.height - 450, 'PLAY vs', 24)
    //---text
    const twoPlayerText = fnc.createText(this, cfg.width / 7 + 20, cfg.height - 390, 'Press button to play vs Player', 16)
      .setShadow(1, 1, "#0000ff", 1, true, true)


    //------------btn Play Game AI 1
    this.btnPlayGameAI1 = this.add.sprite(cfg.width / 2 , cfg.height - 280, 'controlButtons', 4).setScale(0.5, 0.5)
    //---icon
    this.add.image(cfg.width / 2 + 60, cfg.height - 280, 'aiBlue').setScale(0.35)
    //---label
    fnc.createText(this, cfg.width / 2 - 85, cfg.height - 290, 'PLAY vs', 24)
    //---text
    const AI1Text = fnc.createText(this, cfg.width / 7 + 20, cfg.height - 230, 'Press button to play vs AI-1', 16)
      .setShadow(1, 1, "#0000ff", 1, true, true)

      
    //------------btn Play Game AI 2
    this.btnPlayGameAI2 = this.add.sprite(cfg.width / 2 , cfg.height - 120, 'controlButtons', 3).setScale(0.5, 0.5)
    //---icon
    this.add.image(cfg.width / 2 + 60, cfg.height - 120, 'aiRed').setScale(0.35)
    //---label
    fnc.createText(this, cfg.width / 2 - 85, cfg.height - 130, 'PLAY vs', 24)
    //---text
    const AI2Text = fnc.createText(this, cfg.width / 7 + 20, cfg.height - 70, 'Press button to play vs AI-2', 16)
      .setShadow(1, 1, "#0000ff", 1, true, true)


    
    //---------------------------add interactive btn options
    Array.from([this.btnExit, this.btnCredits, this.btnPlayGame,this.btnPlayGameAI1, this.btnPlayGameAI2])
      .forEach((btn, index) => {
        btn.setInteractive({ cursor: 'pointer', index  })
          .on('pointerover', () => btn.setTint(0xc0c0c0))
          .on('pointerout', () => btn.setTint(0xffffff))
          .on('pointerdown', () => {
            //  cfg.transitionBetweenScene('MenuScene') // translation between scene
            this.ballEmitter.stop()
            const currentScene = this.scene.scene;
            this.scene.stop(currentScene);

            if (index == 0) this.scene.start('IntroScene')
            else if (index == 1) this.scene.start('CreditsScene')
            else {  
              cfg.global.typeOfGame =
                index == 2 ? 'gameTwoPlayers' : index == 3 ? 'gameAI1' : 'gameAI2'
              this.scene.start('GameScene')
            } 

            // play sound btn click
            if (index == 0) this.soundBtnExitClick()
            else this.soundBtnClick()

          })
      })



    //-------------------------------Tween Animations
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, [creditsText] , cfg.width / 5, 800, -1, 200)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, [twoPlayerText] , cfg.width / 5 - 30, 800, -1, 500)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, [AI1Text] , cfg.width / 5 - 30, 800, -1, 200)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, [AI2Text] , cfg.width / 5 - 30, 800, -1, 800)
   
    
    this.ballEmitter = this.add.particles(cfg.width / 2, 0, 'flares', {
      frame: ['red', 'yellow', 'green', 'blue', 'white'],
      lifespan: 4000,
      speed: {
        min: 150,
        max: 250
      },
      scale: {
        start: 0.5,
        end: 0
      },
      gravityY: 200,
      bounce: 0.8,
      blendMode: 'ADD'
    });
    // this.ballEmitter.stop()
  }

  update() {}

}