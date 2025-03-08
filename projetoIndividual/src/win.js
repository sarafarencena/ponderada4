class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  preload() {
    this.load.image("background", "assets/background.jpg");
    this.load.image("win", "assets/win.png");
  }

  create() {
    let gameWidth = 800;
    let gameHeight = window.innerHeight;

    this.add.image(gameWidth / 2, gameHeight / 1.7, "background").setScale(1.5);

    this.add.image(gameWidth / 2, gameHeight / 2.5, "win").setScale(.5);
  }

  update() {}
}
