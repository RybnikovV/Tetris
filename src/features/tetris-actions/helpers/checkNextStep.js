export const checkNextStep = (state, direction='bottom') => {
  if (!state.fallingBlock) return false;
  const { fallingBlock, field} = state;
  const  { 
    coordinateX, 
    coordinateY, 
    figure, 
    currentFigurePosition,
    figurePositions,
  } = fallingBlock;
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

  const checRightBlock = () => {
    return !figure.find((axisY, indexAxisY) => {
      const numLastIndex = axisY.findLastIndex(itexAxisY => {
        return !!itexAxisY 
      });
      return axisY[numLastIndex] && field[indexAxisY + coordinateY][coordinateX + numLastIndex + 1];
    });
  };

  const checkLeftBlock = () => {
    return !figure.find((axisY, indexAxisY) => {
      const numIndex = axisY.findIndex(itexAxisY => {
        return !!itexAxisY 
      });
      return axisY[numIndex] && field[indexAxisY + coordinateY][coordinateX + numIndex - 1];
    });
  };

  const checkTern = () => {
    const figurePositionsLength = figurePositions.length;
    const nextFigurePosition = currentFigurePosition +1 !== figurePositionsLength ? 
      figurePositions[currentFigurePosition + 1] : figurePositions[0];
    return !nextFigurePosition.find((axisY, indexY) => {
      return axisY.find((blockItem, indexX) => {
        if (typeof field[coordinateY + indexY] === 'undefined' 
          || typeof field[coordinateY + indexY][coordinateX + indexX] === 'undefined') {
          return true
        };
      });
    });
  };

  switch (direction) {
    case 'bottom': {
      return checkEndField() && checkBottomBlock()
    }
    case 'right': {
      return typeof state.field[coordinateY][coordinateX + blockWidth] !== 'undefined' && checRightBlock()
    }
    case 'left': {
      return typeof state.field[coordinateY][coordinateX - 1] !== 'undefined' && checkLeftBlock()
    }
    case 'tern': {
      return checkTern()
    }
  }
};

export const checkFilledAxis = (state) => {
  const { field } = state;
  const indexFilledAxes = [];

  field.forEach((axis, indexAxis) => {
    const isAxisFilled = axis.reduce((res, block) => {
      return res && block
    }, true);
    if ( isAxisFilled ) {
      indexFilledAxes.push(indexAxis);
    }
  });

  return {
    hasFilledAxis: indexFilledAxes.length > 0,
    indexFilledAxes
  }
}