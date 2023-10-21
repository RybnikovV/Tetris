import { getRandomNumber } from '../../shared/helpers';

export const getBlock = (FIGURES) => {
  const figureNames = Object.keys(FIGURES);
  const amountFigure = figureNames.length - 1;
  return FIGURES[figureNames[getRandomNumber(0, amountFigure)]]
};