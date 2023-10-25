import { createSlice } from '@reduxjs/toolkit';
import { getRandomNumber } from '../../shared/helpers';
import { FIGURES, getBlock } from '../../entities/tetris-blocks';
import { checkNextStep, addStepController, getFigureSize } from './helpers';

const initialState = {
  field: null,
  fallingBlock: null,
  keyOfGameFunction: null,
};

export const tetrisStateSlice = createSlice({
  name: 'tetrisField',
  initialState,
  reducers: {
    generateField: (state, {payload}) => {
      const field = [];
      for(let i = 0; i < payload.height; i++) {
        field[i] = [];
        for(let j = 0; j < payload.width; j++) {
          field[i][j] = false;
        }
      }
      state.field = field
    },
    addNewBlock: (state) => {
      const figure = getBlock(FIGURES);
      const { width, height } = getFigureSize(figure);
      const widthField = state.field[0].length - 1;
      const coordinateX = getRandomNumber(0, widthField - width);
      state.fallingBlock = {
        figure,
        coordinateX,
        coordinateY: 0,
        previosCoordinateX: coordinateX,
        previosCoordinateY: 0,
        width,
        height,
      }
    },
    stepDown: (state) => {
      state.fallingBlock.previosCoordinateY = state.fallingBlock.coordinateY++;
      state.fallingBlock.previosCoordinateX = state.fallingBlock.coordinateX;
    },
    stepRight: (state) => {
      state.fallingBlock.previosCoordinateX = state.fallingBlock.coordinateX++;
      state.fallingBlock.previosCoordinateY = state.fallingBlock.coordinateY;
    },
    stepLeft: (state) => {
      state.fallingBlock.previosCoordinateX = state.fallingBlock.coordinateX--;
      state.fallingBlock.previosCoordinateY = state.fallingBlock.coordinateY;
    },
    ternLeft : (state) => {

    },
    ternRight: (state) => {

    },
    updateField: (state) => {
      const fallingBlock = state.fallingBlock;
      const previosCoordinateX = fallingBlock.previosCoordinateX;
      const previosCoordinateY = fallingBlock.previosCoordinateY;
      fallingBlock.figure.forEach((i, indexI) => {
        i.forEach((j, indexJ) => {
          state.field[indexI + previosCoordinateY][indexJ + previosCoordinateX] = false
        })
      });
      fallingBlock.figure.forEach((i, indexI) => {
        i.forEach((j, indexJ) => {
          if(j) {
            state.field[indexI + fallingBlock.coordinateY][indexJ + fallingBlock.coordinateX] = j
          }
        })
      });
    },
    saveId: (state, {payload}) => {
      state.keyOfGameFunction = payload
    }
  }
});

export const gameStarting = () => {
  return (dispatch, getState) => {
    const tetrisActions = tetrisStateSlice.actions;
    !getState().tetris.fallingBlock && dispatch(tetrisActions.addNewBlock());
    dispatch(tetrisActions.updateField());
    addStepController(getState, dispatch, checkNextStep, tetrisActions)
    
    const id = setInterval(() => {
      if (checkNextStep(getState().tetris)) {
        dispatch(tetrisActions.stepDown())
      } else {
        dispatch(tetrisActions.addNewBlock())
      }
      dispatch(tetrisActions.updateField())
    }, 1000);
    dispatch(tetrisActions.saveId(id));
  }
};

// export const gameStop = () => {
//   return (dispatch, getState) => {
    
//   }
// }

export default tetrisStateSlice.reducer;