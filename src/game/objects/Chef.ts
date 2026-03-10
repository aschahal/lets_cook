import * as Phaser from 'phaser';
import { PLAYER_SPEED, COLORS } from '../constants';
import { IngredientData } from './Ingredient';

export interface ChefControls {
  up: string;
  down: string;
  left: string;
  right: string;
  interact: string;
}

export class Chef extends Phaser.GameObjects.Container {
  public heldItem: IngredientData | null = null;
  public playerId: number;
  private chefGraphic: Phaser.GameObjects.Graphics;
  private itemGraphic: Phaser.GameObjects.Graphics;
  private controls: ChefControls;
  private keys: Record<string, Phaser.Input.Keyboard.Key> = {};

  constructor(scene: Phaser.Scene, x: number, y: number, playerId: number, controls: ChefControls) {
    super(scene, x, y);
    this.playerId = playerId;
    this.controls = controls;

    this.chefGraphic = scene.add.graphics();
    this.drawChef();
    this.add(this.chefGraphic);

    this.itemGraphic = scene.add.graphics();
    this.add(this.itemGraphic);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    const arcadeBody = this.body as Phaser.Physics.Arcade.Body;
    arcadeBody.setCollideWorldBounds(true);
    arcadeBody.setSize(40, 40);

    const kb = scene.input.keyboard!;
    this.keys = {
      up: kb.addKey(controls.up),
      down: kb.addKey(controls.down),
      left: kb.addKey(controls.left),
      right: kb.addKey(controls.right),
      interact: kb.addKey(controls.interact),
    };
  }

  private drawChef() {
    this.chefGraphic.clear();
    const color = this.playerId === 1 ? COLORS.CHEF_1 : COLORS.CHEF_2;
    this.chefGraphic.fillStyle(color, 1);
    this.chefGraphic.fillCircle(0, 0, 20);
    this.chefGraphic.fillStyle(0xffffff, 1);
    this.chefGraphic.fillRect(-10, -28, 20, 14);
    this.chefGraphic.fillRect(-14, -16, 28, 6);
  }

  private drawHeldItem() {
    this.itemGraphic.clear();
    if (!this.heldItem) return;

    const color = this.heldItem.type === 'lettuce' ? COLORS.LETTUCE : COLORS.TOMATO;
    this.itemGraphic.fillStyle(color, 1);

    if (this.heldItem.chopped) {
      this.itemGraphic.fillRect(-8, -52, 7, 7);
      this.itemGraphic.fillRect(3, -52, 7, 7);
    } else {
      this.itemGraphic.fillCircle(0, -50, 10);
    }

    this.itemGraphic.lineStyle(2, 0xffffff, 1);
    this.itemGraphic.strokeCircle(0, -50, 14);
  }

  isInteractJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.keys.interact);
  }

  isInteractDown(): boolean {
    return this.keys.interact.isDown;
  }

  update() {
    const arcadeBody = this.body as Phaser.Physics.Arcade.Body;
    let vx = 0;
    let vy = 0;

    if (this.keys.left.isDown) vx = -PLAYER_SPEED;
    else if (this.keys.right.isDown) vx = PLAYER_SPEED;

    if (this.keys.up.isDown) vy = -PLAYER_SPEED;
    else if (this.keys.down.isDown) vy = PLAYER_SPEED;

    if (vx !== 0 && vy !== 0) {
      vx *= 0.707;
      vy *= 0.707;
    }

    arcadeBody.setVelocity(vx, vy);
    this.drawHeldItem();
  }

  pickUp(item: IngredientData) {
    this.heldItem = { ...item };
    this.drawHeldItem();
  }

  dropItem(): IngredientData | null {
    const item = this.heldItem;
    this.heldItem = null;
    this.itemGraphic.clear();
    return item;
  }
}
