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

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export { getRandomPositiveNum, getRandomArrElement, getRandomArr, isEscEvent, debounce };
