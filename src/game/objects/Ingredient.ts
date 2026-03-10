import * as Phaser from 'phaser';
import { IngredientType, COLORS } from '../constants';

export interface IngredientData {
  type: IngredientType;
  chopped: boolean;
}

export class Ingredient extends Phaser.GameObjects.Container {
  public ingredientType: IngredientType;
  public chopped: boolean;

  private graphic: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, type: IngredientType, chopped = false) {
    super(scene, x, y);
    this.ingredientType = type;
    this.chopped = chopped;

    this.graphic = scene.add.graphics();
    this.add(this.graphic);
    this.draw();

    scene.add.existing(this);
  }

  private draw() {
    this.graphic.clear();
    const color = this.ingredientType === IngredientType.LETTUCE ? COLORS.LETTUCE : COLORS.TOMATO;
    const size = this.chopped ? 16 : 20;

    this.graphic.fillStyle(color, 1);
    if (this.chopped) {
      // Draw two small pieces to indicate chopped
      this.graphic.fillRect(-size, -size / 2, size, size);
      this.graphic.fillRect(4, -size / 2, size, size);
    } else {
      this.graphic.fillCircle(0, 0, size);
    }
  }

  setChopped(val: boolean) {
    this.chopped = val;
    this.draw();
  }

  getData(): IngredientData {
    return { type: this.ingredientType, chopped: this.chopped };
  }
}
