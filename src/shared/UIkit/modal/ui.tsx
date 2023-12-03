import React, { FC, useState } from 'react';
import './modal.scss';
import { Button, BtnTypes } from '../';

interface ModalProps {
  isModalOpen?: boolean,
  onCancel?: () => void,
  onOk?: () => void,
  onClose: (value: Boolean) => void,
  okBtnTitle?: string;
  cancelBtnTitle?: string;
  title?: string,
  children?: React.ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
  const {
    isModalOpen = false,
    onCancel,
    onOk,
    onClose,
    okBtnTitle,
    cancelBtnTitle,
    title,
    children,
  } = props;

  if (!isModalOpen) {
    return <></>
  };

  const closeHandler = () => {
    onClose(false)
  };

  return (
    <div className='modal' onClick={closeHandler}>
      <div className="modal__wrapper">
        <div className="modal__content">
          <div className="modal__header">
            {title && <div className="modal__title"></div>}
          </div>
          <div className='modal__body'>
            {children}
          </div>
          <div className="modal__footer">
            {
              onOk && <Button onClick={onOk}>
                {okBtnTitle || 'Подтвердить'}
              </Button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;