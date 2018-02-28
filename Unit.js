class Unit {
  constructor(canvas, x, y, w, h) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  moveBy(x, y) {
    this.x += y;
    this.y += x;
  }

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
