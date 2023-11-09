import {Scene} from'phaser';
import * as fnc from '../index.js';
import {cfg} from '../index.js'


export class IntroScene extends Scene {
  constructor() {
    super('IntroScene')
  }

  init() {
    console.log('IntroScene was loading...')
  }

  preload() {
    //============================(((LOAD GLOBAL DATA)))================================

    //------------------------------LOAD AUDIO
    // this.load.audio('bgIntro', '/assets/sounds/background/bgIntro.mp3')
    this.load.audio('btnStartClick', '/assets/sounds/effects/btnClick/click0.wav')
    this.load.audio('figure', '../assets/sounds/effects/items/figureUP.wav')
    //------------------------------- LOAD IMAGES
    //---bg
    // this.load.image('bg', '../assets/images/backgrounds/intro.png')

    //---logo figure
    this.load.image('figureLogoOne', '/assets/images/logo/1.png')
  
    //control buttons
    this.load.spritesheet('controlButtons', '../assets/images/buttons/longBtn_470_170.png',
      { frameWidth: 470, frameHeight: 170, startFrame: 0, endFrame: 5 })
     
  }
 

  create() {
    //grid create for dev test
    // fnc.createGridSystem(this)
    

    //---------------- add background by black color
    this.cameras.main.setBackgroundColor('#000000')
     //---bg
    // this.add.image( 0, 0,'bg').setOrigin(0,0)

    //---------------------------------((((add AUDIO))))-----------------------------
    // this.soundBgIntro = fnc.createAudio(this, 'bgIntro', 0.5, true)
    // check is bg music not play, start music
    // if (!this.sound.getAllPlaying().length) this.soundBgIntro.play()
      
    this.soundBtnStartClick = () => fnc.createAudio(this, 'btnStartClick').play()
    this.sound.add('figure', {delay: 0.5}).play()

    //--------------------------------((((add TEXT))))------------------------------
    //---title text
    this.titleText = fnc.createText(this, 45, cfg.height / 7, 'Tic Tac Toe',50)
    .setStroke('blue',12)

    //--------------------------------((((add IMAGES)))) --------------------------
    
    //---logo Figure
    this.figureLogo = this.add.image(cfg.width / 4 + 120, cfg.height / 2, 'figureLogoOne')
      .setOrigin(0, 0)
      .setScale(0)
      .setAngle(45)
  
    
    // ------------------------------buttons
    this.btnMenu = this.add.image(cfg.width / 2, cfg.height - 110, 'controlButtons', 2).setScale(0.4, 0.5)
   
    //---start btn label
    fnc.createText(this, cfg.width / 2 - 45, cfg.height - 120, 'MENU', 26)
      
    //---start menu label
    this.subTitleText = fnc.createText(this, cfg.width / 4, cfg.height - 50, 'Press button to Menu', 16)
    
    this.btnMenu.setInteractive({ cursor: 'pointer' })                      //    write direct css command  in   setInteractive()
      .on('pointerover', () => this.btnMenu.setTint(0xe0e0e0))
      .on('pointerout', () => this.btnMenu.setTint(0xffffff))
      .on('pointerdown', () => {
        this.anims.remove('flyAnimationLogo')
        //play sound
        this.soundBtnStartClick()
        this.scene.start('MenuScene')
      })

 
    //-------------------------------Tween Animations
    // fnc.tweenAnimation.createTextChangeColorAnimation(this, this.titleText.name)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, this.subTitleText, 100, 550, -1, 500, true)
   
    //logo animation
    this.tweens.add({
      targets: this.figureLogo,
      delay: 0,
      scale: { from: 0, to: 0.9 },
      duration: 3000,
      ease: 'Back', 
      complete: () => {
       fnc.tweenAnimation.createRotateAnimation(this, this.figureLogo)
      }
    })
  
    //text animation
    this.tweens.add({
      targets: this.titleText,
      delay: 0,
      alpha: { from: 0.6, to: 1 },
      duration: 5000,
      ease: 'Back', 
      yoyo: true,
      repeat: -1,
    })

    

  }

};
