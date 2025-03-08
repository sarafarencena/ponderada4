class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  // carrega os assets
  preload() {
    this.load.image("background", "assets/background.jpg");
    this.load.image("win", "assets/win.png");
  }

  // adiciona os assets carregados em preload
  create() {
    let gameWidth = 800;
    let gameHeight = window.innerHeight;

    this.add.image(gameWidth / 2, gameHeight / 1.7, "background").setScale(1.5);

    this.add.image(gameWidth / 2, gameHeight / 2.5, "win").setScale(0.5);
  }

  update() {}
}
