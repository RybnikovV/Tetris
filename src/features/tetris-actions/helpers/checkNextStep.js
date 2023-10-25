export const checkNextStep = (state, direction='bottom') => {
  if (!state.fallingBlock) return false;
  const { fallingBlock, field } = state;
  const  { coordinateX, coordinateY, figure } = fallingBlock;
  const blockHeight = fallingBlock.height;
  const blockWidth = fallingBlock.width;

  const checkEndField = () => {
    return typeof state.field[coordinateY + blockHeight] !== 'undefined'
  };
  const checkBottomBlock = () => {
    return !figure.find((axisY, indexAxisY) => {
      return axisY.find((itemX, indexX) => {
        if (figure[indexAxisY+1] && figure[indexAxisY][indexX] && figure[indexAxisY + 1][indexX]) {
          return false
        }
        return itemX && field[coordinateY + indexAxisY + 1][coordinateX + indexX]
      })
    });
  };

  switch (direction) {
    case 'bottom': {
      return checkEndField() && checkBottomBlock()
    }
    case 'right': {
      return typeof state.field[coordinateY][coordinateX + blockWidth] !== 'undefined'
    }
    case 'left': {
      return typeof state.field[coordinateY + 3][coordinateX - 1] !== 'undefined'
    }
  }
}