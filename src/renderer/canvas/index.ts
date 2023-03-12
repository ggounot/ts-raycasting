/// <reference path="./draw.ts" />
/// <reference path="./init.ts" />
/// <reference path="./types.ts" />

const getCanvasRenderer = async (
  defaultGameState: GameState
): Promise<CanvasRenderer> => {
  const renderingValues: CanvasRenderingValues = {
    minimapCellSize: 0,
    minimapMargin: 0,
    minimapWidth: 0,
    minimapHeight: 0,
    projectionPlaneWidth: 0,
    projectionPlaneHeight: 0,
    projectionPlaneDistance: 0,
    texture: undefined,
  };
  const { canvas, ctx } = await initCanvasRenderer(
    window,
    document,
    renderingValues,
    defaultGameState
  );
  return {
    draw: (gameState) => draw(ctx, renderingValues, gameState),
    rayCount: () => renderingValues.projectionPlaneWidth,
    canvas,
    ctx,
  };
};
