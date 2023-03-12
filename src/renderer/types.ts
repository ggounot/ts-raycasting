interface Renderer {
  draw(state: GameState): void;
  rayCount(): number;
}
