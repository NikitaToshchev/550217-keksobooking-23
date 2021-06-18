const isInactiveAdForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const isInactiveMapFilters = () => {
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');

  const mapFiltersSelects = mapFilters.querySelectorAll('select');
  mapFiltersSelects.forEach((select) => {
    select.disabled = true;
  });
  const mapFiltersFieldsets = mapFilters.querySelector('fieldset');
  mapFiltersFieldsets.disabled = true;
};

const isActiveAdForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const isActiveMapFilters = () => {
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');

  const mapFiltersSelects = mapFilters.querySelectorAll('select');
  mapFiltersSelects.forEach((select) => {
    select.disabled = false;
  });
  const mapFiltersFieldsets = mapFilters.querySelector('fieldset');
  mapFiltersFieldsets.disabled = false;
};

export { isInactiveAdForm, isInactiveMapFilters, isActiveAdForm, isActiveMapFilters };
