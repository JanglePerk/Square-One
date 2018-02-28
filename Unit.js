/*
This is a class for any units in the game. Currently, the only Unit is Player,
but additional Units can easily be added.
*/

class Unit {
  constructor(canvas, x, y, w, h) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // simple function to move Unit
  moveBy(x, y) {
    this.x += y;
    this.y += x;
  }

  // moves to specified location, making sure that the given location and the
  // current location are different.
  moveTo(x, y, callback) {
    let dx = x - this.x;
    let dy = y - this.y;

    if (dx < -0.1) dx = -0.1;
    if (dx > 0.1) dx = 0.1;
    if (dy < -0.1) dy = -0.1;
    if (dy > 0.1) dy = 0.1;

    this.x += x;
    this.y += y;

    if (dx === 0 && dy === 0) {
      callback();
      return;
    }
    let that = this;
    requestAnimationFrame(function() {
      that.moveTo(x, y, callback);
    });
  }

  // draws the Unit
  draw() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = Unit.BGCOLOR;
    ctx.fillRect(
      this.x, this.y, this.w, this.h
    );
  }
}

Unit.BGCOLOR = "black";
Unit.PADDING = 5;
