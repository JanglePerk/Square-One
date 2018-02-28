/*
The player class, which extends Unit.
*/

class Player extends Unit {
  constructor(canvas, x, y, w, h) {
    super(canvas, x, y, w, h);
  }

  // executes all of the collected actions.
  runAction(action) {
    console.log(this.y);
    console.log(this.y - this.w);
    console.log(action.type);
    switch(action.type) {
      case "R":
      this.moveBy(this.w, 0);
      break;
      case "L":
      this.moveBy(-1 * this.w, 0);
      break;
      case "U":
      this.moveBy(0, -1 * this.w);
      break;
      case "D":
      this.moveBy(0, this.w);
      break;
    }
    console.log("action");
  }

  // updates the position of the player on the board.
  draw() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = "purple";
    ctx.arc(this.y + this.w / 2, this.x + this.h / 2, this.w / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}
