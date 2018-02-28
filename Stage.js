/*
This is the class for Stages in the game. (Board and Stage are sometimes interchanged.)
Stages can be customized by creating something similar to Game.BOARD_DATA in Game.js:
STAGE_DATA = {
  1: {
      blocks: [
                [row, column, type],
              ]
      }
  2: {}, etc.
}
The six types of blocks available currently are:
0 = water
1 - empty block
2 - monster
3 - box
4 - prize
5 - player
*/

0 = water
1 - empty block
2 - monster
3 - box
4 - prize
5 - player

class Stage {
  constructor(stageInfo, stageLevel, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.board = []; // 2-D board grid
    this.actions = []; // 2-D actions
    this.icons = []; // representation of code using icons
    for (let i = 0; i < Object.keys(stageInfo[stageLevel].blocks).length; i++) {
      console.log(i);
      let block = stageInfo[stageLevel].blocks[i];
      if (block[2] == 5) {
        this.player = new Player(canvas,
                                 block[0] * canvas.height / Stage.STAGE_SIZE,
                                 block[1] * canvas.height / Stage.STAGE_SIZE,
                                 canvas.height / Stage.STAGE_SIZE,
                                 canvas.height / Stage.STAGE_SIZE);
        this.player_init = [block[0] * canvas.height / Stage.STAGE_SIZE,
                            block[1] * canvas.height / Stage.STAGE_SIZE];
        break;
      }
    }
    this.units = [this.player];
    this.stageInfo = stageInfo;

    // dimensions of the board
    this.boardDim = {
      x: 0,
      y: 0,
      boardLength: canvas.height,
      blockLength: canvas.height/ Stage.STAGE_SIZE
    };
    this._initBoard(stageLevel);

    // this.startActions();

    this.draw = this.draw.bind(this);
  }

  // resets the board
  restart() {
    this.player.x = this.player_init[0];
    this.player.y = this.player_init[1];
  }

  // takes the written or generated text code and changes it into executable
  // actions
  startActions() {
    let code = document.getElementById('codeDiv').value;
    this.actions = [];
    this.icons = [];
    let commands = code.split("\n");
    commands.forEach(action => {
      if (action.length > 0) {
        switch(action) {
          case "player.moveUp();":
            this.actions.push(new Action("U", this.canvas, 1, 1, 1, 1));
            this.icons.push("👆");
            break;
          case "player.moveLeft();":
            this.actions.push(new Action("L", this.canvas, 1, 1, 1, 1));
            this.icons.push("👈");
            break;
          case "player.moveRight();":
            this.actions.push(new Action("R", this.canvas, 1, 1, 1, 1));
            this.icons.push("👉");
            break;
          case "player.moveDown();":
            this.actions.push(new Action("D", this.canvas, 1, 1, 1, 1));
            this.icons.push("👇");
            break;
        }
      }
    });

    this.restart();
    this.actions.forEach(action => {
      this.player.runAction(action);
    });
    let iconBar = document.getElementById("icons");
    iconBar.value = "";
    for(let i = 0; i < this.icons.length; i++){
      if (i == 0) {
        iconBar.value += this.icons[i];
      }
      else {
        iconBar.value += "- > " + this.icons[i];
      }
    }
  }

  // calls various draw functions
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._drawBoard();
    this._drawUnits();
    requestAnimationFrame(this.draw);
  }

  // draws every part of the board
  _drawBoard() {
    let ctx = this.ctx;
    let board = this.board;
    let dim = this.boardDim;
    ctx.beginPath();
    ctx.strokeStyle = Stage.BOARD_LINE_COLOR;
    ctx.strokeRect(dim.x, dim.y, dim.boardLength, dim.boardLength);

    board.forEach((row, rn) => {
      row.forEach((col, cn) => {
        let x = dim.x + cn * dim.blockLength;
        let y = dim.y + rn * dim.blockLength;
        let type = col;
        if (type === 0) {
          ctx.beginPath();
          ctx.fillStyle = "blue";
          ctx.fillRect(x, y, dim.blockLength, dim.blockLength);
        }
        else {
          ctx.beginPath();
          ctx.fillStyle = "green";
          ctx.fillRect(x, y, dim.blockLength, dim.blockLength);
          if (type == 2) {
            ctx.fillStyle = "red"
            ctx.moveTo(x + dim.blockLength / 2, y + dim.blockLength / 4);
            ctx.lineTo(x + dim.blockLength / 4, y + dim.blockLength * 3 / 4);
            ctx.lineTo(x + dim.blockLength * 3 / 4, y + dim.blockLength * 3 / 4);
            ctx.closePath();
            ctx.fill();
          }
          else if (type == 3) {
            ctx.beginPath();
            ctx.fillStyle = "saddlebrown";
            ctx.fillRect(x + dim.blockLength / 4, y + dim.blockLength / 4, dim.blockLength / 2, dim.blockLength / 2);
          }
          else if (type == 4) {
            ctx.beginPath();
            ctx.fillStyle = "gold";
            let rot = Math.PI / 2 * 3;
            let step = Math.PI / 5;
            let tempX = x + dim.blockLength / 2;
            let tempY = y + dim.blockLength / 2;
            ctx.moveTo(tempX, tempY - dim.blockLength / 4);
            for (let i = 0; i < 5; i++) {
              tempX = x + dim.blockLength / 2 + Math.cos(rot) * dim.blockLength / 4;
              tempY = y + dim.blockLength / 2 + Math.sin(rot) * dim.blockLength / 4;
              ctx.lineTo(tempX, tempY);
              rot += step;

              tempX = x + dim.blockLength / 2 + Math.cos(rot) * 10;
              tempY = y + dim.blockLength / 2 + Math.sin(rot) * 10;
              ctx.lineTo(tempX, tempY);
              rot += step;
            }
            ctx.lineTo(x + dim.blockLength / 2, y + dim.blockLength / 4);
            ctx.closePath();
            ctx.fill();
          }
        }
        ctx.strokeRect(dim.x + cn * dim.blockLength, dim.y + rn * dim.blockLength, dim.blockLength, dim.blockLength);
      })
    })
    this.player.draw();
  }

  // draws units (only player for now)
  _drawUnits() {
    this.units.forEach(u => u.draw());
  }

  // sets up the inital board
  _initBoard(stageLevel) {
    document.getElementById("icons").style.height="200px";
    document.getElementById("icons").style.width="500px";
    document.getElementById("icons").style.fontSize="50pt";
    let board = new Array(Stage.STAGE_SIZE)
    .fill(0)
    .map(() => new Array(Stage.STAGE_SIZE).fill(0));
    let data = this.stageInfo[stageLevel];
    data.blocks.forEach(b => {
      board[b[0]][b[1]] = b[2];
    });
    this.board = board;
      return board;
    }
  }

  Stage.STAGE_SIZE = 8;
  Stage.BOARD_LINE_COLOR = "rgba(0, 0, 0, 0.1)";
  Stage.CAPTION_TEXT_COLOR = "black";
  Stage.ACTIONS_BGCOLOR = "lightgray";
  Stage.WORKSPACE_BGCOLOR = "lightgray";
