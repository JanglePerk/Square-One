/*
This is the class for running an instance of the game. loadStage() creates a
stage with given board data, which is currently represented as a constant at
the bottom of the file. draw() simply calls the stage's draw function. I have
yet to implement winning or losing mechanisms. The "RUN CODE" button runs
the assembled/written code.
*/

class Game {
    constructor (canvas) {
	     this.canvas = canvas;
	     this.canvas.style.borderBottom = Game.CANVAS_BORDER + "px solid skyblue";
	     this.canvas.x = canvas.getBoundingClientRect().x + Game.CANVAS_BORDER;
	     this.canvas.y = canvas.getBoundingClientRect().y + Game.CANVAS_BORDER;
	     this.ctx = canvas.getContext('2d');
	     this.stageLevel = 1;

	     this._createRunButton();
    }

    start() {
		this.loadStage();
		this.draw();
    }
    loadStage() {
		this.stage = new Stage(Game.BOARD_DATA, this.stageLevel, this.canvas);
		console.log("Stage Loaded");
		console.log(this.stage.board);
    }
    // 500x500 for every stage.
    draw() {
		this.stage.draw();
    }

    _createRunButton() {
		let button = document.createElement("button");
		button.innerText = "RUN CODE";
		button.style.position = "absolute";
		button.style.top = "10px";
		button.style.right = "20px";
		button.style.zIndex = "10";
		document.body.append(button);

		button.addEventListener('click', function() {
			this.stage.startActions();
		}.bind(this));

    }

}

Game.CANVAS_BORDER = 3
Game.BOARD_DATA = {
  1: {
      blocks: [
                [3, 2, 4],
                [3, 3, 1],
                [4, 3, 5]
              ]
      }
};
