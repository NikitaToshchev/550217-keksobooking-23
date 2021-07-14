import { debounce } from "./utils.js";

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const DEFAULT_VALUE = 'any';

const mapFilters = document.querySelector('.map__filters');
const filterType = mapFilters.querySelector('#housing-type');
const filterPrice = mapFilters.querySelector('#housing-price');
const filterRooms = mapFilters.querySelector('#housing-rooms');
const filterGuests = mapFilters.querySelector('#housing-guests');
const mapFeatures = document.querySelector('.map__features');
const features = [...mapFeatures.querySelectorAll('input[type=checkbox]')];

const filterOffers = ({ offer }) => {
  const matchType = offer.type === filterType.value || filterType.value === DEFAULT_VALUE;

  const matchPrice = () => {
    if (filterPrice.value === 'low') {
      return offer.price < LOW_PRICE;
    } else if (filterPrice.value === 'high') {
      return offer.price > HIGH_PRICE;
    } else if (filterPrice.value === 'middle') {
      return offer.price > LOW_PRICE && offer.price < HIGH_PRICE;
    } else if (filterPrice.value === DEFAULT_VALUE) {
      return true;
    }
  }

  const mathRooms = offer.rooms === Number(filterRooms.value) || filterRooms.value === DEFAULT_VALUE;

  const mathGuests = () => {
    if (filterGuests.value === '1') {
      return offer.guests === 1
    } else if (filterGuests.value === '2') {
      return offer.guests === 2
    } else if (filterGuests.value === '0') {
      offer.guests >= 100
    } else if (filterGuests.value === DEFAULT_VALUE) {
      return true;
    }
  };

  const matchOffers = matchType && matchPrice() && mathRooms && mathGuests();
  return matchOffers;
};

const getCheckedFeatures = () => features.filter((feature) => feature.checked === true).map((feature) => feature.value);

const getFilterOffers = (offers) => {
  let filteredOffers = offers.filter(filterOffers)

  const checkedFeatures = getCheckedFeatures()
  if (checkedFeatures.length) {
    filteredOffers = filteredOffers
      .filter(({ offer }) => offer.features?.length)
      .filter(({ offer }) =>
        checkedFeatures.every((feature) => offer.features.includes(feature))
      )
  }
  return filteredOffers;
};

const getFeaturesRank = ({ offer }) => {
  return offer.features?.length || 0;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getFeaturesRank(offerA);
  const rankB = getFeaturesRank(offerB);
  return rankB - rankA;
};

const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', debounce(cb));
};

export { setFilterChange, compareOffers, getFilterOffers }
