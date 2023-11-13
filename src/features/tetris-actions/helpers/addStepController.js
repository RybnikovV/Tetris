import { gameStart, gameStop } from '../model';

export function addStepController(getState, dispatch, checkNextStep, tetrisActions) {
  document.addEventListener('keydown', (e) => {
    const code = e.code;
    switch(code) {
      case 'ArrowRight':
        if (checkNextStep(getState().tetris, 'right')) {
          dispatch(tetrisActions.stepRight());
          dispatch(tetrisActions.updateField());
        }
        break;
      case 'ArrowLeft':
        if (checkNextStep(getState().tetris, 'left')) {
          dispatch(tetrisActions.stepLeft());
          dispatch(tetrisActions.updateField());
        }
        break;
      case 'ArrowDown':
        if (checkNextStep(getState().tetris)) {
          dispatch(tetrisActions.stepDown());
          dispatch(tetrisActions.updateField());
        }
        break;
      case 'ArrowUp': 
        dispatch(tetrisActions.tern());
        dispatch(tetrisActions.updateField());
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
  }) 
}