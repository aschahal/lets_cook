import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../constants';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // Background
    const bg = this.add.graphics();
    bg.fillStyle(COLORS.FLOOR, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Title
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 160, "LET'S COOK!", {
      fontSize: '72px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70, 'An Overcooked-style Co-op Cooking Game', {
      fontSize: '24px',
      color: '#ffe082',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Controls info
    const p1Box = this.add.graphics();
    p1Box.fillStyle(COLORS.CHEF_1, 0.7);
    p1Box.fillRoundedRect(GAME_WIDTH / 2 - 320, GAME_HEIGHT / 2 - 10, 280, 120, 12);
    this.add.text(GAME_WIDTH / 2 - 180, GAME_HEIGHT / 2, 'Player 1', {
      fontSize: '20px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2 - 180, GAME_HEIGHT / 2 + 30, 'Move: WASD', {
      fontSize: '16px', color: '#e3f2fd',
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2 - 180, GAME_HEIGHT / 2 + 55, 'Interact: F', {
      fontSize: '16px', color: '#e3f2fd',
    }).setOrigin(0.5);

    const p2Box = this.add.graphics();
    p2Box.fillStyle(COLORS.CHEF_2, 0.7);
    p2Box.fillRoundedRect(GAME_WIDTH / 2 + 40, GAME_HEIGHT / 2 - 10, 280, 120, 12);
    this.add.text(GAME_WIDTH / 2 + 180, GAME_HEIGHT / 2, 'Player 2', {
      fontSize: '20px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2 + 180, GAME_HEIGHT / 2 + 30, 'Move: Arrow Keys', {
      fontSize: '16px', color: '#fff3e0',
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2 + 180, GAME_HEIGHT / 2 + 55, 'Interact: Enter', {
      fontSize: '16px', color: '#fff3e0',
    }).setOrigin(0.5);

    // Recipe info
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 155, 'Recipe: Salad = Chopped Lettuce + Chopped Tomato', {
      fontSize: '18px', color: '#c8e6c9', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5);

    // Start button
    const btnBg = this.add.graphics();
    btnBg.fillStyle(0xe53935, 1);
    btnBg.fillRoundedRect(GAME_WIDTH / 2 - 120, GAME_HEIGHT / 2 + 200, 240, 60, 12);

    const btnText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 230, 'PRESS SPACE TO START', {
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Blink
    this.tweens.add({
      targets: btnText,
      alpha: 0,
      duration: 600,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard!.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
      this.scene.start('UIScene');
      this.scene.stop('MenuScene');
    });
  }
}
