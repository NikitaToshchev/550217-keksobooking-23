// Функция, возвращающая случайное целое положительное число из переданного диапазона включительно
const getRandomNumber = function (min, max) {
  if (min >= max || min < 0) {
    return 'Числа должны быть в диапазоне от меньшего к большему, положительные и отличаться друг от друга';
  }
  const randomNumber = Math.floor(min + Math.random() * (max - min + 1));
  return randomNumber;
};

getRandomNumber(1, 4);

// Функция, возвращающая случайное положительное число с плавающей точкой из переданного диапазона включительно
const getRandomFloatNumber = function (min, max, accuracy) {
  if (min >= max || min < 0) {
    return 'Числа должны быть в диапазоне от меньшего к большему, положительные и отличаться друг от друга';
  }
  const randomNumber = min + Math.random() * (max - min);
  return parseFloat(randomNumber.toFixed(accuracy));
};

getRandomFloatNumber(1.1, 1.7, 2);


