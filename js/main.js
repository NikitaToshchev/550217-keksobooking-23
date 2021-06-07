const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEAUTERS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const NUMBERS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const DESCRIPTION = [
  'Материи после вспышек новых и была. Концентрации этих галактик очень велико и нельзя решить.',
  'Полосе показывает сильную концентрацию к галактическому экватору. Целой площадке, содержащей десятки квадратных минут приметных оптических объектов очень много.',
  'Других характеристик остатками газовой материи. Большая часть ярких оптических и распределенных.',
  'Других характеристик остатками газовой материи. Большая часть ярких оптических и распределенных.',
  'Небе близко друг к плоскости галактики тоже будет все-таки слишком.',
  'Которого достаточно сильное галактических дискретных источников яркие. Объекты, тогда отсутствие концентрации этих.',
];

const SIMILAR_OFFERS_COUNT = 10;

// Функция, возвращающая случайное целое или дробное положительное число из переданного диапазона включительно
const getRandomPositiveNum = (min, max, precision) => {
  if (min < 0 || min > max) {
    throw new Error('Числа должны быть в диапазоне от меньшего к большему и положительные');
  }

  const number = min + Math.random() * (max - min + 1);
  return !precision ? ~~number : number.toFixed(precision);
};

const getRandomArrElement = (arr) => arr.length ? arr.splice(getRandomPositiveNum(0, arr.length - 1), 1).join('') : null;

const getRandomArr = function (arr) {
  const lengthArr = getRandomPositiveNum(0, arr.length - 1);
  const array = [];
  for (let i = 0; i <= lengthArr; i++) {
    array.push(arr[i]);
  }
  return array;
};

const createOffer = () => {
  const getNumber = getRandomArrElement(NUMBERS);
  const getLat = getRandomPositiveNum(35.65000, 35.70000, 5);
  const getLng = getRandomPositiveNum(139.70000, 139.80000, 5);
  const getPrice = getRandomPositiveNum(0, 100000);
  const getType = getRandomArrElement(TYPE);
  const getRooms = getRandomPositiveNum(1, 10);
  const getGuests = getRandomPositiveNum(1, 10);
  const getCheckin = getRandomArrElement(CHECKIN);
  const getCheckout = getRandomArrElement(CHECKOUT);
  const getFeatures = getRandomArr(FEAUTERS);
  const getDescription = getRandomArrElement(DESCRIPTION);
  const getPhotos = getRandomArr(PHOTOS);

  return {
    author: {
      avatar: `img/avatars/user${getNumber}.png`,
    },

    offer: {
      title: `Сдается ${getType} по цене ${getPrice}`,
      address: `${getLat}, ${getLng}`,
      price: getPrice,
      type: getType,
      rooms: getRooms,
      guests: getGuests,
      checkin: getCheckin,
      checkout: getCheckout,
      features: getFeatures,
      description: getDescription,
      photos: getPhotos,
    },

    location: {
      'lat': getLat,
      'lng': getLng,
    },
  };
};

const similarOffers = new Array(SIMILAR_OFFERS_COUNT).fill('').map(() => createOffer());
similarOffers;

// console.log(similarOffers);
