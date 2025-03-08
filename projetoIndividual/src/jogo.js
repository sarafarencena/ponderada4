// define a tela de jogo usando a biblioteca Phaser
class JogoScene extends Phaser.Scene {
  constructor() {
    super("JogoScene");
  }
  // carrega os assets
  preload() {
    this.load.image("ground", "assets/ground.jpg");
    this.load.image("background", "assets/background.jpg");
    this.load.image("platform1", "assets/platform1.png");
    this.load.image("platform2", "assets/platform2.png");
    this.load.image("diamond", "assets/diamond.png");
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  // adiciona os assets carregados no preload
  create() {
    let gameWidth = 800;
    let gameHeight = window.innerHeight;

    this.ground = this.physics.add
      .staticImage(gameWidth / 2, 575, "ground")
      .setScale(1.5);
    this.add
      .image(gameWidth / 2, gameHeight / 1.7, "background")
      .setScale(1.5);

    // localização dos diamantes
    const diamondsX = [50, 150, 250, 350, 450, 550, 650, 750, 850];

    // adiciona os diamantes e física a eles
    this.diamonds = this.physics.add.group();
    for (let i = 0; i < diamondsX.length - 1; i++) {
      let diamond = this.diamonds.create(diamondsX[i], 10, "diamond");
      diamond.setScale(0.15).setBounce(0.5);
    }

    // adiciona as plataformas, suas localizações e física a elas
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

    // adiciona o personagem e física a ele
    this.player = this.physics.add.sprite(400, 300, "player").setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(600);

    // adiciona animação ao personagem
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 24 }),
      frameRate: 10,
      repeat: -1,
    });

    // adiciona o teclado
    this.keyboard = this.input.keyboard.createCursorKeys();

    // adiciona colisão entre elementos
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

    // adiciona o placar
    this.score = 0;
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      fill: "#fff",
    });

    // adiciona overlap entre o player e os diamantes
    this.physics.add.overlap(
      this.player,
      this.diamonds,
      this.collectDiamonds,
      null,
      this
    );
  }

  collectDiamonds(player, diamond) {
    diamond.disableBody(true, true); // player encosta no diamante e o diamante some
    this.score += 1; // player pontua a cada diamante coletado
    this.scoreText.setText("Score: " + this.score);
    // condição para direcionar a cena "win" após coletar os 8 diamantes
    if (this.score === 8) {
      this.scene.start("WinScene");
    }
  }

  // atualiza o jogo, deixa em looping
  update() {
    if (this.keyboard.right.isDown) {
      this.player.setVelocityX(150);
      this.player.flipX = false;
    } else if (this.keyboard.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.flipX = true; // player vira de acordo com a seta pressionada
    } else {
      this.player.setVelocityX(0);
    }

    // player pula
    if (this.player.body.touching.down && this.keyboard.up.isDown) {
      this.player.setVelocityY(-500);
    }
  }
}
