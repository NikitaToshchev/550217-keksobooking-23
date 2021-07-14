import './map.js';
import './form.js';
// import { disableAdForm, disableMapFilters, enableMapFilters } from './form.js';
import { getData } from './api.js';
import { createMarkers } from './map.js';
import { showMessageGetError } from './messages.js';
import { setFilterChange, getFilterOffers } from './filter.js';

// disableAdForm();
// disableMapFilters();

getData((offers) => {
  createMarkers(offers);
  // enableMapFilters();
  setFilterChange(() => createMarkers(getFilterOffers(offers)));
}, showMessageGetError);
