import { getRandomPositiveNum, getRandomArrElement, getRandomArr } from './utils.js';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TYPE_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

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

const createOffer = () => {
  const getLat = getRandomPositiveNum(35.65000, 35.70000, 5);
  const getLng = getRandomPositiveNum(139.70000, 139.80000, 5);
  const getPrice = getRandomPositiveNum(0, 100000);
  const getType = getRandomArrElement(TYPE);

  return {
    author: {
      avatar: `img/avatars/user${getRandomArrElement(NUMBERS)}.png`,
    },

    offer: {
      title: 'Сдается жилье',
      address: `${getLat}, ${getLng}`,
      price: getPrice,
      type: getType,
      rooms: getRandomPositiveNum(1, 10),
      guests: getRandomPositiveNum(1, 10),
      checkin: getRandomArrElement(CHECKIN),
      checkout: getRandomArrElement(CHECKOUT),
      features: getRandomArr(FEAUTERS),
      description: getRandomArrElement(DESCRIPTION),
      photos: getRandomArr(PHOTOS),
    },

    location: {
      lat: getLat,
      lng: getLng,
    },
  };
};

export { createOffer, TYPE_RU };
