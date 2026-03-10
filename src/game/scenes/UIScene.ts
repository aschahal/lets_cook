import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, ORDER_LIFETIME, COLORS } from '../constants';
import { Order, OrderSystem } from '../systems/OrderSystem';

export class UIScene extends Phaser.Scene {
  private timerText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private orderContainers: Phaser.GameObjects.Container[] = [];
  private orderSystem: OrderSystem | null = null;
  private feedbackTexts: Phaser.GameObjects.Text[] = [];

  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // HUD background bar
    const hud = this.add.graphics();
    hud.fillStyle(0x000000, 0.55);
    hud.fillRect(0, 0, GAME_WIDTH, 52);

    // Timer
    this.add.text(GAME_WIDTH / 2 - 60, 10, 'TIME', {
      fontSize: '13px', color: '#aaaaaa',
    });
    this.timerText = this.add.text(GAME_WIDTH / 2, 10, '3:00', {
      fontSize: '28px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5, 0);

    // Score
    this.add.text(20, 10, 'SCORE', { fontSize: '13px', color: '#aaaaaa' });
    this.scoreText = this.add.text(20, 28, '0', {
      fontSize: '20px', color: '#76ff03', fontStyle: 'bold',
    });

    // Orders header
    this.add.text(GAME_WIDTH - 20, 60, 'ORDERS', {
      fontSize: '14px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(1, 0);

    // Controls reminder
    this.add.text(20, GAME_HEIGHT - 20, 'P1: WASD + F   |   P2: Arrows + Enter', {
      fontSize: '12px', color: '#888888',
    }).setOrigin(0, 1);
  }

  setOrderSystem(os: OrderSystem) {
    this.orderSystem = os;
    this.refreshOrders(os.orders);
  }

  setTimer(ms: number) {
    const totalSec = Math.ceil(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    this.timerText.setText(`${min}:${sec.toString().padStart(2, '0')}`);
    if (ms < 30000) this.timerText.setColor('#ff5252');
  }

  setScore(score: number) {
    this.scoreText.setText(score.toString());
  }

  refreshOrders(orders: Order[]) {
    // Clear existing
    for (const c of this.orderContainers) c.destroy();
    this.orderContainers = [];

    const startX = GAME_WIDTH - 160;
    const startY = 80;
    const cardH = 90;

    orders.forEach((order, i) => {
      const c = this.add.container(startX, startY + i * (cardH + 10));
      this.orderContainers.push(c);

      const bg = this.add.graphics();
      bg.fillStyle(0x212121, 0.85);
      bg.fillRoundedRect(0, 0, 150, cardH, 8);
      c.add(bg);

      // Timer bar
      const barW = 146;
      const frac = order.timeLeft / order.maxTime;
      const barColor = frac > 0.5 ? 0x76ff03 : frac > 0.25 ? 0xffeb3b : 0xff5252;
      const timerBg = this.add.graphics();
      timerBg.fillStyle(0x333333, 1);
      timerBg.fillRect(2, cardH - 12, barW, 8);
      c.add(timerBg);
      const timerFg = this.add.graphics();
      timerFg.fillStyle(barColor, 1);
      timerFg.fillRect(2, cardH - 12, barW * frac, 8);
      c.add(timerFg);

      // Recipe text
      const label = this.add.text(75, 8, `Order #${order.id}`, {
        fontSize: '12px', color: '#ffeb3b', fontStyle: 'bold',
      }).setOrigin(0.5, 0);
      c.add(label);

      order.ingredients.forEach((ing, j) => {
        const ingLabel = this.add.text(12, 28 + j * 20, `• ${ing.chopped ? 'Chopped ' : ''}${ing.type}`, {
          fontSize: '13px', color: '#e0e0e0',
        });
        c.add(ingLabel);
      });
    });
  }

  showFeedback(text: string, x: number, y: number, color: string) {
    const t = this.add.text(x, y - 40, text, {
      fontSize: '28px', color, stroke: '#000000', strokeThickness: 4, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: t,
      y: y - 100,
      alpha: 0,
      duration: 1200,
      ease: 'Power2',
      onComplete: () => t.destroy(),
    });
  }

  showGameOver(finalScore: number) {
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.75);
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80, 'TIME\'S UP!', {
      fontSize: '72px', color: '#ff5252', stroke: '#000', strokeThickness: 8, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20, `Final Score: ${finalScore}`, {
      fontSize: '42px', color: '#76ff03', stroke: '#000', strokeThickness: 6, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, 'Press SPACE to play again', {
      fontSize: '22px', color: '#ffffff', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5);

    this.input.keyboard!.once('keydown-SPACE', () => {
      this.scene.stop('UIScene');
      this.scene.stop('GameScene');
      this.scene.start('MenuScene');
    });
  }
}
