import * as Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // No external assets — all graphics are programmatic
  }

  create() {
    this.scene.start('MenuScene');
  }
}
