const canvas = document.getElementById("gameCanvas");
canvas.width = 300;
canvas.height = 300;

const game = new Game(canvas);
game.start();
