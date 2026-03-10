import { IngredientType, MAX_ORDERS, ORDER_LIFETIME, ORDER_SPAWN_INTERVAL } from '../constants';
import { IngredientData } from '../objects/Ingredient';

export interface Order {
  id: number;
  ingredients: IngredientData[]; // what the plate needs
  timeLeft: number; // ms
  maxTime: number;
}

export class OrderSystem {
  public orders: Order[] = [];
  public score = 0;
  private nextId = 1;
  private spawnTimer = 5000; // first order after 5s
  private onOrdersChanged?: () => void;

  constructor(onOrdersChanged?: () => void) {
    this.onOrdersChanged = onOrdersChanged;
  }

  update(delta: number) {
    // Tick existing orders
    for (let i = this.orders.length - 1; i >= 0; i--) {
      this.orders[i].timeLeft -= delta;
      if (this.orders[i].timeLeft <= 0) {
        this.orders.splice(i, 1);
        this.onOrdersChanged?.();
      }
    }

    // Spawn new orders
    this.spawnTimer -= delta;
    if (this.spawnTimer <= 0 && this.orders.length < MAX_ORDERS) {
      this.spawnOrder();
      this.spawnTimer = ORDER_SPAWN_INTERVAL;
    }
  }

  private spawnOrder() {
    // Random salad recipe: always chopped lettuce + chopped tomato
    const order: Order = {
      id: this.nextId++,
      ingredients: [
        { type: IngredientType.LETTUCE, chopped: true },
        { type: IngredientType.TOMATO, chopped: true },
      ],
      timeLeft: ORDER_LIFETIME,
      maxTime: ORDER_LIFETIME,
    };
    this.orders.push(order);
    this.onOrdersChanged?.();
  }

  /** Try to fulfil an order with the given plate contents. Returns points earned or 0. */
  tryServe(plateContents: IngredientData[]): number {
    for (let i = 0; i < this.orders.length; i++) {
      const order = this.orders[i];
      if (this.matchesOrder(plateContents, order)) {
        const timeBonus = Math.floor((order.timeLeft / order.maxTime) * 50);
        const points = 100 + timeBonus;
        this.score += points;
        this.orders.splice(i, 1);
        this.onOrdersChanged?.();
        return points;
      }
    }
    return 0;
  }

  private matchesOrder(plate: IngredientData[], order: Order): boolean {
    if (plate.length !== order.ingredients.length) return false;
    const plateCopy = [...plate];
    for (const req of order.ingredients) {
      const idx = plateCopy.findIndex(
        (p) => p.type === req.type && p.chopped === req.chopped
      );
      if (idx === -1) return false;
      plateCopy.splice(idx, 1);
    }
    return true;
  }
}
