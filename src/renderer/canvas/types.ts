interface Texture {
  [key: string]: HTMLImageElement;
}

interface CanvasRenderingValues {
  minimapCellSize: number;
  minimapMargin: number;
  minimapWidth: number;
  minimapHeight: number;
  projectionPlaneWidth: number;
  projectionPlaneHeight: number;
  projectionPlaneDistance: number;
  texture?: Texture;
}

interface CanvasRenderer extends Renderer {
  draw(state: GameState): void;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}
