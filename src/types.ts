enum PlayerDirection {
  Forward,
  Backward,
  Standby,
}

enum PlayerTurn {
  Left,
  Right,
  Standby,
}

enum Input {
  START_UP,
  START_DOWN,
  START_LEFT,
  START_RIGHT,
  END_UP,
  END_DOWN,
  END_LEFT,
  END_RIGHT,
}

interface Coordinates {
  x: number;
  y: number;
}

interface PlayerMovement {
  direction: PlayerDirection;
  turn: PlayerTurn;
}

interface Player {
  coords: Coordinates;
  angle: number;
}

type GameMap = Array<Array<number>>;

enum CardinalDirection {
  North,
  East,
  South,
  West,
}

interface Ray {
  start: Coordinates;
  end: Coordinates;
  distance: number;
  origin: CardinalDirection;
}

interface GameState {
  map: GameMap;
  controls: PlayerMovement;
  player: Player;
  rayCount: number;
  rays: Ray[];
}
