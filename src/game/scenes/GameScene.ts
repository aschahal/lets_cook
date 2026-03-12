import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, TILE_SIZE, COLORS, StationType, IngredientType, GAME_DURATION, GRID_ROWS, GRID_COLS } from '../constants';
import { Chef } from '../objects/Chef';
import { Station } from '../objects/Station';
import { ChoppingBoard } from '../objects/ChoppingBoard';
import { IngredientData } from '../objects/Ingredient';
import { OrderSystem } from '../systems/OrderSystem';

// Plate is a special carried item type
export interface PlateData {
  contents: IngredientData[];
}

export class GameScene extends Phaser.Scene {
  private chefs: Chef[] = [];
  private stations: Station[] = [];
  private choppingBoards: ChoppingBoard[] = [];
  private orderSystem!: OrderSystem;
  private gameTimer = GAME_DURATION;
  public gameOver = false;

  // Each chef can hold either an ingredient OR a plate
  private chefPlates: (PlateData | null)[] = [null, null];

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.gameTimer = GAME_DURATION;
    this.gameOver  = false;
    this.chefPlates = [null, null];
    this.chefs = [];
    this.stations = [];
    this.choppingBoards = [];

    this.drawFloor();
    this.buildKitchen();
    this.buildPlayers();

    this.orderSystem = new OrderSystem(() => {
      const ui = this.scene.get('UIScene') as any;
      ui?.refreshOrders?.(this.orderSystem.orders);
    });

    const ui = this.scene.get('UIScene') as any;
    ui?.setOrderSystem?.(this.orderSystem);

    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  private drawFloor() {
    const floor = this.add.graphics();

    // Warm checkered kitchen tiles
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const light = (row + col) % 2 === 0;
        floor.fillStyle(light ? 0xf5e6cc : 0xebd5b3, 1);
        floor.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }

