import { debounce } from './utils.js';

import { getData } from './api.js';
import { createMarkers } from './map.js';
import { ZERO_GUEST, ONE_GUEST } from './form.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const DEFAULT_VALUE = 'any';
const MIDDLE_VALUE = 'middle';
const LOW_VALUE = 'low';
const HIGH_VALUE = 'high';
const TWO_GUESTS = 2;
const HUNDRED_GUESTS = 100;

const mapFilters = document.querySelector('.map__filters');
const filterType = mapFilters.querySelector('#housing-type');
const filterPrice = mapFilters.querySelector('#housing-price');
const filterRooms = mapFilters.querySelector('#housing-rooms');
const filterGuests = mapFilters.querySelector('#housing-guests');
const mapFeatures = document.querySelector('.map__features');
const features = [...mapFeatures.querySelectorAll('input[type=checkbox]')];

const getCheckedFeatures = () => features.filter((feature) => feature.checked === true).map((feature) => feature.value);

const filterOffers = ({ offer }) => {
  const matchType = offer.type === filterType.value || filterType.value === DEFAULT_VALUE;

  const matchPrice = () => {
    if (filterPrice.value === LOW_VALUE) {
      return offer.price < LOW_PRICE;
    } else if (filterPrice.value === HIGH_VALUE) {
      return offer.price > HIGH_PRICE;
    } else if (filterPrice.value === MIDDLE_VALUE) {
      return offer.price > LOW_PRICE && offer.price < HIGH_PRICE;
    } else if (filterPrice.value === DEFAULT_VALUE) {
      return true;
    }
  };

  const mathRooms = offer.rooms === Number(filterRooms.value) || filterRooms.value === DEFAULT_VALUE;

  const mathGuests = () => {
    if (filterGuests.value === String(ONE_GUEST)) {
      return offer.guests === ONE_GUEST;
    } else if (filterGuests.value === String(TWO_GUESTS)) {
      return offer.guests === TWO_GUESTS;
    } else if (filterGuests.value === String(ZERO_GUEST)) {
      offer.guests >= HUNDRED_GUESTS;
    } else if (filterGuests.value === DEFAULT_VALUE) {
      return true;
    }
  };

  const matchOffers = matchType && matchPrice() && mathRooms && mathGuests();
  return matchOffers;
};

const getFilterOffers = (offers) => {
  let filteredOffers = offers.filter(filterOffers);

  const checkedFeatures = getCheckedFeatures();
  if (checkedFeatures.length) {
    filteredOffers = filteredOffers
      .filter(({ offer }) => offer.features && offer.features.length)
      .filter(({ offer }) =>
        checkedFeatures.every((feature) => offer.features.includes(feature)));
  }

  return filteredOffers;
};

const getFeaturesRank = ({ offer }) => offer.features && offer.features.length || 0;

const compareOffers = (offerA, offerB) => {
  const rankA = getFeaturesRank(offerA);
  const rankB = getFeaturesRank(offerB);
  return rankB - rankA;
};

const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', debounce(cb));
};

const clearFilter = () => {
  mapFilters.reset();
  getData((offers) => createMarkers(offers));
};

export { setFilterChange, compareOffers, getFilterOffers, clearFilter };
