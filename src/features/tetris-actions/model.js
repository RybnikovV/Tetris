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
        previosBlockState: null,
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
      const {figure, height, width} = state.fallingBlock
      if (width !== height) {
        state.fallingBlock.previosBlockState = state.fallingBlock.figure;
        if (width > height) {
          state.fallingBlock.figure = figure.reduce((ternedFigure, figureLayer, i) => {
            ternedFigure = ternedFigure.length === 0 
              ? Array.from({length: width}, () => [])
              : ternedFigure;
            figureLayer.forEach((figureItem, j) => {
              ternedFigure[j][i] = figureItem
            });
            return ternedFigure;
          }, [])
        } else {
          state.fallingBlock.figure = figure.reduce((ternedFigure, figureLayer) => {
            ternedFigure = ternedFigure.length === 0 
              ? Array.from({length: width}, () => [])
              : ternedFigure;
            figureLayer.forEach((figureItem, j) => {
              ternedFigure[j].push(figureItem)
            });
            return ternedFigure;
          }, [])
        };
        state.fallingBlock.height = width;
        state.fallingBlock.width = height;
      }
    },
    updateField: (state) => {
      const { 
        previosCoordinateX,
        previosCoordinateY,
        figure,
        coordinateX,
        coordinateY,
        previosBlockState
      } = state.fallingBlock;
      const deletedFigure = previosBlockState || figure;
      state.fallingBlock.previosBlockState = null;
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