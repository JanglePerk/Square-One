/*
This class represents an action that the player can make. The basic four
actions are moving up, down, left, or right. These actions can also be
drawn on a canvas using the draw() function. The constructor takes the
type of action as a string, the canvas, the coordinates of the top left
corner, the width, and the height. The latter four arguments are only
used for drawing the action.
*/

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

  }

  // draw function for drawing actions using a canvas
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
}

Action.PADDING = 5;
Action.BGCOLOR = "dodgerblue";
Action.BGACTIVATEDCOLOR = "green";
Action.TEXT_COLOR = "blue";
