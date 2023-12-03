export const timer = (dispatch, tetrisActions) => {
  const {timerTick, saveTimerId} = tetrisActions;

  const id = setInterval(() => {
    dispatch(timerTick());
  }, 1000);
  dispatch(saveTimerId(id));
}