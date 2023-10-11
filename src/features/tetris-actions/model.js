import { createSlice } from '@reduxjs/toolkit';
import { getRandomNumber } from '../../shared/helpers';

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
    addNewBlock: (state, {payload}) => {
      const widthField = state.field[0].length - 1;
      const coordinateX = getRandomNumber(0, widthField - 1);

      payload.forEach((i, indexI) => {
        i.forEach((j, indexJ) => {
          state.field[indexJ][indexI + coordinateX] = j
        })
      });
      state.fallingBlock = {
        figure: payload,
        coordinateX,
        coordinateY: 0
      }
    },
    stepDown: (state) => {
      state.fallingBlock.coordinateY++;
    },
    stepRight: (state) => {
      state.fallingBlock.coordinateX++;
    },
    stepLeft: (state) => {
      state.fallingBlock.coordinateX--;
    },
    ternLeft: (state) => {

    },
    ternRight: (state) => {

    },
    render: (state) => {
      const fallingBlock = state.fallingBlock;
      fallingBlock.figure.forEach((i, indexI) => {
        i.forEach((j, indexJ) => {
          state.field[indexJ + fallingBlock.coordinateY][indexI + fallingBlock.coordinateX] = j
        })
      })
    },
    saveId: (state, {payload}) => {
      state.keyOfGameFunction = payload
    }
  }
});

export const gameStarting = () => {
  return (dispatch) => {
    const id = setInterval(() => {
      dispatch(tetrisStateSlice.actions.stepDown())
      dispatch(tetrisStateSlice.actions.render())
    }, 2000)
    dispatch(tetrisStateSlice.actions.saveId(id))
  }
}

export const gameStop = () => {
  return (dispatch, getState) => {
    
  }
}

export default tetrisStateSlice.reducer;