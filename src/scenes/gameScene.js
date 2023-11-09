import {  Scene} from 'phaser'
import * as fnc from '../index.js';
import {cfg} from '../index.js'



export class GameScene extends Scene {
  constructor() {
    super('GameScene')
    this.isCoinToss = false
    this.stepPlayersCounter = 0
    this.player = 'X'
    this.timeBeforeAIPlay = 500
    this.boardMatrix = [['', '', ''], ['', '', ''], ['', '', '']]
    this.boardButtonsMatrix = [['', '', ''], ['', '', ''], ['', '', '']]
    this.matrixFieldPosition = {
      '00': { x: 100, y: 340 }, '01': { x: 240, y: 340 }, '02': { x: 380, y: 340 },
      '10': { x: 100, y: 480 }, '11': { x: 240, y: 480 }, '12': { x: 380, y: 480 },
      '20': { x: 100, y: 620 }, '21': { x: 240, y: 620 }, '22': { x: 380, y: 620 },
    }
  }


  init() {
    console.log('Welcome to GameScene...')
    // this.game.sound.stopAll() //stop all sounds
  }

  preload() {

    //#region -----------------------------------((((Load IMAGE)))) --------------------------------------

    //flares
    this.load.atlas('confetti', '../assets/images/particles/confetti.png', '../assets/images/particles/confetti.json')


    //----------------backgrounds
    this.load.image('bgGame', '../assets/images/backgrounds/bgGame.png')

    //coin sprite
    this.load.spritesheet('coin', '../assets/images/coin/coinSprite_160_160.png', {
      frameWidth: 160,
      frameHeight: 150,
      startFrame: 0,
      endFrame: 11
    })

    //------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')

    // //---btnSound
    this.load.image('btnSound', '/assets/images/buttons/btnSound.png')
    // //---bgnNoSound
    this.load.image('btnNoSound', '/assets/images/buttons/btnNoSound.png')
    
    //sound multi images
    this.btnSoundSpriteImagesArray = fnc.loadMultiImages(this, 'btnSounds', '../assets/images/buttons/soundBtnSprite/', 4)

    //bot AI1 multi images
    this.AI1SpriteImagesArray = fnc.loadMultiImages(this, 'ai1', '../assets/images/icons/spriteAI1/', 4)
    //bot AI2 multi images
    this.AI2SpriteImagesArray = fnc.loadMultiImages(this, 'ai2', '../assets/images/icons/spriteAI2/', 4)

    
    //---boards
    // this.boardsArray = fnc.loadMultiImages(this, 'board' , '../assets/images/boards/' , 2)
    this.load.spritesheet('board', '../assets/images/boards/boardGold.png', {
      frameWidth: 512,
      frameHeight: 512,
      startFrame: 0,
      endFrame: 5
    })

    //---players tic
    this.load.spritesheet('tics', '../assets/images/tics/ticLent.png', {
      frameWidth: 100,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 9
    })

    //---playerOne
    this.load.image('playerMan', '../assets/images/icons/playerMan.png')
    this.load.image('playerWomen', '../assets/images/icons/playerWomen.png')
    this.load.image('playerHuman', '../assets/images/icons/playerHuman.png')
    this.load.image('playerAI1', '../assets/images/icons/aiHead1.png')
    this.load.image('playerAI2', '../assets/images/icons/head-android-ai.png')

    //vs
    this.load.image('vs', '../assets/images/vs/1.png')

    //#endregion ------------------------------ load Images ----------------------------------------

    //#region ------------------------------------((((load AUDIO)))) --------------------------------------
    this.load.audio('bgGameSound', '/assets/sounds/background/bgGame.mp3')

    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('ticSound', '../assets/sounds/effects/items/tic.wav')
    this.load.audio('tacSound', '../assets/sounds/effects/items/tac.wav')
    this.load.audio('coinRotateSound', '../assets/sounds/effects/items/coin.wav')
    this.load.audio('gongSound', '../assets/sounds/effects/items/gong.mp3')
    this.load.audio('lineSound', '../assets/sounds/effects/items/line.mp3')
    this.load.audio('tieSound', '../assets/sounds/effects/items/tie.wav')

    //#endregion -------------------------------load Audio ------------------------------------

  }

