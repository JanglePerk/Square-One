class Action {
  constructor(type, canvas, x, y, w, h) {
    this.type = type;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.activated = false;

    switch(this.type) {
      case "R":
      this.typeSymbol = "👉"; break;
      case "U":
      this.typeSymbol = "👆"; break;
      case "L":
      this.typeSymbol = "👈"; break;
      case "D":
      this.typeSymbol = "👇"; break;


    }

    this.onMousemove = this.onMousemove.bind(this);

  }

  draw() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = Action.BGCOLOR;
    if (this.activated) {
      ctx.fillStyle = Action.BGACTIVATEDCOLOR;
    }
    CanvasHelper.fillRect(
      ctx,
      this.x, this.y, this.w, this.h,
      Action.PADDING
    );

    let fontSize = 30;

    ctx.fillStyle = Action.TEXT_COLOR;
    ctx.font = fontSize + "px serif";
    ctx.fillText(this.typeSymbol, this.x + this.w / 3, this.y + this.h * 3 / 4);
  }

  onMousedown(x, y) { // x, y: coord of the mouse click
    if (
      x > this.x && x < this.x + this.w &&
      y > this.y && y < this.y + this.h
    ) {
      this.activated = true;
      this.canvas.addEventListener('mousemove', this.onMousemove);
      return true;
    }
    return false;
  }

  onMousemove(evt) {
    let x = evt.clientX - this.canvas.x - this.w / 2;
    let y = evt.clientY - this.canvas.y - this.h / 2;
    this.x = x;
    this.y = y;
  }

  onMouseup() {
    this.activated = false;
    this.canvas.removeEventListener('mousemove', this.onMousemove);
  }
}

Action.PADDING = 5;
Action.BGCOLOR = "dodgerblue";
Action.BGACTIVATEDCOLOR = "green";
Action.TEXT_COLOR = "blue";
