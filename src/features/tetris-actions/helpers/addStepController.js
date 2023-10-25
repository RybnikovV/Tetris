export function addStepController(getState, dispatch, checkNextStep, tetrisActions) {
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    switch(key) {
      case 'ArrowRight':
        if (checkNextStep(getState().tetris, 'right')) {
          dispatch(tetrisActions.stepRight());
          dispatch(tetrisActions.updateField());
        }
        break;
      case 'ArrowLeft':
        if (checkNextStep(getState().tetris, 'left')) {
          dispatch(tetrisActions.stepLeft());
          dispatch(tetrisActions.updateField())
        }
        break;
      case 'ArrowDown':
        if (checkNextStep(getState().tetris)) {
          dispatch(tetrisActions.stepDown());
          dispatch(tetrisActions.updateField())
        }
        break;
      default:
        return
    }
  }) 
}