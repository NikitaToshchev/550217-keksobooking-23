import './map.js';
import { createMarkers } from './map.js';
import './form.js';
import { disableMapFilters, enableMapFilters } from './form.js';
import { getData } from './api.js';
import { showMessageGetError } from './messages.js';
import { setFilterChange, getFilterOffers } from './filter.js';

disableMapFilters();

getData((offers) => {
  createMarkers(offers);
  enableMapFilters();
  setFilterChange(() => createMarkers(getFilterOffers(offers)));
}, showMessageGetError);
