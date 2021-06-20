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

export { disableAdForm, disableMapFilters, enableAdForm, enableMapFilters };
