import { sendData } from './api.js';
import { setInitialSettings, initMap } from './map.js';
import { showMessageSendSuccess, showMessageSendError } from './messages.js';
import { clearPreview } from './preview.js';
import { clearFilter } from './filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MIN_PRICE_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const ZERO_GUEST = 0;
const ONE_GUEST = 1;
const THREE_GUESTS = 3;
const ONE_ROOM = 1;
const TWO_ROOMS = 2;
const THREE_ROOMS = 3;
const HUNDRED_ROOMS = 100;

const adForm = document.querySelector('.ad-form');

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');

  const adFormFieldsets = [...adForm.querySelectorAll('fieldset')];
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const disableMapFilters = () => {
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');

  const mapFiltersSelects = [...mapFilters.querySelectorAll('select')];
  mapFiltersSelects.forEach((select) => {
    select.disabled = true;
  });
  const mapFiltersFieldsets = mapFilters.querySelector('fieldset');
  mapFiltersFieldsets.disabled = true;
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');

  const adFormFieldsets = [...adForm.querySelectorAll('fieldset')];
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const enableMapFilters = () => {
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');

  const mapFiltersSelects = [...mapFilters.querySelectorAll('select')];
  mapFiltersSelects.forEach((select) => {
    select.disabled = false;
  });
  const mapFiltersFieldset = mapFilters.querySelector('fieldset');
  mapFiltersFieldset.disabled = false;
};

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`?????? ${MIN_TITLE_LENGTH - valueLength} ????????.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`?????????????? ???????????? ${valueLength - MAX_TITLE_LENGTH} ????????.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');

priceInput.addEventListener('input', () => {
  const priceValue = + priceInput.value;
  const priceMax = + priceInput.max;
  const priceMin = + priceInput.min;

  if (priceValue < priceMin) {
    priceInput.setCustomValidity(`???????? ???? ???????????? ???????? ???????????? ${priceMin}`);
  } else if (priceValue > priceMax) {
    priceInput.setCustomValidity(`???????? ???? ???????????? ???????? ???????????? ${priceMax}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

const onPriceValueSet = () => {
  priceInput.min = MIN_PRICE_TYPE[typeSelect.value];
  priceInput.placeholder = MIN_PRICE_TYPE[typeSelect.value];
};

window.addEventListener('load', onPriceValueSet);
typeSelect.addEventListener('change', onPriceValueSet);

const roomsSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

const onCapacityValidate = () => {
  const rooms = + roomsSelect.value;
  const guests = + capacitySelect.value;

  if (rooms === ONE_ROOM && guests !== ONE_GUEST) {
    capacitySelect.setCustomValidity('???????????????? ??.??.???????????? ?????? ???????? 1 ????????????');
  } else if (rooms === TWO_ROOMS && guests === ZERO_GUEST || rooms === TWO_ROOMS && guests === THREE_GUESTS) {
    capacitySelect.setCustomValidity('???????????????? ??.??. ???????????? ???????? 2 ?????????????? ?????? ???????? 1 ????????????');
  } else if (rooms === THREE_ROOMS && guests === ZERO_GUEST) {
    capacitySelect.setCustomValidity('???????????????? ??.??. ???????????? ???????? 3 ??????????????, ???????? 2 ?????????????? ?????? ???????? 1 ????????????');
  } else if (rooms === HUNDRED_ROOMS && guests !== ZERO_GUEST) {
    capacitySelect.setCustomValidity('???????????????? ??.??.???????????? ?????? ?????? ??????????????');
  } else {
    capacitySelect.setCustomValidity('');
  }

  capacitySelect.reportValidity();
};

roomsSelect.addEventListener('change', onCapacityValidate);
capacitySelect.addEventListener('change', onCapacityValidate);

const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const onTimeinValidate = () => {
  timeoutSelect.value = timeinSelect.value;
};

const onTimeoutValidate = () => {
  timeinSelect.value = timeoutSelect.value;
};

timeinSelect.addEventListener('change', onTimeinValidate);
timeoutSelect.addEventListener('change', onTimeoutValidate);

const clearForm = () => {
  adForm.reset();
  onPriceValueSet();
  clearFilter();
  clearPreview();
  setInitialSettings();
  showMessageSendSuccess();
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  onPriceValueSet();
  clearPreview();
  clearFilter();
  initMap();
  setInitialSettings();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(clearForm, showMessageSendError, formData);
});

export { disableAdForm, disableMapFilters, enableAdForm, enableMapFilters, ZERO_GUEST, ONE_GUEST };
