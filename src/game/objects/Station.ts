import * as Phaser from 'phaser';
import { StationType, COLORS, TILE_SIZE, IngredientType } from '../constants';
import { IngredientData } from './Ingredient';

export interface StationConfig {
  gridX: number;
  gridY: number;
  width?: number;
  height?: number;
  type: StationType;
}

export class Station extends Phaser.GameObjects.Container {
  public stationType: StationType;
  public heldItem: IngredientData | null = null;
  protected tw: number;
  protected th: number;

  private bg: Phaser.GameObjects.Graphics;
  private label: Phaser.GameObjects.Text;
  private itemGraphic: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, config: StationConfig) {
    const tw = (config.width ?? 1) * TILE_SIZE;
    const th = (config.height ?? 1) * TILE_SIZE;
    const px = config.gridX * TILE_SIZE + tw / 2;
    const py = config.gridY * TILE_SIZE + th / 2;

    super(scene, px, py);

    this.stationType = config.type;
    this.tw = tw;
    this.th = th;

    this.bg = scene.add.graphics();
    this.itemGraphic = scene.add.graphics();
    this.add(this.bg);
    this.add(this.itemGraphic);

    this.drawStation();

    const labelStyle = this.getLabelStyle();
    this.label = scene.add.text(0, th / 2 - 5, this.getLabel(), labelStyle).setOrigin(0.5, 1);
    this.add(this.label);

    (this as any).width = tw;
    (this as any).height = th;

    scene.add.existing(this);
  }

  protected drawStation() {
    const { tw, th } = this;
    const color = this.getColor();
    const bg = this.bg;

    // Drop shadow
    bg.fillStyle(0x000000, 0.4);
    bg.fillRoundedRect(-tw / 2 + 5, -th / 2 + 5, tw, th, 12);

    // Main body
    bg.fillStyle(color, 1);
    bg.fillRoundedRect(-tw / 2, -th / 2, tw, th, 12);

    // Top sheen (3D effect)
    bg.fillStyle(0xffffff, 0.22);
    bg.fillRoundedRect(-tw / 2 + 4, -th / 2 + 4, tw - 8, th * 0.42, 8);

    // Bottom shadow inner
    bg.fillStyle(0x000000, 0.12);
    bg.fillRoundedRect(-tw / 2 + 4, th / 2 - th * 0.28, tw - 8, th * 0.22, { bl: 8, br: 8, tl: 0, tr: 0 });

    // Outer border
    bg.lineStyle(3.5, 0x1a0800, 0.9);
    bg.strokeRoundedRect(-tw / 2, -th / 2, tw, th, 12);

    // Inner glow border
    bg.lineStyle(1.5, 0xffffff, 0.25);
    bg.strokeRoundedRect(-tw / 2 + 3, -th / 2 + 3, tw - 6, th - 6, 9);

    // Icon
    this.drawIcon(bg);
  }

  private drawIcon(bg: Phaser.GameObjects.Graphics) {
    const cy = -8;
    const cx = 0;

    switch (this.stationType) {
      case StationType.LETTUCE_STATION:
        // Layered lettuce leaves
        bg.fillStyle(0x1b5e20, 1);
        bg.fillCircle(cx, cy + 2, 13);
        bg.fillStyle(0x388e3c, 1);
        bg.fillCircle(cx - 7, cy + 4, 10);
        bg.fillCircle(cx + 7, cy + 4, 10);
        bg.fillStyle(0x4caf50, 1);
        bg.fillCircle(cx, cy - 2, 11);
        bg.fillStyle(0x81c784, 1);
        bg.fillCircle(cx, cy - 4, 7);
        bg.fillStyle(0xa5d6a7, 0.7);
        bg.fillCircle(cx - 2, cy - 6, 4);
        break;

      case StationType.TOMATO_STATION:
        // Shiny tomato
        bg.fillStyle(0x7f0000, 1);
        bg.fillCircle(cx + 1, cy + 3, 13);
        bg.fillStyle(0xc62828, 1);
        bg.fillCircle(cx, cy, 12);
        bg.fillStyle(0xef5350, 1);
        bg.fillCircle(cx - 1, cy - 1, 11);
        // Stem
        bg.fillStyle(0x1b5e20, 1);
        bg.fillRect(cx - 2, cy - 18, 3, 8);
        bg.fillStyle(0x2e7d32, 1);
        bg.fillRect(cx - 6, cy - 16, 5, 3);
        bg.fillRect(cx + 3, cy - 15, 5, 3);
        // Shine
        bg.fillStyle(0xff8a80, 0.55);
        bg.fillCircle(cx - 4, cy - 4, 5);
        bg.fillStyle(0xffffff, 0.3);
        bg.fillCircle(cx - 5, cy - 5, 3);
        break;

      case StationType.CHOPPING_BOARD:
        // Wooden board + knife
        bg.fillStyle(0x5d3a1a, 1);
        bg.fillRoundedRect(cx - 20, cy - 8, 40, 18, 4);
        bg.fillStyle(0xd4a56a, 1);
        bg.fillRoundedRect(cx - 19, cy - 7, 38, 16, 3);
        // Wood grain lines
        bg.lineStyle(1, 0xc49a52, 0.5);
        bg.lineBetween(cx - 14, cy - 4, cx + 14, cy - 4);
        bg.lineBetween(cx - 16, cy, cx + 16, cy);
        bg.lineBetween(cx - 14, cy + 4, cx + 14, cy + 4);
        // Knife
        bg.fillStyle(0x9e9e9e, 1);
        bg.fillRect(cx - 3, cy - 22, 6, 16);
        bg.fillStyle(0xc0c0c0, 1);
        bg.fillRect(cx - 2, cy - 21, 4, 14);
        bg.fillStyle(0x4a2c0a, 1);
        bg.fillRect(cx - 3, cy - 25, 6, 5);
        break;

      case StationType.PLATE_STATION:
        // Stacked plates
        bg.fillStyle(0x616161, 1);
        bg.fillEllipse(cx, cy + 8, 30, 8);
        bg.fillStyle(0xbdbdbd, 1);
        bg.fillEllipse(cx, cy + 4, 28, 7);
        bg.fillStyle(0x9e9e9e, 1);
        bg.fillEllipse(cx, cy, 30, 8);
        bg.fillStyle(0xe0e0e0, 1);
        bg.fillEllipse(cx, cy - 4, 28, 7);
        bg.fillStyle(0xf5f5f5, 1);
        bg.fillEllipse(cx, cy - 8, 30, 8);
        bg.fillStyle(0xfafafa, 1);
        bg.fillEllipse(cx, cy - 9, 26, 6);
        // Plate shine
        bg.fillStyle(0xffffff, 0.4);
        bg.fillEllipse(cx - 6, cy - 11, 10, 4);
        break;

      case StationType.SERVING_WINDOW:
        // Star burst
        for (let angle = 0; angle < 360; angle += 45) {
          const rad = (angle * Math.PI) / 180;
          const x1 = cx + Math.cos(rad) * 5;
          const y1 = cy + Math.sin(rad) * 5;
          const x2 = cx + Math.cos(rad) * 14;
          const y2 = cy + Math.sin(rad) * 14;
          bg.fillStyle(0xf57f17, 1);
          bg.fillTriangle(cx, cy, x1 - 4, y1 - 4, x2, y2);
          bg.fillTriangle(cx, cy, x1 + 4, y1 + 4, x2, y2);
        }
        bg.fillStyle(0xffd600, 1);
        bg.fillCircle(cx, cy, 8);
        bg.fillStyle(0xffff8d, 1);
        bg.fillCircle(cx - 2, cy - 2, 4);
        break;

      case StationType.COUNTER:
        // Subtle X cross etching
        bg.lineStyle(1, 0x000000, 0.08);
        bg.lineBetween(-this.tw / 2 + 8, -this.th / 2 + 8, this.tw / 2 - 8, this.th / 2 - 8);
        bg.lineBetween(this.tw / 2 - 8, -this.th / 2 + 8, -this.tw / 2 + 8, this.th / 2 - 8);
        break;
    }
  }

  private getColor(): number {
    switch (this.stationType) {
      case StationType.LETTUCE_STATION:  return 0x2e7d32;
      case StationType.TOMATO_STATION:   return 0xb71c1c;
      case StationType.CHOPPING_BOARD:   return 0xbf8a4c;
      case StationType.PLATE_STATION:    return 0x546e7a;
      case StationType.SERVING_WINDOW:   return 0xe65100;
      case StationType.COUNTER:          return 0x6d4c41;
    }
  }

  private getLabelStyle(): Phaser.Types.GameObjects.Text.TextStyle {
    const isServing = this.stationType === StationType.SERVING_WINDOW;
    return {
      fontSize: isServing ? '11px' : '10px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
      fontStyle: 'bold',
    };
  }

  private getLabel(): string {
    switch (this.stationType) {
      case StationType.LETTUCE_STATION:  return 'LETTUCE';
      case StationType.TOMATO_STATION:   return 'TOMATO';
      case StationType.CHOPPING_BOARD:   return 'CHOP';
      case StationType.PLATE_STATION:    return 'PLATES';
      case StationType.SERVING_WINDOW:   return '★ SERVE ★';
      case StationType.COUNTER:          return '';
    }
  }

  placeItem(item: IngredientData | null) {
    this.heldItem = item;
    this.drawItem();
  }

  private drawItem() {
    this.itemGraphic.clear();
    if (!this.heldItem) return;

    const isLettuce = this.heldItem.type === IngredientType.LETTUCE;
    const color     = isLettuce ? COLORS.LETTUCE    : COLORS.TOMATO;
    const darkColor = isLettuce ? 0x2e7d32          : 0xb71c1c;

    if (this.heldItem.chopped) {
      // Chopped pieces — two irregular chunks
      this.itemGraphic.fillStyle(darkColor, 1);
      this.itemGraphic.fillRoundedRect(-15, -12, 13, 13, 3);
      this.itemGraphic.fillRoundedRect(3, -12, 13, 13, 3);
      this.itemGraphic.fillStyle(color, 1);
      this.itemGraphic.fillRoundedRect(-14, -11, 11, 11, 2);
      this.itemGraphic.fillRoundedRect(4, -11, 11, 11, 2);
      // Shine
      this.itemGraphic.fillStyle(0xffffff, 0.25);
      this.itemGraphic.fillCircle(-9, -8, 3);
      this.itemGraphic.fillCircle(8, -8, 3);
    } else {
      // Whole ingredient — shaded sphere
      this.itemGraphic.fillStyle(darkColor, 1);
      this.itemGraphic.fillCircle(1, -6, 14);
      this.itemGraphic.fillStyle(color, 1);
      this.itemGraphic.fillCircle(0, -8, 13);
      // Shine
      this.itemGraphic.fillStyle(0xffffff, 0.35);
      this.itemGraphic.fillCircle(-4, -13, 5);
      this.itemGraphic.fillStyle(0xffffff, 0.2);
      this.itemGraphic.fillCircle(-3, -12, 3);
    }
  }

  getBounds(): Phaser.Geom.Rectangle {
    const w = (this as any).width as number;
    const h = (this as any).height as number;
    return new Phaser.Geom.Rectangle(this.x - w / 2, this.y - h / 2, w, h);
  }
}
