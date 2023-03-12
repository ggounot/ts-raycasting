/// <reference path="./constants.ts" />
/// <reference path="./game/index.ts" />
/// <reference path="./input/index.ts" />
/// <reference path="./renderer/index.ts" />

const main = async (): Promise<void> => {
  const inputManager = getInputManager();
  const renderer = await getRenderer(DEFAULT_GAME_STATE);
  loop(DEFAULT_GAME_STATE, inputManager, renderer);
};

main();
