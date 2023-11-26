import { gameStart, gameStop } from '../model';

export function addStepController(getState, dispatch, checkNextStep, tetrisActions) {
  document.addEventListener('keydown', (e) => {
    const code = e.code;
    switch(code) {
      case 'ArrowRight':
        if (checkNextStep(getState().tetris, 'right')) {
          dispatch(tetrisActions.stepRight());
        }
        break;
      case 'ArrowLeft':
        if (checkNextStep(getState().tetris, 'left')) {
          dispatch(tetrisActions.stepLeft());
        }
        break;
      case 'ArrowDown':
        if (checkNextStep(getState().tetris)) {
          dispatch(tetrisActions.stepDown())
        }
        break;
      case 'ArrowUp':
        if (checkNextStep(getState().tetris, 'tern')) {
          dispatch(tetrisActions.tern());
        }
        break;
      case 'Space':
        if (getState().tetris.keyOfGameFunction) {
          gameStop(dispatch, getState)
        } else {
          dispatch(gameStart())
        }
      default:
        return
    }
    dispatch(tetrisActions.updateField());
  }) 
}