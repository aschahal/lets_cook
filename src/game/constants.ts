export const TILE_SIZE = 64;
export const GRID_COLS = 20;
export const GRID_ROWS = 14;
export const GAME_WIDTH = TILE_SIZE * GRID_COLS;  // 1280
export const GAME_HEIGHT = TILE_SIZE * GRID_ROWS; // 896

export const PLAYER_SPEED = 220;
export const CHOP_DURATION = 2000; // ms to chop an ingredient
export const ORDER_LIFETIME = 45000; // ms before an order expires
export const GAME_DURATION = 180000; // 3 minutes
export const MAX_ORDERS = 3;
export const ORDER_SPAWN_INTERVAL = 12000; // ms between new orders

export const COLORS = {
  WALL: 0x3d2b1f,
  FLOOR: 0x8b7355,
  COUNTER: 0x6b5a3e,
  LETTUCE_STATION: 0x4caf50,
  TOMATO_STATION: 0xe53935,
  CHOPPING_BOARD: 0xd4a56a,
  PLATE_STATION: 0xe0e0e0,
  SERVING_WINDOW: 0xffeb3b,
  CHEF_1: 0x2196f3,
  CHEF_2: 0xff9800,
  LETTUCE: 0x66bb6a,
  TOMATO: 0xef5350,
  PLATE: 0xfafafa,
  PROGRESS_BAR_BG: 0x333333,
  PROGRESS_BAR_FG: 0x76ff03,
};

export enum IngredientType {
  LETTUCE = 'lettuce',
  TOMATO = 'tomato',
}

export enum StationType {
  LETTUCE_STATION = 'lettuce_station',
  TOMATO_STATION = 'tomato_station',
  CHOPPING_BOARD = 'chopping_board',
  PLATE_STATION = 'plate_station',
  SERVING_WINDOW = 'serving_window',
  COUNTER = 'counter',
}
