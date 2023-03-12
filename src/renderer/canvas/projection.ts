/// <reference path="../../types.ts" />

const drawCeiling = (
  ctx: CanvasRenderingContext2D,
  rayIndex: number,
  wallOffset: number
) => {
  ctx.beginPath();
  ctx.moveTo(rayIndex, 0);
  ctx.lineTo(rayIndex, wallOffset);
  ctx.strokeStyle = "lightblue";
  ctx.stroke();
};

const drawWall = (
  ctx: CanvasRenderingContext2D,
  rayIndex: number,
  ray: Ray,
  wallOffset: number,
  wallHeight: number,
  wallSide: CardinalDirection,
  texture?: Texture
) => {
  if (!texture) {
    return;
  }

  const wallTexture = [
    CardinalDirection.North,
    CardinalDirection.South,
  ].includes(wallSide)
    ? texture.wall
    : texture.wallLight;

  const sx = Math.floor(
    (([CardinalDirection.North, CardinalDirection.South].includes(wallSide)
      ? ray.end.x
      : ray.end.y) %
      1) *
      wallTexture.width
  );

  ctx.drawImage(
    wallTexture,
    sx,
    0,
    1,
    texture.wall.height,
    rayIndex,
    wallOffset,
    1,
    wallHeight
  );
};

const drawFloor = (
  ctx: CanvasRenderingContext2D,
  rayIndex: number,
  wallOffset: number,
  wallHeight: number,
  projectionPlanHeight: number
) => {
  ctx.beginPath();
  ctx.moveTo(rayIndex, wallOffset + wallHeight);
  ctx.lineTo(rayIndex, projectionPlanHeight);
  ctx.strokeStyle = "lightgreen";
  ctx.stroke();
};

const drawProjection = (
  ctx: CanvasRenderingContext2D,
  renderingValues: CanvasRenderingValues,
  gameState: GameState
) => {
  ctx.fillStyle = "white";
  ctx.fillRect(
    0,
    0,
    renderingValues.projectionPlaneWidth,
    renderingValues.projectionPlaneHeight
  );

  gameState.rays.forEach((ray, rayIndex) => {
    const wallHeight = renderingValues.projectionPlaneDistance / ray.distance;
    const wallOffset = (renderingValues.projectionPlaneHeight - wallHeight) / 2;
    drawCeiling(ctx, rayIndex, wallOffset);
    drawWall(
      ctx,
      rayIndex,
      ray,
      wallOffset,
      wallHeight,
      ray.origin,
      renderingValues.texture
    );
    drawFloor(
      ctx,
      rayIndex,
      wallOffset,
      wallHeight,
      renderingValues.projectionPlaneHeight
    );
  });
};
