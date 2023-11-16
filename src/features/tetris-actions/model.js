import { createSlice } from '@reduxjs/toolkit';
import { getRandomNumber } from '../../shared/helpers';
import { FIGURES, getBlock } from '../../entities/tetris-blocks';
import { tetrisFieldSize } from '../../entities/tetris-field';
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
      const { figure, currentFigurePosition, figurePositions } = getBlock(FIGURES);
      const { width, height } = getFigureSize(figure);
      const widthField = state.field[0].length - 1;
      const coordinateX = getRandomNumber(0, widthField - width);
      state.fallingBlock = {
        figure,
        currentFigurePosition,
        previosFigure: null,
        figurePositions,
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
    tern: (state) => {
      const fallingBlock = state.fallingBlock;
      const { currentFigurePosition, figurePositions, figure } = fallingBlock;
      const figurePositionsLength = figurePositions.length;

      fallingBlock.previosFigure = figure;
      fallingBlock.currentFigurePosition = 
        currentFigurePosition +1 !== figurePositionsLength ? 
        fallingBlock.currentFigurePosition = currentFigurePosition + 1 :
        fallingBlock.currentFigurePosition = 0;
      fallingBlock.figure = figurePositions[state.fallingBlock.currentFigurePosition];
      const { width, height } = getFigureSize(state.fallingBlock.figure);
      fallingBlock.width = width;
      fallingBlock.height = height;
      fallingBlock.previosCoordinateX = fallingBlock.coordinateX;
      fallingBlock.previosCoordinateY = fallingBlock.coordinateY;
    },
    updateField: (state) => {
      const { 
        previosCoordinateX,
        previosCoordinateY,
        figure,
        coordinateX,
        coordinateY,
        previosFigure,
      } = state.fallingBlock;
      const deletedFigure = previosFigure || figure;
      state.fallingBlock.previosFigure = null;
      deletedFigure.forEach((i, indexI) => {
        i.forEach((j, indexJ) => {
          if(j) {
            state.field[indexI + previosCoordinateY][indexJ + previosCoordinateX] = false 
          }
        })
      });
      figure.forEach((i, indexI) => {
        i.forEach((j, indexJ) => {
          if(j) {
            state.field[indexI + coordinateY][indexJ + coordinateX] = j
          }
        })
      });
    },
    saveId: (state, {payload}) => {
      state.keyOfGameFunction = payload
    },
    clearId: (state) => {
      state.keyOfGameFunction = null;
    },
    gameStop: (state) => {
      state.keyOfGameFunction
    }
  }
});

export const gameInitialisation = () => {
  return (dispatch, getState) => {
    const tetrisActions = tetrisStateSlice.actions;
    const {addNewBlock, updateField, generateField} = tetrisActions;
    //Создание поля, добавленеи фигуры
    dispatch(generateField(tetrisFieldSize));
    dispatch(addNewBlock());
    // !getState().tetris.fallingBlock && dispatch(tetrisActions.addNewBlock());
    dispatch(updateField());
    //Конец создания поля, добавленеи фигуры
    addStepController(getState, dispatch, checkNextStep, tetrisActions)
    dispatch(gameStart());
  }
};

export const gameStart = () => {
  return (dispatch, getState) => {
    const tetrisActions = tetrisStateSlice.actions;
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

export const gameStop = (dispatch, getState) => {
  const tetrisActions = tetrisStateSlice.actions;
  clearInterval(getState().tetris.keyOfGameFunction)
  dispatch(tetrisActions.clearId())
}

export default tetrisStateSlice.reducer;