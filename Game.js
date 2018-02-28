class Game {
    constructor (canvas) {
	     this.canvas = canvas;
	     this.canvas.style.borderBottom = Game.CANVAS_BORDER + "px solid skyblue";
	     this.canvas.x = canvas.getBoundingClientRect().x + Game.CANVAS_BORDER;
	     this.canvas.y = canvas.getBoundingClientRect().y + Game.CANVAS_BORDER;
	     this.ctx = canvas.getContext('2d');
	     this.stageLevel = 1;

	     this._createStartButton();
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

    _createStartButton() {
		let button = document.createElement("button");
		button.innerText = "START";
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
  ],
  actions: ['L', 'F', 'B', 'R']
    }
};
/*
button {
position: absolute;
top: 10px;
right: 20px;
z-index: 10;
}
*/
