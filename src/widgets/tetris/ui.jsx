import { useEffect } from 'react';
import { TetrisField, tetrisFieldSize } from '../../entities/tetris-field';
import { tetrisStateSlice, gameStarting } from '../../features/tetris-actions';
import { useDispatch, useSelector } from 'react-redux';

const Tetris = () => {
  const dispatch = useDispatch();
  const { generateField } = tetrisStateSlice.actions;
  const { field } = useSelector(state => state.tetris);

  useEffect(() => {
    dispatch(generateField(tetrisFieldSize));
    dispatch(gameStarting());
  }, []);

  return (
    <TetrisField
      field={field}/>
  )
}

export default Tetris