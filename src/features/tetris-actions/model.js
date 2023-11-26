import { createSlice } from '@reduxjs/toolkit';
import { getRandomNumber } from '../../shared/helpers';
import { FIGURES, getBlock } from '../../entities/tetris-blocks';
import { tetrisFieldSize } from '../../entities/tetris-field';
import { checkNextStep, addStepController, getFigureSize, checkFilledAxis } from './helpers';

const initialState = {
  field: null,
  filledAxisList: [],
  fallingBlock: null,
  keyOfGameFunction: null,
  gamePoints: 0,
  gameSpeed: 1000,
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
      state.keyOfGameFunction;
    },
    changeGameSpeed: (state) => {
      if(state.gameSpeed > 200) {
        state.gameSpeed = state.gameSpeed - 100;
      }
    },
    updateListOfFilledAxis: (state, {payload}) => {
      state.filledAxisList = payload;
    },
    updateGamePoints: (state, {payload}) => {
      const { field, gamePoints } = state;
      const baseStep = field[0].length;
      state.gamePoints = payload * baseStep + gamePoints
    },
    clearFieldLine: (state, {payload}) => {
      payload.forEach(i => {
        state.field[i] = state.field[i].map(() => {
          return false
        })
      });
    },
    shakeField: (state, {payload}) => {
      const line = [];
      for(let i = 0; i < 10; i++) {
        line.push(false);
      };
      payload.forEach(i => {
        while(i >= 0) {
          state.field[i] = state.field[i-1] ? state.field[i-1] : line
          i--;
        };
      });
    },
  }
});

export const gameInitialisation = () => {
  return (dispatch, getState) => {
    const tetrisActions = tetrisStateSlice.actions;
    const {addNewBlock, updateField, generateField} = tetrisActions;
    //Создание поля, добавленеи фигуры
    dispatch(generateField(tetrisFieldSize));
    dispatch(addNewBlock());
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
        dispatch(tetrisActions.stepDown());
      } else {
        const { hasFilledAxis, indexFilledAxes } = checkFilledAxis(getState().tetris);
        if (hasFilledAxis) {
          filledAxisHandler(indexFilledAxes, dispatch, getState);
        } else {
          dispatch(tetrisActions.addNewBlock());
        }
      }
      dispatch(tetrisActions.updateField());
    }, getState().tetris.gameSpeed);
    dispatch(tetrisActions.saveId(id)); 
  }
};

export const gameStop = (dispatch, getState) => {
  const tetrisActions = tetrisStateSlice.actions;
  clearInterval(getState().tetris.keyOfGameFunction);
  dispatch(tetrisActions.clearId());
};

const updateGameSpeed = (dispatch, getState) => {
  const tetrisActions = tetrisStateSlice.actions;
  gameStop(dispatch, getState);
  dispatch(tetrisActions.clearId());
  dispatch(gameStart());
};

export const filledAxisHandler = (indexFilledAxes, dispatch, getState) => {
  const {
    updateListOfFilledAxis, 
    clearFieldLine, 
    updateGamePoints, 
    shakeField,
    changeGameSpeed } = tetrisStateSlice.actions;
  const coefficient = indexFilledAxes.length;
  dispatch(updateListOfFilledAxis(indexFilledAxes));
  dispatch(updateGamePoints(coefficient));
  setTimeout(() => {
    dispatch(clearFieldLine(indexFilledAxes));
    dispatch(shakeField(indexFilledAxes));
    dispatch(updateListOfFilledAxis([]));
    dispatch(changeGameSpeed());
    updateGameSpeed(dispatch, getState)
  }, 500)
};

export default tetrisStateSlice.reducer;