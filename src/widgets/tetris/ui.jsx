import { useEffect } from 'react';
import { TetrisField, tetrisFieldSize } from '../../entities/tetris-field';
import { getBlock, FIGURES } from '../../entities/tetris-blocks';
import { tetrisStateSlice, gameStarting } from '../../features/tetris-actions';
import { useDispatch, useSelector } from 'react-redux';


const Tetris = () => {
  const dispatch = useDispatch();
  const { addNewBlock, generateField } = tetrisStateSlice.actions;
  const { field } = useSelector(state => state.tetrisField);

  useEffect(() => {
    dispatch(generateField(tetrisFieldSize));
    dispatch(addNewBlock(getBlock(FIGURES)));
    dispatch(gameStarting());
  }, []);

  return (
    <TetrisField
      field={field}/>
  )
}

export default Tetris