import * as Phaser from 'phaser';
import { CHOP_DURATION, COLORS, StationType } from '../constants';
import { Station, StationConfig } from './Station';
import { IngredientData } from './Ingredient';

export class ChoppingBoard extends Station {
  public isChopping = false;
  private chopProgress = 0; // 0..1
  private progressBg: Phaser.GameObjects.Graphics;
  private progressFg: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, config: Omit<StationConfig, 'type'>) {
    super(scene, { ...config, type: StationType.CHOPPING_BOARD });

    this.progressBg = scene.add.graphics();
    this.progressFg = scene.add.graphics();
    this.add(this.progressBg);
    this.add(this.progressFg);
  }

  startChopping() {
    if (!this.heldItem || this.heldItem.chopped || this.isChopping) return;
    this.isChopping = true;
    this.chopProgress = 0;
  }

  stopChopping() {
    this.isChopping = false;
    this.chopProgress = 0;
    this.drawProgress(0);
  }

  update(delta: number): boolean {
    // Returns true when chopping is complete
    if (!this.isChopping || !this.heldItem || this.heldItem.chopped) return false;

    this.chopProgress += delta / CHOP_DURATION;
    this.drawProgress(this.chopProgress);

    if (this.chopProgress >= 1) {
      this.isChopping = false;
      this.chopProgress = 0;
      this.drawProgress(0);
      if (this.heldItem) this.heldItem.chopped = true;
      this.placeItem(this.heldItem); // redraw item as chopped
      return true;
    }
    return false;
  }

  private drawProgress(progress: number) {
    this.progressBg.clear();
    this.progressFg.clear();

    if (progress <= 0) return;

    const barW = 48;
    const barH = 8;
    const bx = -barW / 2;
    const by = -36;

    this.progressBg.fillStyle(COLORS.PROGRESS_BAR_BG, 0.8);
    this.progressBg.fillRect(bx, by, barW, barH);

    this.progressFg.fillStyle(COLORS.PROGRESS_BAR_FG, 1);
    this.progressFg.fillRect(bx, by, barW * Math.min(progress, 1), barH);
  }
}
