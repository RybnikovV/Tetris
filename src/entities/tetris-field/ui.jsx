import './tetrisField.scss';
import { visualasingField } from './';

const TetrisField = ({field}) => {

  if ( !field ) {
    return null
  };

  return (
    <div className='tetris'>
      <div className='tetris__field'>
        { visualasingField(field) }
      </div>
    </div>
  )
}

export default TetrisField