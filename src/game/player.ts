/// <reference path="../constants.ts" />
/// <reference path="../types.ts" />

const collide = (map: GameMap, coords: Coordinates): boolean =>
  map[Math.floor(coords.y)][Math.floor(coords.x)] === 1;

const getPlayerNewCoords = (
  map: GameMap,
  playerState: Player,
  playerControls: PlayerMovement
): Coordinates => {
  if (
    ![PlayerDirection.Forward, PlayerDirection.Backward].includes(
      playerControls.direction
    )
  ) {
    return playerState.coords;
  }

  const goingForward = playerControls.direction === PlayerDirection.Forward;
  const xDelta = Math.cos(playerState.angle) * MOVE_VELOCITY;
  const yDelta = Math.sin(playerState.angle) * MOVE_VELOCITY;

  const newX = goingForward
    ? playerState.coords.x + xDelta
    : playerState.coords.x - xDelta;
  const newY = goingForward
    ? playerState.coords.y + yDelta
    : playerState.coords.y - yDelta;

  const eligibleCoords: Coordinates[] = [
    { x: newX, y: newY }, // if no collision
    { x: newX, y: playerState.coords.y }, // if collision on new Y axis
    { x: playerState.coords.x, y: newY }, // if collision on new X axis
  ];

  return (
    eligibleCoords.find((coords) => !collide(map, coords)) || playerState.coords
  );
};

const getPlayerNewAngle = (
  oldAngle: number,
  playerControls: PlayerMovement
): number => {
  // Left of backward right turn
  if (
    (playerControls.direction !== PlayerDirection.Backward &&
      playerControls.turn === PlayerTurn.Left) ||
    (playerControls.direction === PlayerDirection.Backward &&
      playerControls.turn === PlayerTurn.Right)
  ) {
    const newAngle = oldAngle - TURN_VELOCITY;
    return newAngle < 0 ? newAngle + 2 * Math.PI : newAngle;
  }

  // Right or backward left turn
  if (
    (playerControls.direction !== PlayerDirection.Backward &&
      playerControls.turn === PlayerTurn.Right) ||
    (playerControls.direction === PlayerDirection.Backward &&
      playerControls.turn === PlayerTurn.Left)
  ) {
    return (oldAngle + TURN_VELOCITY) % (2 * Math.PI);
  }

  // No turn
  return oldAngle;
};

const updatePlayer = (
  map: GameMap,
  playerState: Player,
  playerControls: PlayerMovement
): Player => {
  const newPlayerState = deepCopy(playerState);

  newPlayerState.coords = getPlayerNewCoords(map, playerState, playerControls);
  newPlayerState.angle = getPlayerNewAngle(playerState.angle, playerControls);

  return newPlayerState;
};
