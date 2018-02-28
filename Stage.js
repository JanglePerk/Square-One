// 0 = water
// 1 - empty block
// 2 - monster
// 3 - box
// 4 - prize
// 5 - player

class Stage {
  constructor(stageInfo, stageLevel, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.board = []; // 2-D board grid
    this.actions = []; // 2-D actions
    this.workspace = [];
    this.player = new Player(this.canvas, canvas.width / 5, canvas.height / 5, 30, 30);
    this.units = [this.player];
    this.stageInfo = stageInfo;
    /* debugging */
     	// this.ctx.beginPath();
     	// this.ctx.fillRect(10, 10, dim.blockWidth / 4,dim.blockWidth / 4);

    this.boardDim = {
      x: 0,
      y: 0,
      boardLength: canvas.height,
      blockLength: canvas.height/ Stage.STAGE_SIZE
    };
    // this.actionsDim = {
    //   avail_x: 0,
    //   avail_y: 0,
    //   workspace_x : 20 + this.boardDim.boardLength,
    //   workspace_y : this.boardDim.y,
    //   avail_width: canvas.width,
    //   avail_height: canvas.height * 0.15,
    //   workspace_width: canvas.width - 20 - this.boardDim.boardLength - 10,
    //   workspace_height: this.boardDim.boardLength,
    //   blockWidth: canvas.width * 0.1,
    //   blockHeight: canvas.height * 0.1
    // };
    this._initBoard(stageLevel);

    /* event */
    canvas.addEventListener("mousedown", evt => {
      let x = evt.clientX - canvas.x; // clientX and clientY are from the upper lefthand corner of the screen
      let y = evt.clientY - canvas.y;
      for (let i = this.actions.length - 1; i >= 0; i--) {
        if (this.actions[i].onMousedown(x, y)) break;
      }
    });

    canvas.addEventListener("mouseup", evt => {
      this.actions.forEach(action => action.onMouseup());
    })

    // this.startActions();

    this.draw = this.draw.bind(this);
  }

  // startActions() {
  //   this.actions.forEach(action => {
  //     this.player.runAction(action);
  //   })
  //   this.player.runAction(this.actions[0]);
  // }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._drawBoard();
    // this._drawActions();
    this._drawUnits();
    requestAnimationFrame(this.draw);
  }

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
          else if (type == 5) {
            ctx.beginPath();
            ctx.fillStyle = "purple";
            ctx.arc(x + dim.blockLength / 2, y + dim.blockLength / 2, dim.blockLength / 4, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
        ctx.strokeRect(dim.x + cn * dim.blockLength, dim.y + rn * dim.blockLength, dim.blockLength, dim.blockLength);
      })
    })
  }

  // _drawActions() {
  //   let ctx = this.ctx;
  //   let actions = this.actions;
  //   let dim = this.actionsDim;
  //   let workspace = this.workspace;
  //
  //   ctx.beginPath();
  //   ctx.fillStyle = Stage.ACTIONS_BGCOLOR;
  //   ctx.fillRect(dim.avail_x, dim.avail_y, dim.avail_width, dim.avail_height);
  //   ctx.fillStyle = Action.TEXT_COLOR;
  //   let fontSize = 30;
  //   ctx.font = fontSize + "px serif";
  //   this.actions.forEach(a => a.draw());
  //   ctx.fillText("Available Actions", 5, 25);
  //   ctx.fillStyle = Stage.WORKSPACE_BGCOLOR;
  //   ctx.fillRect(dim.workspace_x, dim.workspace_y, dim.workspace_width, dim.workspace_height);
  //   ctx.fillStyle = Action.TEXT_COLOR;
  //   this.workspace.forEach(a => a.draw());
  //   ctx.fillText("Workspace", dim.workspace_x, dim.workspace_y * 0.95);
  // }

  _drawUnits() {
    this.units.forEach(u => u.draw());
  }

  _initBoard(stageLevel) {
    let board = new Array(Stage.STAGE_SIZE)
    .fill(0)
    .map(() => new Array(Stage.STAGE_SIZE).fill(0));
    // let data = this.stageInfo[stageLevel];
    let data = this.stageInfo[stageLevel];
    data.blocks.forEach(b => {
      board[b[0]][b[1]] = b[2];
    })

    this.board = board;
    // this.actions = data.actions.map((type, i) => {
    //   let x = this.actionsDim.x + this.actionsDim.blockWidth * i;
    //   let y = this.actionsDim.height / 3;
    //   return new Action(
    //     type,
    //     this.canvas,
    //     x,
    //     y,
    //     this.actionsDim.blockWidth,
    //     this.actionsDim.blockHeight);
    //   }); // TODO deep copy
      return board;
    }
  }

  Stage.STAGE_SIZE = 8;
  Stage.BOARD_LINE_COLOR = "rgba(0, 0, 0, 0.1)";
  Stage.CAPTION_TEXT_COLOR = "black";
  Stage.ACTIONS_BGCOLOR = "lightgray";
  Stage.WORKSPACE_BGCOLOR = "lightgray";
