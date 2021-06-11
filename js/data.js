import { getRandomPositiveNum, getRandomArrElement, getRandomArr } from './utils.js';

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

export { createOffer };
