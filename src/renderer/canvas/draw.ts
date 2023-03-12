/// <reference path="./minimap.ts" />
/// <reference path="./projection.ts" />
/// <reference path="./types.ts" />

const draw = (
  ctx: CanvasRenderingContext2D,
  renderingValues: CanvasRenderingValues,
  gameState: GameState
) => {
  drawProjection(ctx, renderingValues, gameState);
  drawMinimap(ctx, renderingValues, gameState);
};
