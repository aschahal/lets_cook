import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../constants';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.drawBackground();
    this.drawTitle();
    this.drawPlayerControls();
    this.drawRecipeGuide();
    this.drawRules();
    this.drawStartButton();
  }

  private drawBackground() {
    const bg = this.add.graphics();

    // Checkered kitchen floor
    const tileSize = 64;
    const cols = Math.ceil(GAME_WIDTH  / tileSize) + 1;
    const rows = Math.ceil(GAME_HEIGHT / tileSize) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bg.fillStyle((r + c) % 2 === 0 ? 0xf5e6cc : 0xe8d4ae, 1);
        bg.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
      }
    }
    // Grout lines
    bg.lineStyle(1, 0xc9a870, 0.35);
    for (let x = 0; x <= GAME_WIDTH; x += tileSize) bg.lineBetween(x, 0, x, GAME_HEIGHT);
    for (let y = 0; y <= GAME_HEIGHT; y += tileSize) bg.lineBetween(0, y, GAME_WIDTH, y);

    // Dark vignette overlay
    const vignette = this.add.graphics();
    vignette.fillStyle(0x000000, 0.55);
    vignette.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Wall top
    const wall = this.add.graphics();
    wall.fillStyle(0x3a1a06, 1);
    wall.fillRect(0, 0, GAME_WIDTH, 68);
    wall.fillStyle(0x5c2e10, 1);
    wall.fillRect(0, 0, GAME_WIDTH, 6);
    wall.fillStyle(0x7a4520, 0.6);
    wall.fillRect(0, 68, GAME_WIDTH, 4);

    // Decorative border lines
    const deco = this.add.graphics();
    deco.lineStyle(3, 0xff6f00, 0.85);
    deco.lineBetween(0, 72, GAME_WIDTH, 72);
    deco.lineStyle(1, 0xffa040, 0.4);
    deco.lineBetween(0, 76, GAME_WIDTH, 76);
  }

  private drawTitle() {
    const cx = GAME_WIDTH / 2;

    // Title plate
    const plate = this.add.graphics();
    plate.fillStyle(0x000000, 0.6);
    plate.fillRoundedRect(cx - 360, 82, 720, 110, 18);
    plate.fillStyle(0xe65100, 1);
    plate.fillRoundedRect(cx - 358, 80, 716, 108, 18);
    plate.fillStyle(0x1a0800, 0.8);
    plate.fillRoundedRect(cx - 354, 84, 708, 100, 14);
    plate.lineStyle(3, 0xff9800, 0.9);
    plate.strokeRoundedRect(cx - 358, 80, 716, 108, 18);
    plate.lineStyle(1, 0xffcc02, 0.4);
    plate.strokeRoundedRect(cx - 352, 86, 704, 96, 13);

    // Title text with heavy stroke
    this.add.text(cx + 4, 138, "LET'S COOK!", {
      fontSize: '80px', color: '#000000', fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(cx, 135, "LET'S COOK!", {
      fontSize: '80px', color: '#ffcc02', fontStyle: 'bold',
      stroke: '#c62800', strokeThickness: 12,
    }).setOrigin(0.5);

    this.add.text(cx, 205, 'An Overcooked-style Co-op Cooking Game', {
      fontSize: '20px', color: '#ffd180',
      stroke: '#000000', strokeThickness: 4,
    }).setOrigin(0.5);
  }

  private drawPlayerControls() {
    const cy = 290;
    const cx = GAME_WIDTH / 2;

    // ── Player 1 ─────────────────────────────────────────────────────────────
    const p1 = this.add.graphics();
    p1.fillStyle(0x000000, 0.5);
    p1.fillRoundedRect(cx - 360 + 4, cy + 4, 320, 130, 14);
    p1.fillStyle(COLORS.CHEF_1, 1);
    p1.fillRoundedRect(cx - 360, cy, 320, 130, 14);
    p1.fillStyle(0x000000, 0.35);
    p1.fillRoundedRect(cx - 360, cy, 320, 130, 14);
    p1.fillStyle(0xffffff, 0.1);
    p1.fillRoundedRect(cx - 358, cy + 2, 316, 54, 12);
    p1.lineStyle(3, 0x000000, 0.8);
    p1.strokeRoundedRect(cx - 360, cy, 320, 130, 14);
    p1.lineStyle(1, 0xffffff, 0.2);
    p1.strokeRoundedRect(cx - 357, cy + 3, 314, 124, 11);

    this.add.text(cx - 200, cy + 20, '🔵  PLAYER 1', {
      fontSize: '20px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 4,
    }).setOrigin(0.5);

    this.drawKeyChip(cx - 310, cy + 62, 'W', 'A', 'S', 'D');

    this.add.text(cx - 185, cy + 60, 'Move', {
      fontSize: '14px', color: '#e3f2fd', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0, 0.5);

    this.drawSingleKey(cx - 310, cy + 100, 'F');
    this.add.text(cx - 285, cy + 100, 'Interact / Hold to chop', {
      fontSize: '13px', color: '#e3f2fd', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0, 0.5);

    // ── Player 2 ─────────────────────────────────────────────────────────────
    const p2 = this.add.graphics();
    p2.fillStyle(0x000000, 0.5);
    p2.fillRoundedRect(cx + 40 + 4, cy + 4, 320, 130, 14);
    p2.fillStyle(COLORS.CHEF_2, 1);
    p2.fillRoundedRect(cx + 40, cy, 320, 130, 14);
    p2.fillStyle(0x000000, 0.35);
    p2.fillRoundedRect(cx + 40, cy, 320, 130, 14);
    p2.fillStyle(0xffffff, 0.1);
    p2.fillRoundedRect(cx + 42, cy + 2, 316, 54, 12);
    p2.lineStyle(3, 0x000000, 0.8);
    p2.strokeRoundedRect(cx + 40, cy, 320, 130, 14);

    this.add.text(cx + 200, cy + 20, '🟠  PLAYER 2', {
      fontSize: '20px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 4,
    }).setOrigin(0.5);

    this.drawArrowKeys(cx + 50, cy + 60);

    this.add.text(cx + 115, cy + 60, 'Move', {
      fontSize: '14px', color: '#fff3e0', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0, 0.5);

    this.drawSingleKey(cx + 50, cy + 100, 'ENTER');
    this.add.text(cx + 95, cy + 100, 'Interact / Hold to chop', {
      fontSize: '13px', color: '#fff3e0', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0, 0.5);
  }

  private drawKeyChip(x: number, y: number, up: string, left: string, down: string, right: string) {
    const keySize = 24;
    const gap = 4;
    const g = this.add.graphics();
    const keys = [
      { label: up,    dx: keySize + gap, dy: 0 },
      { label: left,  dx: 0,             dy: keySize + gap },
      { label: down,  dx: keySize + gap, dy: keySize + gap },
      { label: right, dx: (keySize + gap) * 2, dy: keySize + gap },
    ];
    for (const k of keys) {
      g.fillStyle(0x1a0a00, 1);
      g.fillRoundedRect(x + k.dx + 2, y + k.dy + 2, keySize, keySize, 4);
      g.fillStyle(0x424242, 1);
      g.fillRoundedRect(x + k.dx, y + k.dy, keySize, keySize, 4);
      g.fillStyle(0x616161, 1);
      g.fillRoundedRect(x + k.dx, y + k.dy, keySize, keySize - 4, 4);
      g.lineStyle(1.5, 0x000000, 0.7);
      g.strokeRoundedRect(x + k.dx, y + k.dy, keySize, keySize, 4);
      this.add.text(x + k.dx + keySize / 2, y + k.dy + keySize / 2 - 2, k.label, {
        fontSize: '12px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5, 0.5);
    }
  }

  private drawArrowKeys(x: number, y: number) {
    const g = this.add.graphics();
    const s = 22;
    const keys = [
      { label: '↑', dx: s + 3, dy: 0 },
      { label: '←', dx: 0,     dy: s + 3 },
      { label: '↓', dx: s + 3, dy: s + 3 },
      { label: '→', dx: (s + 3) * 2, dy: s + 3 },
    ];
    for (const k of keys) {
      g.fillStyle(0x1a0a00, 1);
      g.fillRoundedRect(x + k.dx + 2, y + k.dy + 2, s, s, 4);
      g.fillStyle(0x424242, 1);
      g.fillRoundedRect(x + k.dx, y + k.dy, s, s, 4);
      g.fillStyle(0x616161, 1);
      g.fillRoundedRect(x + k.dx, y + k.dy, s, s - 4, 4);
      g.lineStyle(1.5, 0x000000, 0.7);
      g.strokeRoundedRect(x + k.dx, y + k.dy, s, s, 4);
      this.add.text(x + k.dx + s / 2, y + k.dy + s / 2 - 2, k.label, {
        fontSize: '14px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5, 0.5);
    }
  }

  private drawSingleKey(x: number, y: number, label: string) {
    const w = label.length > 1 ? 50 : 24;
    const h = 24;
    const g = this.add.graphics();
    g.fillStyle(0x1a0a00, 1);
    g.fillRoundedRect(x + 2, y + 2, w, h, 4);
    g.fillStyle(0x424242, 1);
    g.fillRoundedRect(x, y, w, h, 4);
    g.fillStyle(0x616161, 1);
    g.fillRoundedRect(x, y, w, h - 4, 4);
    g.lineStyle(1.5, 0x000000, 0.7);
    g.strokeRoundedRect(x, y, w, h, 4);
    this.add.text(x + w / 2, y + h / 2 - 2, label, {
      fontSize: '11px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5, 0.5);
  }

  private drawRecipeGuide() {
    const cx = GAME_WIDTH / 2;
    const cy = 462;

    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.5);
    bg.fillRoundedRect(cx - 360 + 4, cy + 4, 720, 68, 14);
    bg.fillStyle(0x1a3a1a, 0.92);
    bg.fillRoundedRect(cx - 360, cy, 720, 68, 14);
    bg.lineStyle(2, 0x4caf50, 0.7);
    bg.strokeRoundedRect(cx - 360, cy, 720, 68, 14);

    this.add.text(cx, cy + 14, '📋  RECIPE', {
      fontSize: '14px', color: '#81c784', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0);

    this.add.text(cx, cy + 44, '🥗  Salad  =  Chopped Lettuce  +  Chopped Tomato  →  Plate  →  Serve', {
      fontSize: '16px', color: '#c8e6c9', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0.5);
  }

  private drawRules() {
    const cx = GAME_WIDTH / 2;
    const ry = 548;

    const ruleBg = this.add.graphics();
    ruleBg.fillStyle(0x000000, 0.5);
    ruleBg.fillRoundedRect(cx - 360 + 4, ry + 4, 720, 148, 14);
    ruleBg.fillStyle(0x10103a, 0.92);
    ruleBg.fillRoundedRect(cx - 360, ry, 720, 148, 14);
    ruleBg.lineStyle(2, 0x3f51b5, 0.7);
    ruleBg.strokeRoundedRect(cx - 360, ry, 720, 148, 14);

    // Header
    ruleBg.fillStyle(0x283593, 1);
    ruleBg.fillRoundedRect(cx - 360, ry, 720, 30, 14);
    ruleBg.fillRect(cx - 360, ry + 16, 720, 14);

    this.add.text(cx, ry + 15, '📖  HOW TO PLAY', {
      fontSize: '14px', color: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0.5);

    const rules = [
      ['🟢', 'Pick up ingredients from the Lettuce / Tomato stations.'],
      ['🔪', 'Place them on a Chopping Board, then HOLD interact to chop.'],
      ['🍽️', 'Grab a Plate from the Plate station.  Interact with counters to add chopped items.'],
      ['⭐', 'Deliver the plate to a Serving Window before the order timer runs out!'],
      ['💰', 'Score 100 pts per order + up to 50 bonus pts for speed.  3 minutes on the clock!'],
    ];

    rules.forEach(([icon, text], i) => {
      this.add.text(cx - 345, ry + 44 + i * 22, icon, {
        fontSize: '14px',
      });
      this.add.text(cx - 320, ry + 44 + i * 22, text, {
        fontSize: '13px', color: '#e8eaf6', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0, 0.5);
    });
  }

  private drawStartButton() {
    const cx = GAME_WIDTH / 2;
    const by = GAME_HEIGHT - 88;

    // Button shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.6);
    shadow.fillRoundedRect(cx - 188 + 4, by + 4, 376, 64, 16);

    // Button body
    const btn = this.add.graphics();
    btn.fillStyle(0x7f0000, 1);
    btn.fillRoundedRect(cx - 188, by, 376, 64, 16);
    btn.fillStyle(0xc62828, 1);
    btn.fillRoundedRect(cx - 188, by, 376, 56, 16);
    btn.fillStyle(0xef5350, 1);
    btn.fillRoundedRect(cx - 184, by + 3, 368, 24, 12);
    btn.lineStyle(3, 0x000000, 0.8);
    btn.strokeRoundedRect(cx - 188, by, 376, 64, 16);
    btn.lineStyle(1.5, 0xff8a80, 0.4);
    btn.strokeRoundedRect(cx - 184, by + 4, 368, 56, 13);

    const btnText = this.add.text(cx, by + 32, '▶   PRESS SPACE TO START', {
      fontSize: '24px', color: '#ffffff', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);

    this.add.text(cx, by + 60, 'Tip: You can quit mid-game with ESC or the QUIT button', {
      fontSize: '11px', color: '#ff9999', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5, 1);

    // Blink animation
    this.tweens.add({
      targets: btnText,
      alpha: 0.5,
      duration: 550,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Pulse scale on button
    this.tweens.add({
      targets: btn,
      scaleX: 1.02,
      scaleY: 1.02,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.input.keyboard!.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
      this.scene.start('UIScene');
      this.scene.stop('MenuScene');
    });
  }
}
