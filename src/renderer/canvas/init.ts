/// <reference path="../../types.ts" />
/// <reference path="./texture.ts" />
/// <reference path="./types.ts" />

const getCanvasAndRenderingContext = (document: Document) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    throw "Could not found canvas element";
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw "Could not get canvas' 2D context";
  }

  return { canvas, ctx };
};

const setCanvasSize = (window: Window, canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const setCanvasRenderingValues = (
  renderingValues: CanvasRenderingValues,
  canvas: HTMLCanvasElement,
  gameState: GameState
) => {
  const nbCellWidth = gameState.map[0].length;
  const nbCellHeight = gameState.map.length;
  const minimapRatio = nbCellWidth / nbCellHeight;

  renderingValues.minimapHeight = canvas.height / 5;
  renderingValues.minimapWidth = renderingValues.minimapHeight * minimapRatio;
  renderingValues.minimapCellSize =
    renderingValues.minimapHeight / gameState.map.length;
  renderingValues.minimapMargin = renderingValues.minimapHeight / 10;
  renderingValues.projectionPlaneWidth = canvas.width;
  renderingValues.projectionPlaneHeight = canvas.height;
  renderingValues.projectionPlaneDistance =
    canvas.width / 2 / Math.tan(FOV / 2);
};

const initCanvasRenderer = async (
  window: Window,
  document: Document,
  renderingValues: CanvasRenderingValues,
  gameState: GameState
) => {
  const { canvas, ctx } = getCanvasAndRenderingContext(document);
  setCanvasSize(window, canvas);
  setCanvasRenderingValues(renderingValues, canvas, gameState);
  renderingValues.texture = loadTexture();
  window.addEventListener("resize", () => {
    setCanvasSize(window, canvas);
    setCanvasRenderingValues(renderingValues, canvas, gameState);
  });
  return { canvas, ctx };
};
