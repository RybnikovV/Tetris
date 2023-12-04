import { FC } from 'react';
import { Button, BtnTypes } from '../../shared/UIkit';
import "./cardGame.scss";

interface GameInfo {
  title: string;
  value: number | string;
};

interface CardGameProps {
  info?: GameInfo[];
  children: React.ReactNode;
  onStart: () => void;
  onStartDisabled: Boolean;
};

const CardGame: FC<CardGameProps> = (props) => {
  const {
    info=[],
    children,
    onStart,
    onStartDisabled,
  } = props;

  return(
    <div className='game-card'>
      <div className='game-card__wrapper'>
        <div className='game-card__field'>
          {children}
        </div>
        <div className='game-card__info'>
          {info.map(i => (
            <div className='game-card__info-item'>
              <h3 className='game-card__info-title'>{i.title}</h3>
              <div className='game-card__info-content'>{i.value || '0'}</div>
            </div>
          ))}
          <Button
            onClick={onStart}
            type={BtnTypes.primary}
            disabled={onStartDisabled}
            >
            Начать
          </Button>
        </div>
      </div>
    </div>  
  )

};

export default CardGame;