import './map.js';
import { createMarkers, initMap } from './map.js';
import './form.js';
import { disableMapFilters, enableMapFilters, disableAdForm } from './form.js';
import { getData } from './api.js';
import { showMessageGetError } from './messages.js';
import { setFilterChange, getFilterOffers } from './filter.js';
import './preview.js';


disableMapFilters();
disableAdForm();

initMap();

getData((offers) => {
  createMarkers(offers);
  enableMapFilters();
  setFilterChange(() => createMarkers(getFilterOffers(offers)));
}, showMessageGetError);
