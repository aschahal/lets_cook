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
  private walkFrame = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, playerId: number, controls: ChefControls) {
    super(scene, x, y);
    this.playerId = playerId;
    this.controls = controls;

    this.chefGraphic = scene.add.graphics();
    this.drawChef(false);
    this.add(this.chefGraphic);

    this.itemGraphic = scene.add.graphics();
    this.add(this.itemGraphic);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    const arcadeBody = this.body as Phaser.Physics.Arcade.Body;
    arcadeBody.setCollideWorldBounds(true);
    arcadeBody.setSize(36, 36);

    const kb = scene.input.keyboard!;
    this.keys = {
      up:       kb.addKey(controls.up),
      down:     kb.addKey(controls.down),
      left:     kb.addKey(controls.left),
      right:    kb.addKey(controls.right),
      interact: kb.addKey(controls.interact),
    };
  }

  private drawChef(moving: boolean) {
    this.chefGraphic.clear();

    const bodyColor  = this.playerId === 1 ? COLORS.CHEF_1 : COLORS.CHEF_2;
    const darkBody   = this.playerId === 1 ? 0x1565c0      : 0xe65100;
    const skin       = 0xffcc80;
    const darkSkin   = 0xffa040;
    const legBob     = moving ? Math.sin(this.walkFrame * 0.25) * 3 : 0;

    // ── Shadow ──────────────────────────────────────────────────────────────
    this.chefGraphic.fillStyle(0x000000, 0.3);
    this.chefGraphic.fillEllipse(2, 26, 40, 10);

    // ── Legs ────────────────────────────────────────────────────────────────
    this.chefGraphic.fillStyle(darkBody, 1);
    this.chefGraphic.fillRoundedRect(-12, 14 + legBob,  10, 14, 4);
    this.chefGraphic.fillRoundedRect(  2, 14 - legBob,  10, 14, 4);
    // Shoes
    this.chefGraphic.fillStyle(0x1a0a00, 1);
    this.chefGraphic.fillRoundedRect(-14, 26 + legBob, 14,  6, 3);
    this.chefGraphic.fillRoundedRect(  1, 26 - legBob, 14,  6, 3);

    // ── Body / jacket ───────────────────────────────────────────────────────
    this.chefGraphic.fillStyle(darkBody, 1);
    this.chefGraphic.fillRoundedRect(-17, 3, 34, 24, 10);
    this.chefGraphic.fillStyle(bodyColor, 1);
    this.chefGraphic.fillRoundedRect(-16, 2, 32, 22, 10);

    // Jacket lapels
    this.chefGraphic.fillStyle(darkBody, 0.5);
    this.chefGraphic.fillTriangle(-16, 2, -4, 2, -10, 22);
    this.chefGraphic.fillTriangle(16, 2, 4, 2, 10, 22);

    // ── Apron ───────────────────────────────────────────────────────────────
    this.chefGraphic.fillStyle(0xf5f5f5, 1);
    this.chefGraphic.fillRoundedRect(-9, 4, 18, 20, 5);
    // Apron pocket
    this.chefGraphic.fillStyle(0xe0e0e0, 1);
    this.chefGraphic.fillRoundedRect(-6, 14, 12, 8, 3);
    this.chefGraphic.lineStyle(1, 0xbdbdbd, 1);
    this.chefGraphic.strokeRoundedRect(-6, 14, 12, 8, 3);

    // ── Arms ────────────────────────────────────────────────────────────────
    const armSwing = moving ? Math.sin(this.walkFrame * 0.25) * 6 : 0;
    this.chefGraphic.fillStyle(bodyColor, 1);
    this.chefGraphic.fillRoundedRect(-26, 4 + armSwing,  10, 18, 5);
    this.chefGraphic.fillRoundedRect(16,  4 - armSwing,  10, 18, 5);
    // Hands
    this.chefGraphic.fillStyle(skin, 1);
    this.chefGraphic.fillCircle(-21, 22 + armSwing, 6);
    this.chefGraphic.fillCircle( 21, 22 - armSwing, 6);

    // ── Head ────────────────────────────────────────────────────────────────
    // Shadow under head
    this.chefGraphic.fillStyle(0x000000, 0.18);
    this.chefGraphic.fillCircle(1, -2, 19);
    // Head fill
    this.chefGraphic.fillStyle(darkSkin, 1);
    this.chefGraphic.fillCircle(0, -4, 18);
    this.chefGraphic.fillStyle(skin, 1);
    this.chefGraphic.fillCircle(0, -5, 17);

    // ── Chef hat ────────────────────────────────────────────────────────────
    // Brim
    this.chefGraphic.fillStyle(0xdddddd, 1);
    this.chefGraphic.fillRoundedRect(-18, -24, 36, 10, 4);
    this.chefGraphic.lineStyle(2, 0x888888, 0.6);
    this.chefGraphic.strokeRoundedRect(-18, -24, 36, 10, 4);
    // Tall crown
    this.chefGraphic.fillStyle(0xfafafa, 1);
    this.chefGraphic.fillRoundedRect(-12, -56, 24, 34, 6);
    // Crown highlight
    this.chefGraphic.fillStyle(0xffffff, 0.6);
    this.chefGraphic.fillRoundedRect(-9, -53, 8, 26, 4);
    // Crown shadow side
    this.chefGraphic.fillStyle(0x000000, 0.08);
    this.chefGraphic.fillRoundedRect(4, -53, 7, 26, 4);
    // Color band on hat
    this.chefGraphic.fillStyle(bodyColor, 1);
    this.chefGraphic.fillRect(-11, -32, 22, 5);
    this.chefGraphic.lineStyle(1, darkBody, 0.8);
    this.chefGraphic.strokeRect(-11, -32, 22, 5);

    // ── Face ────────────────────────────────────────────────────────────────
    // Eyes
    this.chefGraphic.fillStyle(0x2c1810, 1);
    this.chefGraphic.fillCircle(-6, -6, 3.5);
    this.chefGraphic.fillCircle( 6, -6, 3.5);
    // Irises
    this.chefGraphic.fillStyle(this.playerId === 1 ? 0x1565c0 : 0x8b4513, 1);
    this.chefGraphic.fillCircle(-6, -6, 2.5);
    this.chefGraphic.fillCircle( 6, -6, 2.5);
    // Shine
    this.chefGraphic.fillStyle(0xffffff, 1);
    this.chefGraphic.fillCircle(-5, -7, 1.2);
    this.chefGraphic.fillCircle( 7, -7, 1.2);
    // Smile
    this.chefGraphic.fillStyle(0x8d3c1e, 1);
    this.chefGraphic.fillRoundedRect(-5, -1, 10, 3, 2);
    // Rosy cheeks
    this.chefGraphic.fillStyle(0xffab91, 0.35);
    this.chefGraphic.fillCircle(-11, -4, 5);
    this.chefGraphic.fillCircle( 11, -4, 5);

    // ── Outline ─────────────────────────────────────────────────────────────
    this.chefGraphic.lineStyle(2.5, 0x1a0800, 0.85);
    this.chefGraphic.strokeCircle(0, -5, 17);
    this.chefGraphic.strokeRoundedRect(-16, 2, 32, 22, 10);
  }

  private drawHeldItem() {
    this.itemGraphic.clear();

    // Draw plate indicator if holding plate (no heldItem ingredient but has plate)
    const showPlate = (this as any).__showPlate;
    if (showPlate && !this.heldItem) {
      this.itemGraphic.fillStyle(0x9e9e9e, 1);
      this.itemGraphic.fillEllipse(0, -60, 36, 12);
      this.itemGraphic.fillStyle(0xfafafa, 1);
      this.itemGraphic.fillEllipse(0, -62, 32, 10);
      this.itemGraphic.lineStyle(2, 0x616161, 1);
      this.itemGraphic.strokeEllipse(0, -62, 32, 10);
      return;
    }

    if (!this.heldItem) return;

    const isLettuce = this.heldItem.type === 'lettuce';
    const color     = isLettuce ? 0x66bb6a : 0xef5350;
    const dark      = isLettuce ? 0x2e7d32 : 0xb71c1c;

    // Plate backdrop (when holding item + plate)
    if (showPlate) {
      this.itemGraphic.fillStyle(0xfafafa, 1);
      this.itemGraphic.fillEllipse(0, -60, 36, 12);
      this.itemGraphic.lineStyle(1.5, 0x9e9e9e, 1);
      this.itemGraphic.strokeEllipse(0, -60, 36, 12);
    }

    if (this.heldItem.chopped) {
      this.itemGraphic.fillStyle(dark, 1);
      this.itemGraphic.fillRoundedRect(-9, -70, 8, 8, 2);
      this.itemGraphic.fillRoundedRect(2, -70, 8, 8, 2);
      this.itemGraphic.fillStyle(color, 1);
      this.itemGraphic.fillRoundedRect(-8, -69, 6, 6, 2);
      this.itemGraphic.fillRoundedRect(3, -69, 6, 6, 2);
    } else {
      this.itemGraphic.fillStyle(dark, 1);
      this.itemGraphic.fillCircle(1, -65, 12);
      this.itemGraphic.fillStyle(color, 1);
      this.itemGraphic.fillCircle(0, -66, 11);
      this.itemGraphic.fillStyle(0xffffff, 0.35);
      this.itemGraphic.fillCircle(-3, -70, 4);
    }

    // Carry ring
    this.itemGraphic.lineStyle(2, 0xffffff, 0.6);
    this.itemGraphic.strokeCircle(0, -65, 15);
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

    if (this.keys.left.isDown)  vx = -PLAYER_SPEED;
    else if (this.keys.right.isDown) vx = PLAYER_SPEED;
    if (this.keys.up.isDown)    vy = -PLAYER_SPEED;
    else if (this.keys.down.isDown)  vy = PLAYER_SPEED;

    if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; }

    const moving = vx !== 0 || vy !== 0;
    if (moving) this.walkFrame++;

    arcadeBody.setVelocity(vx, vy);
    this.drawChef(moving);
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
