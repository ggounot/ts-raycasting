/// <reference path="./browser.ts" />
/// <reference path="./types.ts" />

const getInputManager = (): InputManager => {
  const browserInputManager = getBrowserInputmanager();
  return browserInputManager;
};
