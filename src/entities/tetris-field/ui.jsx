import './tetrisField.scss';
import { visualasingField } from './';

const TetrisField = ({field, filledAxisList, gamePoints}) => {
  if ( !field ) {
    return null
  };

  return (
    <div className='tetris'>
      <div className='tetris__gamePoints'>{gamePoints}</div>
      <div className='tetris__field'>
        { visualasingField({ field, filledAxisList }) }
      </div>
    </div>
  )
}

export default TetrisField