/// <reference path="./canvas/index.ts" />
/// <reference path="./types.ts" />

const getRenderer = async (defaultGameState: GameState): Promise<Renderer> => {
  const canvasRenderer = await getCanvasRenderer(defaultGameState);
  return canvasRenderer;
};
