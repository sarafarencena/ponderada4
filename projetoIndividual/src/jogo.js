class JogoScene extends Phaser.Scene {
  constructor() {
    super("JogoScene");
  }

  preload() {
    this.load.image("ground", "./assets/ground.jpg");
    this.load.image("background", "./assets/background.jpg");
    this.load.image("platform1", "./assets/platform1.png");
    this.load.image("platform2", "./assets/platform2.png");
    this.load.image("diamond", "./assets/diamond.png");
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    let larguraJogo = 800;
    let alturaJogo = window.innerHeight;

    this.ground = this.physics.add
      .staticImage(larguraJogo / 2, 575, "ground")
      .setScale(1.5);
    this.add
      .image(larguraJogo / 2, alturaJogo / 1.7, "background")
      .setScale(1.5);

    const diamondsX = [50, 150, 250, 350, 450, 550, 650];

    this.diamonds = this.physics.add.group();
    for (let i = 0; i < diamondsX.length - 1; i++) {
      let diamond = this.diamonds.create(diamondsX[i], 10, "diamond");
      diamond.setScale(0.15).setBounce(0.7);
    }

    this.platform1 = this.physics.add.staticImage(75, 300, "platform1");
    this.platform2 = this.physics.add.staticImage(217, 300, "platform1");
    this.smallPlatform2 = this.physics.add
      .image(445, 404, "platform2")
      .setImmovable(true);
    this.smallPlatform3 = this.physics.add
      .image(700, 330, "platform2")
      .setImmovable(true);
    this.smallPlatform2.body.setAllowGravity(false);
    this.smallPlatform3.body.setAllowGravity(false);

    // Jogador
    this.player = this.physics.add.sprite(400, 300, "player").setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    // Animação
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 24 }),
      frameRate: 10,
      repeat: -1,
    });

    // Teclado
    this.teclado = this.input.keyboard.createCursorKeys();

    // Colisões
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platform1);
    this.physics.add.collider(this.player, this.platform2);
    this.physics.add.collider(this.player, this.smallPlatform2);
    this.physics.add.collider(this.player, this.smallPlatform3);
    this.physics.add.collider(this.diamonds, this.ground);
    this.physics.add.collider(this.diamonds, this.platform1);
    this.physics.add.collider(this.diamonds, this.platform2);
    this.physics.add.collider(this.diamonds, this.smallPlatform2);
    this.physics.add.collider(this.diamonds, this.smallPlatform3);

    // Placar
    this.score = 0;
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      fill: "#fff",
    });

    // Overlap entre player e diamantes
    this.physics.add.overlap(
      this.player,
      this.diamonds,
      this.coletarDiamante,
      null,
      this
    );
  }

  coletarDiamante(player, diamond) {
    diamond.disableBody(true, true); // Esconde e desativa o diamante
    this.score += 1;
    this.scoreText.setText("Score: " + this.score);
  }

  update() {
    if (this.teclado.right.isDown) {
      this.player.setVelocityX(150);
      this.player.flipX = false;
    } else if (this.teclado.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.flipX = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.player.body.touching.down && this.teclado.up.isDown) {
      this.player.setVelocityY(-500);
    }
  }
}
