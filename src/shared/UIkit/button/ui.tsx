import { FC } from 'react';
import classNames from "classnames";
import './button.scss';

export enum BtnTypes {
  primary="btn_primary",
  default="btn_default",
  text="btn_text",
  link="btn_link",
};

interface ButtonProps {
  onClick: () => void;
  type?: BtnTypes;
  children: string;
  disabled?: Boolean;
};

const Button: FC<ButtonProps> = (props) => {
  const {
    onClick,
    type,
    children,
    disabled = false,
  } = props;
  const classBtn = classNames('btn', type, {
    'btn_disabled': disabled
  });

  const clickHandler = () => {
    if (disabled) {
      return
    };
    onClick()
  }

  return (
    <button className={classBtn} onClick={clickHandler}>
      <div>{children}</div>
    </button>
  );
};

export default Button;