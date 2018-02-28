class Player extends Unit {
  constructor(canvas, x, y, w, h) {
    super(canvas, x, y, w, h);
  }

  runAction(action) {
    switch(action.type) {
      case "R":
      this.moveBy(30, 0);
      break;
      case "L":
      this.moveBy(-30, 0);
      break;
      case "F":
      this.moveBy(0, -30);
      break;
      case "B":
      this.moveBy(0, 30);
      break;
    }
  }
}
