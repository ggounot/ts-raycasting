/// <reference path="./types.ts" />

const DEFAULT_GAME_STATE: GameState = {
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  controls: {
    direction: PlayerDirection.Standby,
    turn: PlayerTurn.Standby,
  },
  player: { coords: { x: 1.5, y: 1.5 }, angle: 0.3 },
  rays: [],
  rayCount: 0,
};

const FPS = 60;
const MOVE_VELOCITY = 0.2;
const TURN_VELOCITY = Math.PI / 30;
const FOV = Math.PI / 3;
