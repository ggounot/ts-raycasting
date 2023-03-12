/// <reference path="../types.ts" />
/// <reference path="../utils.ts" />

const updateControls = (
  controls: PlayerMovement,
  inputs: Input[]
): PlayerMovement => {
  const newControls = deepCopy(controls);

  inputs.forEach((input) => {
    switch (input) {
      case Input.START_UP:
        newControls.direction = PlayerDirection.Forward;
        break;
      case Input.START_DOWN:
        newControls.direction = PlayerDirection.Backward;
        break;
      case Input.END_UP:
        if (controls.direction === PlayerDirection.Forward) {
          newControls.direction = PlayerDirection.Standby;
        }
        break;
      case Input.END_DOWN:
        if (controls.direction === PlayerDirection.Backward) {
          newControls.direction = PlayerDirection.Standby;
        }
        break;
      case Input.START_LEFT:
        newControls.turn = PlayerTurn.Left;
        break;
      case Input.START_RIGHT:
        newControls.turn = PlayerTurn.Right;
        break;
      case Input.END_LEFT:
        if (controls.turn === PlayerTurn.Left) {
          newControls.turn = PlayerTurn.Standby;
        }
        break;
      case Input.END_RIGHT:
        if (controls.turn === PlayerTurn.Right) {
          newControls.turn = PlayerTurn.Standby;
        }
        break;
    }
  });

  return newControls;
};
