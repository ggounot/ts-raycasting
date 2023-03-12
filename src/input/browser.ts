/// <reference path="./types.ts" />

const getBrowserInputmanager = (): InputManager => {
  const inputs: Input[] = [];

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        inputs.push(Input.START_UP);
        break;
      case "ArrowDown":
        inputs.push(Input.START_DOWN);
        break;
      case "ArrowLeft":
        inputs.push(Input.START_LEFT);
        break;
      case "ArrowRight":
        inputs.push(Input.START_RIGHT);
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowUp":
        inputs.push(Input.END_UP);
        break;
      case "ArrowDown":
        inputs.push(Input.END_DOWN);
        break;
      case "ArrowLeft":
        inputs.push(Input.END_LEFT);
        break;
      case "ArrowRight":
        inputs.push(Input.END_RIGHT);
        break;
    }
  });

  const getInputs = (): Input[] => {
    const inputsCopy = [...inputs];
    inputs.length = 0;
    return inputsCopy;
  };

  return { getInputs };
};
