class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("background", "assets/background.jpg");
    this.load.image("play", "assets/play.png");
    this.load.image("gameName", "assets/gameName.png");
    this.load.image("commands", "assets/commands.png");
  }

  create() {
    let gameWidth = 800;
    let gameHeight = window.innerHeight;

    this.add
      .image(gameWidth / 2, gameHeight / 1.7, "background")
      .setScale(1.5);

    this.add.image(gameWidth / 2, gameHeight / 4, "gameName").setScale(0.7);

    this.add.image(gameWidth / 2, gameHeight / 1.28, "commands").setScale(0.5);

    this.newGameButton = this.add
      .image(gameWidth / 2, gameHeight / 2, "play")
      .setInteractive()
      .setScale(0.5);

    this.newGameButton.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start("JogoScene");
    });
  }

  update() {}
}