  create() {
    //#region ---------------------------------((((add AUDIO))))----------------------------- 
    this.soundBgGame = this.sound.add('bgGameSound').setLoop(true)
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundLevelComplete = () => fnc.createAudio(this, 'levelCompleteSound').play()
    this.soundTic = () => fnc.createAudio(this, 'ticSound').play()
    this.soundTac = () => fnc.createAudio(this, 'tacSound').play()
    this.soundCoinRotate = () => fnc.createAudio(this, 'coinRotateSound').play()
    this.soundGong = () => fnc.createAudio(this, 'gongSound').play()
    this.soundLine = () => fnc.createAudio(this, 'lineSound').play()
    this.soundTie = () => fnc.createAudio(this, 'tieSound').play()


    // #endregion --------------------------------Audio------------------------------------------


    //#region -----------------------------------((((IMAGE)))) -------------------------------------------

    //create bg
    // this.bg = this.add.image(0, 0, 'bgGame').setOrigin(0, 0)
    this.bg = this.add.tileSprite(0, 0, cfg.width, this.cloudHeight, 'bgGame').setOrigin(0, 0)
    //----------- buttons  
    // this.btnReload = this.add.image(cfg.width - 65, 25, 'btnReload').setScale(0.3)
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 30, 30, 'btnExit').setScale(0.4).setDepth(1)
    //---btn sound
    this.btnSound = this.add.sprite(30, 30, 'btnSound').setScale(0.4).setDepth(1)


    //------------------ player icon
    let plyerFirstFace = 'playerMan'
    let plyerSecondFace = 'playerWomen'

    if (cfg.global.typeOfGame == 'gameAI1') {
      plyerFirstFace = 'playerHuman'
      plyerSecondFace = 'playerAI1'
    }

    if (cfg.global.typeOfGame == 'gameAI2') {
      plyerFirstFace = 'playerHuman'
      plyerSecondFace = 'playerAI2'
    }
    this.playerFirst = this.add.image(100, 125, plyerFirstFace).setScale(0.35)
    this.playerSecond = this.add.sprite(cfg.width - 100, 125, plyerSecondFace).setScale(0.35)

    //-----------create circle frame
    this.redCircleFrame = this.add.circle(cfg.width - 100, 128, 62, 0xff0000, 0.5).setVisible(false)
    // this.greenRectLine = this.add.rectangle(100, 205, 100, 10, 0x00ff00, 0.8).setStrokeStyle(2, 0xffffff).setVisible(false)
    this.greenRectLine = this.add.rectangle(100, 205, 100, 13, 0xffffff, 0.9).setStrokeStyle(2, 0x0030ff)

    //coin
    this.coin = this.add.sprite(cfg.width / 2 - 5, 125, 'coin', 1).setScale(0.8)

    //---tics
    // this.ticPlayerOne = this.add.sprite(cfg.width - 150, cfg.height - 94, 'tics',8)
    // this.ticPlayerTwo = this.add.sprite(cfg.width - 150, cfg.height - 194,'tics', 9)


    //---boards
    this.add.sprite(cfg.width / 2, cfg.height / 2, 'board', 5).setScale(0.8)

    //---frame boards
    this.frameBoard = this.add.rectangle(cfg.width / 2, cfg.height / 2, 440, 440)
      .setStrokeStyle(10, '0xffdd00', 0.5)

