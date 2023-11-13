import { useEffect } from 'react';
import { TetrisField } from '../../entities/tetris-field';
import { gameInitialisation } from '../../features/tetris-actions';
import { useDispatch, useSelector } from 'react-redux';

const Tetris = () => {
  const dispatch = useDispatch();
  const { field } = useSelector(state => state.tetris);

  useEffect(() => {
    dispatch(gameInitialisation());
  }, []);

  return (
    <TetrisField
      field={field}/>
  )
}

export default Tetris