/// <reference path="../../types.ts" />

const drawMap = (
  ctx: CanvasRenderingContext2D,
  renderingValues: CanvasRenderingValues,
  map: GameMap
) => {
  ctx.fillStyle = "black";
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 1) {
        ctx.fillRect(
          renderingValues.minimapMargin +
            colIndex * renderingValues.minimapCellSize,
          renderingValues.minimapMargin +
            rowIndex * renderingValues.minimapCellSize,
          renderingValues.minimapCellSize,
          renderingValues.minimapCellSize
        );
      }
    });
  });
};

const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  renderingValues: CanvasRenderingValues,
  playerState: Player
) => {
  ctx.beginPath();
  ctx.arc(
    renderingValues.minimapMargin +
      playerState.coords.x * renderingValues.minimapCellSize,
    renderingValues.minimapMargin +
      playerState.coords.y * renderingValues.minimapCellSize,
    renderingValues.minimapCellSize / 10,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.fill();
};

const drawRay = (
  ctx: CanvasRenderingContext2D,
  renderingValues: CanvasRenderingValues,
  ray: Ray
) => {
  ctx.beginPath();
  ctx.moveTo(
    renderingValues.minimapMargin +
      ray.start.x * renderingValues.minimapCellSize,
    renderingValues.minimapMargin +
      ray.start.y * renderingValues.minimapCellSize
  );
  ctx.lineTo(
    renderingValues.minimapMargin + ray.end.x * renderingValues.minimapCellSize,
    renderingValues.minimapMargin + ray.end.y * renderingValues.minimapCellSize
  );
  ctx.strokeStyle = "orange";
  ctx.stroke();
};

const drawRays = (
  ctx: CanvasRenderingContext2D,
  renderingValues: CanvasRenderingValues,
  rays: Ray[]
) => {
  rays.forEach((ray) => drawRay(ctx, renderingValues, ray));
};

const drawMinimap = (
  ctx: CanvasRenderingContext2D,
  renderingValues: CanvasRenderingValues,
  gameState: GameState
) => {
  drawMap(ctx, renderingValues, gameState.map);
  drawPlayer(ctx, renderingValues, gameState.player);
  drawRays(ctx, renderingValues, gameState.rays);
};
