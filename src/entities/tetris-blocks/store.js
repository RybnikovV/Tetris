import { getRandomNumber } from '../../shared/helpers';

export const getBlock = (FIGURES) => {
  const figureNames = Object.keys(FIGURES);
  const amountFigure = figureNames.length - 1;
  const figurePositions = FIGURES[figureNames[getRandomNumber(0, amountFigure)]];
  const selectedFigurePositon = getRandomNumber(0, figurePositions.length - 1);
  return {
    figure: figurePositions[selectedFigurePositon],
    currentFigurePosition: selectedFigurePositon,
    figurePositions,
  }
};