# Phaser_Game_Tic_Tac_Toe_for_phone

### Created a project using:
+ Phaser 3
+ JS
+ Simple - HTML / CSS
+ webpack
+ bable
+ cordova
+ android stuido
+ consultant assistance ChatGPT

# Game - Tic_Tac_Toe
Tic Tac Toe or also called "X-O", is one of the most popular games in the world. A fun strategy game for kids and adults that combines simplicity with conscious decision making.
Tic Tac Toe is not only a game but also a challenge for players' minds. Whether you play with friends or against an AI computer, enjoyment is guaranteed.


## Playing the game
How to play? </br>
3x3 game board:
The game board is a 3 by 3 square where players place symbols - "X" or "O" in order to form three consecutive symbols vertically, horizontally or diagonally.
Choose between Three Options:
1. Human vs Human: Two players can face each other using the same keyboard and screen.
2. Human vs. AI (level 5 minimax algorithm): A step above the usual minimax, the AI tries to predict the opponent's move 5 levels deep.
3. Human vs. AI (minimax rank 8 out of 9): Very high level of predictability - AI evolves to minimax rank 8. With this level of intelligence, the AI becomes a virtuoso in the game and becomes 99% invincible.

Smart minimax algorithm:
An intelligent minimax algorithm is used for optimal decision making. This algorithm ensures that the AI will always make the best possible move by predicting all possible outcomes of the game.

## Short video intro:
https://youtu.be/FEUXhbK8jvo

## Screenshots:
![1](https://github.com/byAbaddon/Phaser_Game_Tic_Tac_Toe/assets/51271834/060dc5c9-032a-4238-a035-51ae0090ee1f)
![2](https://github.com/byAbaddon/Phaser_Game_Tic_Tac_Toe/assets/51271834/f5165fc3-848f-4477-8524-56df1d49d036)
![3](https://github.com/byAbaddon/Phaser_Game_Tic_Tac_Toe/assets/51271834/e9b66b83-fca6-49c8-897a-8fc34c192529)
![4](https://github.com/byAbaddon/Phaser_Game_Tic_Tac_Toe/assets/51271834/bad8bbba-a09d-44cd-aec3-e45b51ebb3ac)
![5](https://github.com/byAbaddon/Phaser_Game_Tic_Tac_Toe/assets/51271834/6498e889-3017-4a2f-a60a-26befeb96e6d)
![6](https://github.com/byAbaddon/Phaser_Game_Tic_Tac_Toe/assets/51271834/89e61bb6-dc8f-4234-af25-df40ec6b43d3)




### Download
#### Created with Phaser 3 and converted for android mobile app.
##### download apk file:



### Prerequisites
- [Phaser 3](https://phaser.io)
#### Year:
2023

### Developer
By Abaddon

<br>
<br>

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
