import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, ORDER_LIFETIME, COLORS } from '../constants';
import { Order, OrderSystem } from '../systems/OrderSystem';

export class UIScene extends Phaser.Scene {
  private timerText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private orderContainers: Phaser.GameObjects.Container[] = [];
  private orderSystem: OrderSystem | null = null;

  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.drawHUD();
    this.addQuitButton();
    this.addControlsHint();

    // ESC to quit
    this.input.keyboard!.on('keydown-ESC', () => this.quitToMenu());
  }

  // ── HUD bar ──────────────────────────────────────────────────────────────

  private drawHUD() {
    // Outer shadow strip
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.5);
    shadow.fillRect(0, 0, GAME_WIDTH, 58);

    // Main HUD bar
    const hud = this.add.graphics();
    hud.fillStyle(0x1a0a00, 0.92);
    hud.fillRect(0, 0, GAME_WIDTH, 54);

    // HUD bottom border (orange glow line)
    hud.lineStyle(3, 0xff6f00, 0.9);
    hud.lineBetween(0, 54, GAME_WIDTH, 54);
    hud.lineStyle(1, 0xffa040, 0.4);
    hud.lineBetween(0, 57, GAME_WIDTH, 57);

    // ── Score section ──────────────────────────────────────────────────────
    const scoreBg = this.add.graphics();
    scoreBg.fillStyle(0xff6f00, 0.18);
    scoreBg.fillRoundedRect(10, 6, 130, 42, 8);
    scoreBg.lineStyle(1.5, 0xff6f00, 0.5);
    scoreBg.strokeRoundedRect(10, 6, 130, 42, 8);

    this.add.text(20, 10, 'SCORE', {
      fontSize: '11px', color: '#ff9800', fontStyle: 'bold', stroke: '#000', strokeThickness: 2,
    });
    this.scoreText = this.add.text(20, 24, '0', {
      fontSize: '22px', color: '#ffcc02', fontStyle: 'bold', stroke: '#000', strokeThickness: 4,
    });

    // ── Timer section (center) ─────────────────────────────────────────────
    const timerBg = this.add.graphics();
    timerBg.fillStyle(0x000000, 0.4);
    timerBg.fillRoundedRect(GAME_WIDTH / 2 - 70, 4, 140, 46, 10);
    timerBg.lineStyle(2, 0xffd600, 0.7);
    timerBg.strokeRoundedRect(GAME_WIDTH / 2 - 70, 4, 140, 46, 10);

    this.add.text(GAME_WIDTH / 2, 9, 'TIME', {
      fontSize: '11px', color: '#ffd600', fontStyle: 'bold', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5, 0);

    this.timerText = this.add.text(GAME_WIDTH / 2, 24, '3:00', {
      fontSize: '26px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 5,
    }).setOrigin(0.5, 0);

    // ── Orders header ──────────────────────────────────────────────────────
    const orderHdr = this.add.graphics();
    orderHdr.fillStyle(0xe65100, 0.9);
    orderHdr.fillRoundedRect(GAME_WIDTH - 178, 60, 168, 28, 6);
    orderHdr.lineStyle(2, 0xff9800, 0.7);
    orderHdr.strokeRoundedRect(GAME_WIDTH - 178, 60, 168, 28, 6);

    this.add.text(GAME_WIDTH - 94, 74, '★  ORDERS  ★', {
      fontSize: '13px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0.5);
  }

  private addQuitButton() {
    const bx = GAME_WIDTH - 90;
    const by = 8;
    const bw = 78;
    const bh = 38;

    const btnBg = this.add.graphics();
    btnBg.fillStyle(0x7f0000, 1);
    btnBg.fillRoundedRect(bx, by, bw, bh, 8);
    btnBg.fillStyle(0xc62828, 1);
    btnBg.fillRoundedRect(bx, by, bw, bh - 6, 8);
    btnBg.lineStyle(2, 0x000000, 0.8);
    btnBg.strokeRoundedRect(bx, by, bw, bh, 8);

    const btnText = this.add.text(bx + bw / 2, by + bh / 2 - 2, '✕  QUIT', {
      fontSize: '13px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

    // Make whole button interactive via a zone
    const zone = this.add.zone(bx, by, bw, bh).setOrigin(0).setInteractive({ useHandCursor: true });

    zone.on('pointerover', () => {
      btnBg.clear();
      btnBg.fillStyle(0xb71c1c, 1);
      btnBg.fillRoundedRect(bx, by, bw, bh, 8);
      btnBg.fillStyle(0xef5350, 1);
      btnBg.fillRoundedRect(bx, by, bw, bh - 6, 8);
      btnBg.lineStyle(2, 0xff5252, 0.9);
      btnBg.strokeRoundedRect(bx, by, bw, bh, 8);
    });

    zone.on('pointerout', () => {
      btnBg.clear();
      btnBg.fillStyle(0x7f0000, 1);
      btnBg.fillRoundedRect(bx, by, bw, bh, 8);
      btnBg.fillStyle(0xc62828, 1);
      btnBg.fillRoundedRect(bx, by, bw, bh - 6, 8);
      btnBg.lineStyle(2, 0x000000, 0.8);
      btnBg.strokeRoundedRect(bx, by, bw, bh, 8);
    });

    zone.on('pointerdown', () => this.quitToMenu());

    this.add.text(bx + bw / 2, by + bh - 5, 'or ESC', {
      fontSize: '8px', color: '#ff9999', stroke: '#000', strokeThickness: 1,
    }).setOrigin(0.5, 1);
  }

  private addControlsHint() {
    const hintBg = this.add.graphics();
    hintBg.fillStyle(0x000000, 0.45);
    hintBg.fillRoundedRect(10, GAME_HEIGHT - 30, 370, 22, 5);

    this.add.text(16, GAME_HEIGHT - 19, '🎮  P1: WASD + F   |   P2: ↑↓←→ + Enter   |   Hold to chop', {
      fontSize: '11px', color: '#aaaaaa',
    }).setOrigin(0, 0.5);
  }

  private quitToMenu() {
    this.scene.stop('UIScene');
    this.scene.stop('GameScene');
    this.scene.start('MenuScene');
  }

  // ── Public API ────────────────────────────────────────────────────────────

  setOrderSystem(os: OrderSystem) {
    this.orderSystem = os;
    this.refreshOrders(os.orders);
  }

  setTimer(ms: number) {
    const totalSec = Math.ceil(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    this.timerText.setText(`${min}:${sec.toString().padStart(2, '0')}`);
    if (ms < 30000) {
      this.timerText.setColor('#ff5252');
      if (Math.floor(ms / 500) % 2 === 0) this.timerText.setScale(1.05);
      else this.timerText.setScale(1.0);
    }
  }

  setScore(score: number) {
    this.scoreText.setText(score.toString());
  }

  refreshOrders(orders: Order[]) {
    for (const c of this.orderContainers) c.destroy();
    this.orderContainers = [];

    const startX = GAME_WIDTH - 175;
    const startY = 96;
    const cardH  = 96;

    orders.forEach((order, i) => {
      const c = this.add.container(startX, startY + i * (cardH + 8));
      this.orderContainers.push(c);

      const bg = this.add.graphics();

      // Card shadow
      bg.fillStyle(0x000000, 0.5);
      bg.fillRoundedRect(4, 4, 160, cardH, 10);

      // Card body
      bg.fillStyle(0x1c1005, 0.95);
      bg.fillRoundedRect(0, 0, 160, cardH, 10);

      // Header strip
      bg.fillStyle(0xe65100, 1);
      bg.fillRoundedRect(0, 0, 160, 24, 10);
      bg.fillRect(0, 14, 160, 10);

      // Border
      bg.lineStyle(2, 0xff9800, 0.7);
      bg.strokeRoundedRect(0, 0, 160, cardH, 10);
      c.add(bg);

      // Order label
      const label = this.add.text(80, 12, `ORDER  #${order.id}`, {
        fontSize: '11px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5, 0.5);
      c.add(label);

      // Ingredients list
      order.ingredients.forEach((ing, j) => {
        const color     = ing.type === 'lettuce' ? '#81c784' : '#e57373';
        const darkColor = ing.type === 'lettuce' ? 0x2e7d32  : 0xb71c1c;
        const iconG = this.add.graphics();
        if (ing.chopped) {
          iconG.fillStyle(darkColor, 1);
          iconG.fillRect(14, 30 + j * 22 - 5, 7, 8);
          iconG.fillRect(23, 30 + j * 22 - 5, 7, 8);
        } else {
          iconG.fillStyle(darkColor, 1);
          iconG.fillCircle(20, 30 + j * 22, 6);
        }
        c.add(iconG);

        const ingLabel = this.add.text(34, 30 + j * 22, `${ing.chopped ? '✂ Chopped ' : ''}${ing.type}`, {
          fontSize: '12px', color, stroke: '#000', strokeThickness: 2,
        }).setOrigin(0, 0.5);
        c.add(ingLabel);
      });

      // Timer bar
      const barY = cardH - 14;
      const barW = 148;
      const frac = order.timeLeft / order.maxTime;
      const barColor = frac > 0.5 ? 0x76ff03 : frac > 0.25 ? 0xffeb3b : 0xff5252;

      const timerBg = this.add.graphics();
      timerBg.fillStyle(0x333333, 1);
      timerBg.fillRoundedRect(6, barY, barW, 8, 4);
      c.add(timerBg);

      const timerFg = this.add.graphics();
      timerFg.fillStyle(barColor, 1);
      timerFg.fillRoundedRect(6, barY, barW * Math.max(frac, 0), 8, 4);
      c.add(timerFg);
    });
  }

  showFeedback(text: string, x: number, y: number, color: string) {
    const t = this.add.text(x, y - 40, text, {
      fontSize: '32px', color, stroke: '#000000', strokeThickness: 6, fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(100);

    this.tweens.add({
      targets: t,
      y: y - 120,
      alpha: 0,
      scaleX: 1.4,
      scaleY: 1.4,
      duration: 1400,
      ease: 'Power2',
      onComplete: () => t.destroy(),
    });
  }

  showGameOver(finalScore: number) {
    // Dim overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.8);
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Card background
    const card = this.add.graphics();
    card.fillStyle(0x1a0800, 1);
    card.fillRoundedRect(GAME_WIDTH / 2 - 300, GAME_HEIGHT / 2 - 180, 600, 360, 20);
    card.lineStyle(4, 0xff6f00, 1);
    card.strokeRoundedRect(GAME_WIDTH / 2 - 300, GAME_HEIGHT / 2 - 180, 600, 360, 20);
    card.lineStyle(1.5, 0xffa040, 0.4);
    card.strokeRoundedRect(GAME_WIDTH / 2 - 296, GAME_HEIGHT / 2 - 176, 592, 352, 18);

    // "TIME'S UP!" banner
    const bannerBg = this.add.graphics();
    bannerBg.fillStyle(0xc62828, 1);
    bannerBg.fillRect(GAME_WIDTH / 2 - 300, GAME_HEIGHT / 2 - 180, 600, 72);
    bannerBg.fillRoundedRect(GAME_WIDTH / 2 - 300, GAME_HEIGHT / 2 - 180, 600, 72, { tl: 20, tr: 20, bl: 0, br: 0 });

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 144, "TIME'S UP!", {
      fontSize: '52px', color: '#ffffff', stroke: '#000', strokeThickness: 8, fontStyle: 'bold',
    }).setOrigin(0.5);

    // Score display
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 'FINAL SCORE', {
      fontSize: '18px', color: '#ff9800', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20, finalScore.toString(), {
      fontSize: '72px', color: '#ffd600', fontStyle: 'bold', stroke: '#000', strokeThickness: 10,
    }).setOrigin(0.5);

    // Rating
    const rating = finalScore >= 1000 ? '⭐⭐⭐ MASTER CHEF!' : finalScore >= 500 ? '⭐⭐ SOUS CHEF!' : '⭐ KITCHEN APPRENTICE';
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 90, rating, {
      fontSize: '20px', color: '#ffcc02', stroke: '#000', strokeThickness: 4, fontStyle: 'bold',
    }).setOrigin(0.5);

    // Play again / quit buttons
    const playBtn = this.add.graphics();
    playBtn.fillStyle(0x1b5e20, 1);
    playBtn.fillRoundedRect(GAME_WIDTH / 2 - 140, GAME_HEIGHT / 2 + 130, 130, 44, 10);
    playBtn.fillStyle(0x2e7d32, 1);
    playBtn.fillRoundedRect(GAME_WIDTH / 2 - 140, GAME_HEIGHT / 2 + 130, 130, 38, 10);
    playBtn.lineStyle(2, 0x76ff03, 0.8);
    playBtn.strokeRoundedRect(GAME_WIDTH / 2 - 140, GAME_HEIGHT / 2 + 130, 130, 44, 10);

    const playText = this.add.text(GAME_WIDTH / 2 - 75, GAME_HEIGHT / 2 + 152, '▶  PLAY AGAIN', {
      fontSize: '14px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0.5);

    // Blink "play again"
    this.tweens.add({ targets: playText, alpha: 0.4, duration: 500, yoyo: true, repeat: -1 });

    const quitBtn = this.add.graphics();
    quitBtn.fillStyle(0x7f0000, 1);
    quitBtn.fillRoundedRect(GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 130, 130, 44, 10);
    quitBtn.fillStyle(0xc62828, 1);
    quitBtn.fillRoundedRect(GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 130, 130, 38, 10);
    quitBtn.lineStyle(2, 0xff5252, 0.8);
    quitBtn.strokeRoundedRect(GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 130, 130, 44, 10);

    this.add.text(GAME_WIDTH / 2 + 75, GAME_HEIGHT / 2 + 152, '✕  MAIN MENU', {
      fontSize: '14px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0.5);

    // Click zones
    const playZone = this.add.zone(GAME_WIDTH / 2 - 140, GAME_HEIGHT / 2 + 130, 130, 44)
      .setOrigin(0).setInteractive({ useHandCursor: true });
    const quitZone = this.add.zone(GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 130, 130, 44)
      .setOrigin(0).setInteractive({ useHandCursor: true });

    const restartGame = () => {
      this.scene.stop('UIScene');
      this.scene.stop('GameScene');
      this.scene.start('GameScene');
      this.scene.start('UIScene');
    };

    playZone.on('pointerdown', restartGame);
    quitZone.on('pointerdown', () => this.quitToMenu());

    this.input.keyboard!.once('keydown-SPACE', restartGame);
  }
}