    // Grout lines
    floor.lineStyle(1.5, 0xc9a870, 0.45);
    for (let x = 0; x <= GAME_WIDTH; x += TILE_SIZE) floor.lineBetween(x, 0, x, GAME_HEIGHT);
    for (let y = 0; y <= GAME_HEIGHT; y += TILE_SIZE) floor.lineBetween(0, y, GAME_WIDTH, y);
  }

  private buildKitchen() {
    const walls = this.add.graphics();

    // Wall fill — warm brick
    walls.fillStyle(0x4e2b0f, 1);
    walls.fillRect(0, 0, GAME_WIDTH, TILE_SIZE);             // top
    walls.fillRect(0, GAME_HEIGHT - TILE_SIZE, GAME_WIDTH, TILE_SIZE); // bottom
    walls.fillRect(0, 0, TILE_SIZE, GAME_HEIGHT);            // left
    walls.fillRect(GAME_WIDTH - TILE_SIZE, 0, TILE_SIZE, GAME_HEIGHT); // right

    // Top face highlight on walls
    walls.fillStyle(0x7a4520, 1);
    walls.fillRect(0, 0, GAME_WIDTH, 6);
    walls.fillRect(TILE_SIZE, TILE_SIZE, GAME_WIDTH - 2 * TILE_SIZE, 4);
    walls.fillRect(TILE_SIZE, GAME_HEIGHT - TILE_SIZE, GAME_WIDTH - 2 * TILE_SIZE, 4);
    walls.fillRect(0, 0, 6, GAME_HEIGHT);
    walls.fillRect(GAME_WIDTH - 6, 0, 6, GAME_HEIGHT);

    // Brick mortar pattern on walls
    walls.lineStyle(1, 0x2d1506, 0.4);
    const brickW = 32, brickH = 16;
    for (let row = 0; row < 4; row++) {
      const offset = (row % 2) * (brickW / 2);
      for (let col = -1; col < GRID_COLS + 1; col++) {
        walls.strokeRect(col * brickW + offset, row * brickH, brickW, brickH);
      }
    }

    // ── Station layout ───────────────────────────────────────────────────────
    // Top row
    this.addStation({ gridX: 2,  gridY: 1, type: StationType.LETTUCE_STATION });
    this.addStation({ gridX: 4,  gridY: 1, type: StationType.TOMATO_STATION });
    this.addChoppingBoard({ gridX: 7,  gridY: 1 });
    this.addChoppingBoard({ gridX: 9,  gridY: 1 });
    this.addStation({ gridX: 12, gridY: 1, type: StationType.PLATE_STATION });

    // Serving windows (right side)
    this.addStation({ gridX: 17, gridY: 3, type: StationType.SERVING_WINDOW });
    this.addStation({ gridX: 17, gridY: 5, type: StationType.SERVING_WINDOW });

    // Middle counter island
    for (let gx = 6; gx <= 14; gx++) {
      this.addStation({ gridX: gx, gridY: 6, type: StationType.COUNTER });
    }

    // Bottom row (mirror of top)
    this.addStation({ gridX: 2,  gridY: 12, type: StationType.LETTUCE_STATION });
    this.addStation({ gridX: 4,  gridY: 12, type: StationType.TOMATO_STATION });
    this.addChoppingBoard({ gridX: 7,  gridY: 12 });
    this.addChoppingBoard({ gridX: 9,  gridY: 12 });
    this.addStation({ gridX: 12, gridY: 12, type: StationType.PLATE_STATION });
  }

  private addStation(cfg: { gridX: number; gridY: number; type: StationType }) {
    const s = new Station(this, { gridX: cfg.gridX, gridY: cfg.gridY, type: cfg.type });
    this.stations.push(s);
  }

  private addChoppingBoard(cfg: { gridX: number; gridY: number }) {
    const cb = new ChoppingBoard(this, { gridX: cfg.gridX, gridY: cfg.gridY });
    this.choppingBoards.push(cb);
    this.stations.push(cb);
  }

  private buildPlayers() {
    this.chefs[0] = new Chef(this, 3 * TILE_SIZE, 4 * TILE_SIZE, 1, {
      up: 'W', down: 'S', left: 'A', right: 'D', interact: 'F',
    });
    this.chefs[1] = new Chef(this, 3 * TILE_SIZE, 10 * TILE_SIZE, 2, {
      up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT', interact: 'ENTER',
    });
  }

  update(_time: number, delta: number) {
    if (this.gameOver) return;

    this.gameTimer -= delta;
    if (this.gameTimer <= 0) {
      this.gameTimer = 0;
      this.endGame();
      return;
    }

    const ui = this.scene.get('UIScene') as any;
    ui?.setTimer?.(this.gameTimer);
    ui?.setScore?.(this.orderSystem.score);

    this.orderSystem.update(delta);

    for (let i = 0; i < this.chefs.length; i++) {
      const chef = this.chefs[i];
      chef.update();
      this.handleInteraction(chef, i);

      // Hold-to-chop
      if (chef.isInteractDown()) {
        this.handleChopHold(chef);
      } else {
        this.handleChopRelease();
      }
    }

    for (const cb of this.choppingBoards) {
      cb.update(delta);
    }
  }

  private handleInteraction(chef: Chef, chefIdx: number) {
    if (!chef.isInteractJustDown()) return;

    const nearest = this.getNearestStation(chef);
    if (!nearest) return;

    const station = nearest;

    switch (station.stationType) {
      case StationType.LETTUCE_STATION:
      case StationType.TOMATO_STATION: {
        if (chef.heldItem === null && this.chefPlates[chefIdx] === null) {
          const type = station.stationType === StationType.LETTUCE_STATION
            ? IngredientType.LETTUCE
            : IngredientType.TOMATO;
          chef.pickUp({ type, chopped: false });
        }
        break;
      }

      case StationType.CHOPPING_BOARD: {
        const board = station as ChoppingBoard;
        if (chef.heldItem && !chef.heldItem.chopped) {
          if (!board.heldItem) {
            const item = chef.dropItem()!;
            board.placeItem(item);
          }
        } else if (!chef.heldItem && board.heldItem) {
          chef.pickUp(board.heldItem);
          board.placeItem(null);
        }
        break;
      }

      case StationType.PLATE_STATION: {
        if (chef.heldItem === null && this.chefPlates[chefIdx] === null) {
          this.chefPlates[chefIdx] = { contents: [] };
          (chef as any).__showPlate = true;
        }
        break;
      }

      case StationType.COUNTER: {
        if (chef.heldItem) {
          if (!station.heldItem) {
            const item = chef.dropItem()!;
            station.placeItem(item);
          }
        } else if (!chef.heldItem && station.heldItem) {
          chef.pickUp(station.heldItem);
          station.placeItem(null);
        } else if (this.chefPlates[chefIdx] !== null && station.heldItem) {
          const plate = this.chefPlates[chefIdx]!;
          plate.contents.push({ ...station.heldItem });
          station.placeItem(null);
          this.updatePlateDisplay(chef, chefIdx);
        }
        break;
      }

      case StationType.SERVING_WINDOW: {
        const plate = this.chefPlates[chefIdx];
        if (plate && plate.contents.length > 0) {
          const points = this.orderSystem.tryServe(plate.contents);
          this.chefPlates[chefIdx] = null;
          (chef as any).__showPlate = false;
          chef.dropItem();

          const ui = this.scene.get('UIScene') as any;
          if (points > 0) {
            ui?.showFeedback?.(`+${points}!`, station.x, station.y, '#76ff03');
          } else {
            ui?.showFeedback?.('No order!', station.x, station.y, '#ff5252');
          }
        }
        break;
      }
    }
  }

  private updatePlateDisplay(_chef: Chef, _chefIdx: number) {
    // Plate display handled by Chef.drawHeldItem via __showPlate flag
  }

  private getNearestStation(chef: Chef): Station | null {
    const range = TILE_SIZE * 1.4;
    let nearest: Station | null = null;
    let nearestDist = Infinity;

    for (const s of this.stations) {
      const dx = s.x - chef.x;
      const dy = s.y - chef.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < range && dist < nearestDist) {
        nearestDist = dist;
        nearest = s;
      }
    }
    return nearest;
  }

  handleChopHold(chef: Chef) {
    const nearest = this.getNearestStation(chef);
    if (!nearest || !(nearest instanceof ChoppingBoard)) return;
    const board = nearest as ChoppingBoard;
    if (board.heldItem && !board.heldItem.chopped && !board.isChopping) {
      board.startChopping();
    }
  }

  handleChopRelease() {
    for (const cb of this.choppingBoards) {
      cb.stopChopping();
    }
  }

  getChefPlate(idx: number): PlateData | null {
    return this.chefPlates[idx];
  }

  private endGame() {
    this.gameOver = true;
    const ui = this.scene.get('UIScene') as any;
    ui?.showGameOver?.(this.orderSystem.score);
  }
}
