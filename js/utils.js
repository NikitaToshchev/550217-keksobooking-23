// Функция, возвращающая случайное целое или дробное положительное число из переданного диапазона включительно
const getRandomPositiveNum = (min, max, precision) => {
  if (min < 0 || min > max) {
    throw new Error('Числа должны быть в диапазоне от меньшего к большему и положительные');
  }

  const number = min + Math.random() * (max - min + 1);
  return !precision ? ~~number : number.toFixed(precision);
};

const getRandomArrElement = (arr) => arr.length ? arr.splice(getRandomPositiveNum(0, arr.length - 1), 1).join('') : null;

const getRandomArr = (arr) => {
  const lengthArr = getRandomPositiveNum(0, arr.length - 1);
  const array = [];
  for (let i = 0; i <= lengthArr; i++) {
    array.push(arr[i]);
  }
  return array;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getRandomPositiveNum, getRandomArrElement, getRandomArr, isEscEvent };
