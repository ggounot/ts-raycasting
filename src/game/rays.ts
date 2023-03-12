/// <reference path="../constants.ts" />
/// <reference path="../types.ts" />

const getRayDirections = (angle: number): CardinalDirection[] => {
  const rayDirections: CardinalDirection[] = [];

  if (angle > 0 && angle < Math.PI) {
    rayDirections.push(CardinalDirection.South);
  } else {
    rayDirections.push(CardinalDirection.North);
  }

  if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
    rayDirections.push(CardinalDirection.West);
  } else {
    rayDirections.push(CardinalDirection.East);
  }

  return rayDirections;
};

const areCoordsOutOfMap = (coords: Coordinates, map: GameMap): boolean =>
  coords.x < 0 ||
  coords.x >= map[0].length ||
  coords.y < 0 ||
  coords.y >= map.length;

const areCoordsAWall = (coords: Coordinates, map: GameMap): boolean =>
  map[coords.y][coords.x] === 1;

const findCollisionCoords = (
  map: GameMap,
  coords: Coordinates,
  xOffset: number,
  yOffset: number,
  verticalDirection: boolean,
  facingDecreasingIndex: boolean
): Coordinates | null => {
  const directionOffset = facingDecreasingIndex ? -1 : 0;
  const cellCoords: Coordinates = verticalDirection
    ? {
        x: Math.floor(coords.x),
        y: coords.y + directionOffset,
      }
    : {
        x: coords.x + directionOffset,
        y: Math.floor(coords.y),
      };

  if (areCoordsOutOfMap(cellCoords, map)) {
    return null;
  }

  if (areCoordsAWall(cellCoords, map)) {
    return coords;
  }

  const nextCoordsToCheck = { x: coords.x + xOffset, y: coords.y + yOffset };

  return findCollisionCoords(
    map,
    nextCoordsToCheck,
    xOffset,
    yOffset,
    verticalDirection,
    facingDecreasingIndex
  );
};

const findVerticalCollisionCoords = (
  rayStartCoords: Coordinates,
  rayAngle: number,
  map: GameMap,
  facingDecreasingIndex: boolean
): Coordinates | null => {
  if (rayAngle === 0 || rayAngle === Math.PI) {
    return null;
  }

  const y = facingDecreasingIndex
    ? Math.floor(rayStartCoords.y)
    : Math.ceil(rayStartCoords.y);
  const x = rayStartCoords.x + (y - rayStartCoords.y) / Math.tan(rayAngle);
  const A = { x, y };

  const yOffset = facingDecreasingIndex ? -1 : 1;
  const xOffset = yOffset / Math.tan(rayAngle);

  const collidingCoords = findCollisionCoords(
    map,
    A,
    xOffset,
    yOffset,
    true,
    facingDecreasingIndex
  );

  return collidingCoords;
};

const findHorizontalCollidisionCoords = (
  rayStartCoords: Coordinates,
  rayAngle: number,
  map: GameMap,
  facingDecreasingIndex: boolean
): Coordinates | null => {
  if (rayAngle === Math.PI / 2 || rayAngle === Math.PI * 1.5) {
    return null;
  }

  const x = facingDecreasingIndex
    ? Math.floor(rayStartCoords.x)
    : Math.ceil(rayStartCoords.x);
  const y = rayStartCoords.y + (x - rayStartCoords.x) * Math.tan(rayAngle);
  const B = { x, y };

  const xOffset = facingDecreasingIndex ? -1 : 1;
  const yOffset = xOffset * Math.tan(rayAngle);

  const collidingCoords = findCollisionCoords(
    map,
    B,
    xOffset,
    yOffset,
    false,
    facingDecreasingIndex
  );

  return collidingCoords;
};

const getRay = (
  rayStartCoords: Coordinates,
  rayAngle: number,
  map: GameMap
): Ray => {
  const rayDirections = getRayDirections(rayAngle);

  const verticalCollisionCoords = findVerticalCollisionCoords(
    rayStartCoords,
    rayAngle,
    map,
    rayDirections.includes(CardinalDirection.North)
  );
  const horizontalCollisionCoords = findHorizontalCollidisionCoords(
    rayStartCoords,
    rayAngle,
    map,
    rayDirections.includes(CardinalDirection.West)
  );

  const verticalRay: Ray | null = verticalCollisionCoords && {
    start: rayStartCoords,
    end: verticalCollisionCoords,
    distance: Math.sqrt(
      (rayStartCoords.x - verticalCollisionCoords.x) ** 2 +
        (rayStartCoords.y - verticalCollisionCoords.y) ** 2
    ),
    origin: rayDirections.includes(CardinalDirection.North)
      ? CardinalDirection.North
      : CardinalDirection.South,
  };
  const horizontalRay: Ray | null = horizontalCollisionCoords && {
    start: rayStartCoords,
    end: horizontalCollisionCoords,
    distance: Math.sqrt(
      (rayStartCoords.x - horizontalCollisionCoords.x) ** 2 +
        (rayStartCoords.y - horizontalCollisionCoords.y) ** 2
    ),
    origin: rayDirections.includes(CardinalDirection.West)
      ? CardinalDirection.West
      : CardinalDirection.East,
  };

  if (verticalRay && horizontalRay) {
    // Use the coords that are closer to the player
    return verticalRay.distance < horizontalRay.distance
      ? verticalRay
      : horizontalRay;
  }

  return (verticalRay || horizontalRay) as Ray;
};

const fixDistortion = (ray: Ray, playerAngle: number, rayAngle: number) => ({
  ...ray,
  distance: ray.distance * Math.cos(playerAngle - rayAngle),
});

const getRays = (gameState: GameState): Ray[] => {
  const angleStep = FOV / gameState.rayCount;
  const angleStart = gameState.player.angle - FOV / 2;
  const rayStart = gameState.player.coords;

  const rays = [...Array(gameState.rayCount)].map((_, i) => {
    const rayAngle = (angleStart + i * angleStep) % (Math.PI * 2);
    const ray = getRay(rayStart, rayAngle, gameState.map);
    return fixDistortion(ray, gameState.player.angle, rayAngle);
  });

  return rays;
};
