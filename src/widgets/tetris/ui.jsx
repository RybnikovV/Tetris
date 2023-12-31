import { useEffect } from 'react';
import { TetrisField } from '../../entities/tetris-field';
import { tetrisFieldSize } from '../../entities/tetris-field';
import { CardGame } from '../../entities/card-game'
import { gameInitialisation, getGameInfo, tetrisStateSlice } from '../../features/tetris-actions';
import { useDispatch, useSelector } from 'react-redux';

const Tetris = () => {
  const dispatch = useDispatch();
  const { field, filledAxisList, keyOfGameFunction } = useSelector(state => state.tetris);
  const gameInfo = useSelector(state => getGameInfo(state));
  const {generateField} = tetrisStateSlice.actions;

  const startClickHandler = () => {
    dispatch(gameInitialisation());
  };

  useEffect(() => {
    dispatch(generateField(tetrisFieldSize));
  }, []);

  return (
    <CardGame
      info={gameInfo} 
      onStart={startClickHandler}
      onStartDisabled={!!keyOfGameFunction}>
      <TetrisField
        field={field}
        filledAxisList={filledAxisList}/>
    </CardGame>
  )
}

export default Tetris;