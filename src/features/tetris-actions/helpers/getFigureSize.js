export const getFigureSize = (figure) => {
  const width = figure.reduce((acc, i) => {
    return acc > i.length ? acc : i.length
  }, 0);
  const height = figure.length;
  return {
    width,
    height,
  }
};