// Creates padding for canvas.

class CanvasHelper {
  static fillRect(ctx, x, y, w, h, padding) {
    ctx.fillRect(x + padding,
      y + padding,
      w - padding * 2,
      h - padding * 2
    );
  }
}