    //----------------------------------fill matrix
    //---btnBoard
    const [rows, cols] = [3, 3]
    let [startPosX, startPosY] = [cfg.width / 2 - 140, cfg.height / 2 + 140]

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rect = this.add.rectangle(startPosX, startPosY, 120, 120, 0xffffff, 0.5).setStrokeStyle(1, 0xff0000)
        // add to matrix
        this.boardButtonsMatrix[r][c] = rect
        startPosX += 140
      }
      startPosX = cfg.width / 2 - 140
      startPosY -= 140
    }

    //#endregion -------------------------- Image--------------------------------------------  


    //#region -----------------------------------((((add TEXT))))-------------------------------------
    //---timer
    this.clockPlayTime = fnc.createText(this, cfg.width / 2 - 100, 15, `Play Time ${'0:00'}`, 20)
      .setStroke('blue', 3).setAlpha(.9).setAlpha(0)

    //---vs
    this.vsText = fnc.createText(this, cfg.width / 2 - 30, 115, `vs`, 32).setStroke('blue', 8).setAlpha(.9).setVisible(false)

    //---------------------win lost tilt
    this.tieCounterText = fnc.createText(this, cfg.width / 2 - 40, cfg.height - 220, `ties\n\n\t\t${cfg.global.ties}`, 28, ).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0xf4af24)

    if (cfg.global.typeOfGame != 'gameTwoPlayers') {
      this.winCounterText = fnc.createText(this, 20, cfg.height - 220, `wins\n\n\t ${cfg.global.wins}`, 28, 'crimson')
      this.lossCounterText = fnc.createText(this, cfg.width - 150, cfg.height - 220, `losses\n\n\t\t\t ${cfg.global.losses}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
    } else {

      this.winCounterTextP1 = fnc.createText(this, 20, cfg.height - 220, `win\t ${cfg.global.wins}`, 28, 'crimson')
      this.lossCounterTextP1 = fnc.createText(this, 20, cfg.height - 170, `loss\t ${cfg.global.losses}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)

      this.winCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 220, `win\t ${cfg.global.winsP2}`, 28, 'crimson')
      this.lossCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 170, `loss\t ${cfg.global.lossesP2}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
    }
    this.winResultText = fnc.createText(this, cfg.width / 2, cfg.height - 100, 'Win', 80).setTint(0xea0936, 0xea0936, 0xea0936, 0xea0936)
    this.tieResultText = fnc.createText(this, cfg.width / 2, cfg.height - 100, 'Tie', 80).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0x091020)
    this.lossResultText = fnc.createText(this, cfg.width / 2, cfg.height - 100, 'Loss', 80).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)

    //centerX text
    for (const txt of [this.winResultText, this.tieResultText, this.lossResultText]) {
      txt.setX((cfg.width - txt.width) / 2)
      txt.setVisible(false)
    }
    // two Players winner  symbol
    this.xTic = this.add.image(65, cfg.height - 65, 'tics', 8).setScale(0.5).setVisible(false)
    this.oTic = this.add.image(cfg.width - 65, cfg.height - 65, 'tics', 9).setScale(0.5).setVisible(false)
    this.circleFrame = this.add.circle(65, cfg.height - 65, 50, 0x000000)
      .setStrokeStyle(3, 0xffffff, 0.5).setAlpha(0.3).setVisible(false)

    //-----round
    this.roundText = fnc.createText(this, cfg.width / 2, cfg.height - 85, `round: ${cfg.global.round}`, 30)
    this.roundText.setX((cfg.width - this.roundText.width) / 2)
    //#endregion ---------------------------------Text---------------------------------------------  


    //#region --------------------------------((((Create sprite Objects)))) -------------------------------------------
    //#endregion ------------------------------------------Sprite --------------------------------------------


    //#region ---------------------------------((((Animation))))---------------------------------

    this.confettiEmitter = this.add.particles(cfg.width / 2, 0, 'confetti', {
      frame: ['red', 'yellow', 'green', 'blue', 'white'],
      lifespan: 4000,
      speed: {
        min: 150,
        max: 250
      },
      scale: {
        start: 0.15,
        end: 0
      },
      gravityY: 600,
      bounce: 0.8,
      blendMode: 'ADD'
    })

    this.confettiEmitter.stop()


    this.showResultTweenAnimation = this.tweens.add({
      targets: [this.winResultText, this.tieResultText, this.lossResultText],
      scaleY: 1.05,
      scaleX: 1.05,
      duration: 300,
      yoyo: true,
      repeat: -1,
      ease: 'Linear'
    })

    this.showResultTweenAnimation.pause()



    fnc.animation.createAnimationBySpriteOfImages(this, 'coinAnimation', 'coin', 0, 11, 2, 50)
    this.coin.anims.play('coinAnimation')
    this.soundCoinRotate()

    //----------------- create Clock - Play Timer
    this.time.addEvent({
      callbackScope: this,
      delay: 1000,
      loop: true,
      callback: () => {
        let time = cfg.global.playTime++
        let min = (Math.floor(time / 60)).toString()
        let sec = (time % 60).toString().padStart(2, '0')
        this.clockPlayTime.setText(`Play Time ${min} : ${sec}`)
      },
    })

    //--- show clock
    this.tweens.add({
      targets: this.clockPlayTime,
      alpha: {
        from: 0,
        to: 1
      },
      duration: 3000,
      delay: 1000
    })


    //------------------ round tween animation
    this.tweens.add({
      targets: this.roundText,
      // alpha: {from: 0, to: 1 },
      x: {from: 0, to: cfg.width / 2 - 80 },
      duration: 2000,
      delay: 0,
      // yoyo: true,
      ease: 'Elastic',
      onStart: () => {
        // this.roundText.setAlpha(0)
        this.roundText.setText(`round: ${cfg.global.round}`)
      },
      onComplete: () => {
        this.tweens.add({
          targets: this.roundText,
          x: cfg.width + 100,
          duration: 500,
          delay: 1000,
          ease: 'Linear',
        })
      }
    })

    //add multi sound images
    fnc.animation.createAnimationByArrayOfImages(this, 'btnSoundAnimation', this.btnSoundSpriteImagesArray, -1, 5)
    if (!cfg.global.isPausedSound) {
      this.btnSound.anims.play('btnSoundAnimation');
    } else {
      this.btnSound.setTexture('btnNoSound')
    }

    //--------------------------frame board animation
    //---win frame
    this.winFrame = this.tweens.add({
      targets: this.frameBoard,
      alpha: {from: 0.1, to: 1},
      duration: 200,
      repeat: 2,
      yoyo: true,
      onYoyo: () => {
        this.frameBoard.setStrokeStyle(10, '0xff0000', 0.5).setAlpha(0.1)
      },
      onRepeat: () => {
        this.frameBoard.setStrokeStyle(10, '0xffff00', 0.5).setAlpha(0.1)
      },
      onComplete: () => {
        this.frameBoard.setStrokeStyle(10, '0xff0000', 0.5).setAlpha(0.8)
      }
    })
    this.winFrame.pause()

    //---lost frame  
    this.lostFrame = this.tweens.add({
      targets: this.frameBoard,
      alpha: {from: 0.1,  to: 1},
      duration: 200,
      repeat: 2,
      yoyo: true,
      onYoyo: () => {
        this.frameBoard.setStrokeStyle(10, '0x00ffff', 0.5).setAlpha(0.1)
      },
      onRepeat: () => {
        this.frameBoard.setStrokeStyle(10, '0xffff00', 0.5).setAlpha(0.1)
      },
      onComplete: () => {
        this.frameBoard.setStrokeStyle(10, '0x00ffff', 0.5).setAlpha(0.8)
      }
    })
    this.lostFrame.pause()

    //---tie frame
    this.tieFrame = this.tweens.add({
      targets: this.frameBoard,
      alpha: {from: 0.1,to: 1},
      duration: 200,
      repeat: 2,
      yoyo: true,
      onYoyo: () => {
        this.frameBoard.setStrokeStyle(10, '0x555555', 0.5).setAlpha(0.1)
      },
      onRepeat: () => {
        this.frameBoard.setStrokeStyle(10, '0xffff00', 0.5).setAlpha(0.1)
      },
      onComplete: () => {
        this.frameBoard.setStrokeStyle(10, '0xffff00', 0.5).setAlpha(0.8)
      }
    })
    this.tieFrame.pause()


    //bot animation
    //AI1
    this.botAnimationAI1 = fnc.animation.createAnimationByArrayOfImages(this, 'AI1Animation', this.AI1SpriteImagesArray, -1, 2)
    if(cfg.global.typeOfGame == 'gameAI1') this.playerSecond.play('AI1Animation');
    //AI2
    this.botAnimationAI2 = fnc.animation.createAnimationByArrayOfImages(this, 'AI2Animation', this.AI2SpriteImagesArray, -1, 1)
    if(cfg.global.typeOfGame == 'gameAI2') this.playerSecond.play('AI2Animation');
    
    
    //#endregion ----------------------------Animation-------------------------------------------

    //#region ------------------------------------((((code))))-------------------------------

    //--------------------------------((((Interactive Buttons)))) -------------------------------------------
    //-----------------------------------add interactive btn options
    Array.from([this.btnExit, this.btnSound]).forEach((btn, index) => {
      btn.setInteractive({
          cursor: 'pointer',
          index
        })
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
            this.game.sound.stopAll()
            this.anims.anims.clear()
            this.soundBtnExitClick()
            this.scene.stop(this.scene.scene)
            cfg.global.isPausedSound = false
            this.scene.start('MenuScene')
          }

          if (index == 1) {
            console.log('Music Pause ON/OFF')
            if (!cfg.global.isPausedSound) {
              this.sound.stopByKey('bgGameSound')
              this.btnSound.setTexture('btnNoSound')
              this.btnSound.stop('btnSoundAnimation')
              cfg.global.isPausedSound = true
            } else {
              this.soundBgGame.onBlur = false
              this.soundBgGame.play()
              this.btnSound.setTexture('btnSound')
              this.btnSound.play('btnSoundAnimation')
              cfg.global.isPausedSound = false
            }
          }
        })

      //---play bg music  
      //  this.soundBgGame()
    })

    // Iterate Matrix and set all btn interactive and call player move function

    this.boardButtonsMatrix.reverse().forEach((matrixRow, rowIndex) => {
      matrixRow.forEach((rect, colIndex) => {
        rect.setAlpha(0.001) // hide rect btn
        rect.setInteractive().on('pointerdown', () => {
          //----------------------enable clicked  True
          if (this.isCoinToss) {
            //clicked this current field
            let currentField = this.boardButtonsMatrix[rowIndex][colIndex]
            currentField.destroy()
            // player move
            this.playerMove(currentField, rowIndex, colIndex)
          }
        })
      })
    })


    //----------------after animation  lot who plyer is first and more settings
    this.coin.on('animationcomplete', function (anim, frame) {
      //set visible players frames 
      this.redCircleFrame.setVisible(true)
      this.greenRectLine.setVisible(true)

      //random 'X' or 'O'
      const lotPlayer = Phaser.Math.RND.pick([6, 0])
      if (lotPlayer == 6) { // == 'O'
        this.player = 'O'
        this.redCircleFrame.setPosition(100, 128)
        this.greenRectLine.setPosition(cfg.width - 100, 205)
        //------------------call AI move function for Firs time
        if (cfg.global.typeOfGame != 'gameTwoPlayers') {
          //disable click on matrix fields
          this.isCoinToss = false
          this.aiMove()
        }
      } else {
        this.player = 'X'
      }

      this.coin.setTexture('coin', lotPlayer)
      //hide coin
      setTimeout(() => {
        this.soundGong()
        this.coin.setVisible(false)
        this.vsText.setVisible(true)
        this.isCoinToss = true //enable click to matrix fields
      }, 600)
    }, this)


    // play infinity bg sound
    let allSounds = this.sound.getAllPlaying().filter(x => x.key == 'bgGameSound').length
    if (!this.sound.get('bgGameSound').isPlaying && allSounds == 0 && this.btnSound.anims.isPlaying) {
      this.soundBgGame.onBlur = false
      this.soundBgGame.play()
    }



    //#endregion -------------------------------Code-----------------------------------------------------------


};


  update(time, delta) {
    this.bg.tilePositionY += 0.8 // move bg
  }

  //=====================================  Custom Function =======================
  // 1) first call function aiMovie make random step
  // 2) aiMovie call function  this.playerMove(currentField, rowIndex, colIndex);
  //she add tic for matrix board and call function this.checkIsWinner() 
  // and this.showResult() for check is winner or end
  //3) showResult() if no Winner or End,  call function with type game
  // АI1 aiMovie() or this.aiMoveByMinMaxAlgorithm() за АI2


  playerMove(currentField, rowIndex, colIndex) {
    // console.log('-----------( 2 )-----------------------');
    this.stepPlayersCounter++
    let currentTic = 8
    //check player - is first player X
    if (this.player == 'X') {
      this.redCircleFrame.setPosition(100, 128)
      this.greenRectLine.setPosition(cfg.width - 100, 205)
      this.soundTic()
      this.player = 'O'
    } else { // second player or AI
      this.redCircleFrame.setPosition(cfg.width - 100, 128)
      this.greenRectLine.setPosition(100, 205)
      this.soundTac()
      this.player = 'X'
      currentTic++
    }

    try {
      //---add image to play board
      currentField = this.add.image(currentField.x, currentField.y, 'tics', currentTic)
      //-----------set data to boardMatrix
      this.boardMatrix[rowIndex][colIndex] = currentTic & 1 ? 'O' : 'X'
      // console.table(this.boardMatrix)
      //---check is Win Line
      this.checkIsWinner()
      // //---show result
      setTimeout(() => this.showResult(), 100)
    } catch (error) {
      console.log('Fix Bug - to fast exit!!!!');
    }
  }


  //----------------------FIRST MOVE AI1 AI2  - and AI-1 move

  aiMove() {
    // console.log('-----------( 1 )-----------------------');
    this.isCoinToss = false
    // select random field
    let fieldsArray = []
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.boardMatrix[row][col] == '') {
          fieldsArray.push([row, col])
        }
      }
    }

    const [rowIndex, colIndex] = [...Phaser.Math.RND.pick(fieldsArray)]
    const currentField = this.matrixFieldPosition[String(`${rowIndex}${colIndex}`)]
    //remove used field
    this.boardButtonsMatrix[rowIndex][colIndex].destroy()

    //call function to move
    setTimeout(() => {
      // this.isCoinToss = true //enable click
      this.playerMove(currentField, rowIndex, colIndex)
    }, this.timeBeforeAIPlay)

  }


  //___________________________________ ((Move AI2  with  MiniMax algorithm))  
  aiMoveByMinMaxAlgorithm(depth) {
    //-----------------------this win start random recursion style
    //random odd /even  recursion will: start (Up ot Down), or start (Down to UP)
    const recursionStartStyle = Phaser.Math.RND.between(1, 2) & 1  
    
    let bestMove = this.minimaxMove(this.boardMatrix, 'O', depth, recursionStartStyle) //9 max force results  / 4 middle

    let [rowIndex, colIndex] = bestMove.move
    let currentField = this.matrixFieldPosition[String(`${rowIndex}${colIndex}`)]

    setTimeout(() => {
      // console.log('-----------( 4 )-----------------------');
      //remove used field
      this.boardButtonsMatrix[rowIndex][colIndex].destroy()
      //call function
      this.playerMove(currentField, rowIndex, colIndex)
    }, this.timeBeforeAIPlay)


  }


  minimaxMove(board, player, depth, recursionStartStyle) {
    let emptyCells = this.getEmptyCells(board)
 
    if (this.checkWin(board, 'X')) {
      return { score: -1 }
    } else if (this.checkWin(board, 'O')) {
      return {score: 1}
    
    } else if (emptyCells.length == 0 || depth == 0) {
      return {score: 0}
    }

    const moves = []

    for (const cell of emptyCells) {
      let move = { move: cell, score: 0}
      board[cell[0]][cell[1]] = player

      if (player == 'O') {
        let result = this.minimaxMove(board, 'X', depth - 1)
        move.score = result.score
      } else {
        let result = this.minimaxMove(board, 'O', depth - 1)
        move.score = result.score
      }

      board[cell[0]][cell[1]] = ''

      //-------------------recursion start down to up
      if (recursionStartStyle) moves.push(move)
       //-------------------recursion start up to down
      else moves.unshift(move)
      //-------------------------------------------------------------  
      
    } 
  

    let bestMove;
    if (player == 'O') {
      let bestScore = -Infinity
      for (const move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score
          bestMove = move
        }
      }
    } else {
      let bestScore = Infinity
      for (const move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score
          bestMove = move
        }
      }
    }

    return bestMove
  }


  getEmptyCells(board) {
    let emptyCells = []
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] == '') {
          emptyCells.push([row, col])
        }
      }
    }

    return emptyCells
  }


  checkWin(board, player) {
    for (let row = 0; row < 3; row++) {
      if (board[row][0] == player && board[row][1] == player && board[row][2] == player) {
        return true
      }
    }

    for (let col = 0; col < 3; col++) {
      if (board[0][col] == player && board[1][col] == player && board[2][col] == player) {
        return true
      }
    }

    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
      return true
    }

    if (
      board[0][2] == player && board[1][1] == player && board[2][0] == player) {
      return true
    }

    return false
  }
  //______________________________________ (end Movie AI2)



  //------------------------------check is Winner
  checkIsWinner() {
    let mtx = this.boardMatrix
    let player = this.player == 'X' ? 'O' : 'X'

    // Check horizontal line
    for (let row = 0; row < 3; row++) {
      if (mtx[row][0] == player && mtx[row][1] == player && mtx[row][2] == player) {
        // console.log(row, mtx[row][1], mtx[row][2]);
        this.drawWinLine('horizontal', row)
        return player == 'X' ? +10 : -10 // X wins: +10, O wins: -10
      }
    }

    // Check vertical line
    for (let col = 0; col < 3; col++) {
      if (mtx[0][col] == player && mtx[1][col] == player && mtx[2][col] == player) {
        this.drawWinLine('vertical', col)
        return player == 'X' ? +10 : -10 // same
      }
    }

    // Check diagonal lines
    if (mtx[0][0] == player && mtx[1][1] == player && mtx[2][2] == player) {
      this.drawWinLine('diagonalFirst', 0)
      return player == 'X' ? +10 : -10 // same
    }

    if (mtx[0][2] == player && mtx[1][1] == player && mtx[2][0] == player) {
      this.drawWinLine('diagonalSecond', 1)
      return player == 'X' ? +10 : -10 //same
    }

    return 0 // No winner 
  }

  //------------------------------ show Result   *here set AI level
  showResult() {
    //------------- check game Results
    if (this.checkIsWinner() == 0 && this.stepPlayersCounter >= 9) { //Tie
      //---------- play sound
      this.soundTie()
      cfg.global.ties++
      this.tieCounterText.setText(`ties\n\n\t ${cfg.global.ties}`)
      this.tieResultText.setVisible(true)
      this.showResultTweenAnimation.play()
      this.tieFrame.resume()
      this.redCircleFrame.setFillStyle()
      console.log('The game ended! Nobody wins.')
      this.reloadScene()
      return
    }

    //-------------------- have winner
    if (this.checkIsWinner() != 0) {
      //---------- play sound
      this.soundLine()
      //---------- update win circle frame
      this.greenRectLine.setVisible(false)
      if (this.player == 'X') {
        this.redCircleFrame.setFillStyle().setStrokeStyle(5, 0x00ffff).setAlpha(0.8)
      } else {
        this.redCircleFrame.setFillStyle().setStrokeStyle(5, 0xff0000).setAlpha(0.8)
      }
      

      if (cfg.global.typeOfGame != 'gameTwoPlayers') {
        if (this.player != 'X') {
          cfg.global.wins++
          this.winCounterText.setText(`wins\n\n\t ${cfg.global.wins}`)
          this.winResultText.setVisible(true)
          this.confettiEmitter.start()
          this.winFrame.resume()
        } else {
          cfg.global.losses++
          this.lossCounterText.setText(`losses\n\n\t\t\t ${cfg.global.losses}`)
          this.lossResultText.setVisible(true)
          this.lostFrame.resume()
        }

        this.showResultTweenAnimation.play()
        console.log(`WOW ! ${this.player == 'O' ? 'Player' : 'AI'} wins`)

      } else { //playing two players
        if (this.player != 'X') {
          cfg.global.wins++
          cfg.global.lossesP2++
          this.winResultText.setVisible(true)
          this.winCounterTextP1.setText(`wins\t ${cfg.global.wins}`)
          this.lossCounterTextP2.setText(`loss\t ${cfg.global.lossesP2}`)
          this.xTic.setVisible(true)
          this.circleFrame.setVisible(true)
          this.winFrame.resume()
        } else {
          cfg.global.winsP2++
          cfg.global.losses++
          this.winResultText.setVisible(true).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
          this.winCounterTextP2.setText(`wins\t ${cfg.global.winsP2}`)
          this.lossCounterTextP1.setText(`loss\t ${cfg.global.losses}`)
          this.oTic.setVisible(true)
          this.circleFrame.setPosition(cfg.width - 65, cfg.height - 65).setVisible(true)
          this.lostFrame.resume()
        }


        this.confettiEmitter.start()
        this.showResultTweenAnimation.play()
        console.log(`WOW ! Player ${this.player == 'X' ? 'O' : 'X'} wins`)
      }

      this.reloadScene()
      return
    }

    //----------------- no winner yet call function again with depth 0 to 9
    if (cfg.global.typeOfGame != 'gameTwoPlayers' && this.stepPlayersCounter > 1) {
      // console.log('-----------( 3 )-----------------------');
      // enable/ disable click on matrix fields
      this.isCoinToss = this.player == 'X' ? true : false
    }

    if (cfg.global.typeOfGame == 'gameAI1' && this.player == 'O') this.aiMoveByMinMaxAlgorithm(5)
    if (cfg.global.typeOfGame == 'gameAI2' && this.player == 'O') this.aiMoveByMinMaxAlgorithm(8)
  }

  //draw Win Line
  drawWinLine(trajectory, startPos) {
    let line = this.add.rectangle(0, 0, 400, 20, 0x00aaff, 0.5).setStrokeStyle(0.1, 0xffffff).setOrigin(0, 0)
    if (this.player == 'O') line.setFillStyle(0xff1441).setStrokeStyle(0.1, 0xffffff).setAlpha(0.5)

    if (trajectory == 'horizontal') {
      if (startPos == 0) line.setPosition(40, 330)
      if (startPos == 1) line.setPosition(40, 470)
      if (startPos == 2) line.setPosition(40, 610)
    }
    if (trajectory == 'vertical') {
      if (startPos == 0) line.setPosition(112, 280).setAngle(90)
      if (startPos == 1) line.setPosition(252, 280).setAngle(90)
      if (startPos == 2) line.setPosition(392, 280).setAngle(90)
    }

    if (trajectory == 'diagonalFirst') {
      line.setPosition(55, 280).setSize(550, 20).setAngle(45)
    }
    if (trajectory == 'diagonalSecond') {
      line.setPosition(445, 295).setSize(550, 20).setAngle(135)
    }

  }

  //----------------remove Interactive matrix fields
  removeInteractiveMatrixFields() {
    this.boardButtonsMatrix.forEach(matrixRow => {
      matrixRow.forEach(field => {
        try {
          field.setInteractive()
        } catch {}
      })
    })
  }

  //------------------------------ Reload Scene  
  reloadScene() {
    console.log('Reload')
    cfg.global.round++ //increase rounds
    this.isCoinToss = false // stop clicked matrix fields
    this.input.enabled = false // disable all click events on this Scene
    this.btnExit.setVisible(false)
    this.btnSound.setVisible(false)
    this.removeInteractiveMatrixFields()

    // fnc.createText(this, cfg.width / 2 - 165, cfg.height / 2, '  RELOADING... ', 50, 'white', 'black').setDepth(5)
    setTimeout(() =>  this.scene.start('ReloadScene'), 2500)
  }


};