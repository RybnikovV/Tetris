import { GetRandomNumber } from './type';

export const getRandomNumber: GetRandomNumber = (max, min = 0, onlyInteger = true) => {
  const segment = Math.random() * (max-min) + min;
  return onlyInteger ? Math.round(segment) : segment
};