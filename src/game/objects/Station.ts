import * as Phaser from 'phaser';
import { StationType, COLORS, TILE_SIZE, IngredientType } from '../constants';
import { IngredientData } from './Ingredient';

export interface StationConfig {
  gridX: number;
  gridY: number;
  width?: number; // in tiles
  height?: number;
  type: StationType;
}

export class Station extends Phaser.GameObjects.Container {
  public stationType: StationType;
  public heldItem: IngredientData | null = null; // item placed on counter/board

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

    this.bg = scene.add.graphics();
    this.itemGraphic = scene.add.graphics();
    this.add(this.bg);
    this.add(this.itemGraphic);

    const color = this.getColor();
    this.bg.fillStyle(color, 1);
    this.bg.fillRect(-tw / 2, -th / 2, tw, th);
    this.bg.lineStyle(2, 0x000000, 0.5);
    this.bg.strokeRect(-tw / 2, -th / 2, tw, th);

    this.label = scene.add.text(0, th / 2 - 10, this.getLabel(), {
      fontSize: '11px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5, 1);
    this.add(this.label);

    // Physics body size stored for interaction detection
    (this as any).width = tw;
    (this as any).height = th;

    scene.add.existing(this);
  }

  private getColor(): number {
    switch (this.stationType) {
      case StationType.LETTUCE_STATION: return COLORS.LETTUCE_STATION;
      case StationType.TOMATO_STATION: return COLORS.TOMATO_STATION;
      case StationType.CHOPPING_BOARD: return COLORS.CHOPPING_BOARD;
      case StationType.PLATE_STATION: return COLORS.PLATE_STATION;
      case StationType.SERVING_WINDOW: return COLORS.SERVING_WINDOW;
      case StationType.COUNTER: return COLORS.COUNTER;
    }
  }

  private getLabel(): string {
    switch (this.stationType) {
      case StationType.LETTUCE_STATION: return 'Lettuce';
      case StationType.TOMATO_STATION: return 'Tomato';
      case StationType.CHOPPING_BOARD: return 'Chop';
      case StationType.PLATE_STATION: return 'Plates';
      case StationType.SERVING_WINDOW: return 'SERVE';
      case StationType.COUNTER: return '';
    }
  }

  placeItem(item: IngredientData | null) {
    this.heldItem = item;
    this.drawItem();
  }

  private drawItem() {
    this.itemGraphic.clear();
    if (!this.heldItem) return;

    const color = this.heldItem.type === IngredientType.LETTUCE ? COLORS.LETTUCE : COLORS.TOMATO;
    this.itemGraphic.fillStyle(color, 1);

    if (this.heldItem.chopped) {
      this.itemGraphic.fillRect(-12, -8, 10, 10);
      this.itemGraphic.fillRect(4, -8, 10, 10);
    } else {
      this.itemGraphic.fillCircle(0, -8, 12);
    }
  }

  getBounds(): Phaser.Geom.Rectangle {
    const w = (this as any).width as number;
    const h = (this as any).height as number;
    return new Phaser.Geom.Rectangle(this.x - w / 2, this.y - h / 2, w, h);
  }
}
