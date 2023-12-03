import { useState } from 'react';
import { Tetris } from '../../widgets/tetris';
import { Button, BtnTypes, Modal } from '../../shared/UIkit';

const TetrisPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const clickBtnHandler = () => {
    setModalOpen(!isModalOpen)
  };

  return (
    <>
      <Tetris/>
      {/* <Button
        onClick={clickBtnHandler}
        type={BtnTypes.default}>
          Открыть модалку
      </Button> */}
      <Modal isModalOpen={isModalOpen} onClose={setModalOpen}>
        <div>exampleOfContent</div>
      </Modal>
    </>
  )
};

export default TetrisPage;