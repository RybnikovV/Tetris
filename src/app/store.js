import { configureStore } from '@reduxjs/toolkit';
import { tetrisFieldReducer } from '../features/tetris-actions';

export const store = configureStore({
  reducer: {
    tetris: tetrisFieldReducer
  }
});