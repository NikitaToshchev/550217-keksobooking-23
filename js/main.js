import { createOffer } from './data.js';
import { generateOffers } from './cards.js';
import { disableAdForm, disableMapFilters, enableAdForm, enableMapFilters } from './form.js';

const SIMILAR_OFFERS_COUNT = 10;
const similarOffers = new Array(SIMILAR_OFFERS_COUNT).fill().map(createOffer);

const allOffersFragment = generateOffers(similarOffers);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(allOffersFragment.firstChild);

disableAdForm();
disableMapFilters();
enableAdForm();
enableMapFilters();
