const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MIN_PRICE_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const disableAdForm = () => {
  const adForm = document.querySelector('.ad-form');
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
  const adForm = document.querySelector('.ad-form');
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

// Валидация

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
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
    priceInput.setCustomValidity(`Цена не должна быть меньше ${priceMin}`);
  } else if (priceValue > priceMax) {
    priceInput.setCustomValidity(`Цена не должна быть больше ${priceMax}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

typeSelect.addEventListener('change', () => {
  priceInput.min = MIN_PRICE_TYPE[typeSelect.value];
  priceInput.placeholder = MIN_PRICE_TYPE[typeSelect.value];
});

const roomsSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

const validateСapacity = () => {
  const rooms = + roomsSelect.value;
  const guests = + capacitySelect.value;

  if (rooms === 1 && guests !== 1) {
    capacitySelect.setCustomValidity('Значение м.б.только для «для 1 гостя»');
  } else if (rooms === 2 && guests === 0 || rooms === 2 && guests === 3) {
    capacitySelect.setCustomValidity('Значение м.б. только «для 2 гостей» или «для 1 гостя»');
  } else if (rooms === 3 && guests === 0) {
    capacitySelect.setCustomValidity('Значение м.б. только «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (rooms === 100 && guests !== 0) {
    capacitySelect.setCustomValidity('Значение м.б.только «не для гостей»');
  } else {
    capacitySelect.setCustomValidity('');
  }

  capacitySelect.reportValidity();
};

roomsSelect.addEventListener('change', validateСapacity);
capacitySelect.addEventListener('change', validateСapacity);

const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const validateTimein = () => {
  timeoutSelect.value = timeinSelect.value;
};

const validateTimeout = () => {
  timeinSelect.value = timeoutSelect.value;
};

timeinSelect.addEventListener('change', validateTimein);
timeoutSelect.addEventListener('change', validateTimeout);


export { disableAdForm, disableMapFilters, enableAdForm, enableMapFilters };
