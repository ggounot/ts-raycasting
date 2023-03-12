/// <reference path="./controls.ts" />
/// <reference path="./player.ts" />
/// <reference path="./rays.ts" />

const updateGameState = (gameState: GameState, inputs: Input[]): GameState => {
  const newGameState = deepCopy(gameState);

  newGameState.controls = updateControls(gameState.controls, inputs);
  newGameState.player = updatePlayer(
    gameState.map,
    gameState.player,
    newGameState.controls
  );
  newGameState.rays = getRays(newGameState);

  return newGameState;
};

const loop = (
  defaultGameState: GameState,
  inputManager: InputManager,
  renderer: Renderer
): void => {
  let gameState = deepCopy(defaultGameState);
  let lastTimestamp = performance.now();
  const stepDelay = 1000 / FPS;

  renderer.draw(defaultGameState);

  /* Get subsequent states and draw frames */
  const drawNextFrame = (timestamp: DOMHighResTimeStamp) => {
    if (timestamp - lastTimestamp > stepDelay) {
      const inputs = inputManager.getInputs();
      const rayCount = renderer.rayCount();

      gameState.rayCount = rayCount;
      gameState = updateGameState(gameState, inputs);

      renderer.draw(gameState);

      lastTimestamp = timestamp;
    }
    requestAnimationFrame(drawNextFrame);
  };

  requestAnimationFrame(drawNextFrame);
};
