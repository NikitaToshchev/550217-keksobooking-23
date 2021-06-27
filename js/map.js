import { generateOffer } from './cards.js';
import { createOffer } from './data.js';
import { enableAdForm, enableMapFilters } from './form.js';


const INITIAL_CORDS = {
  lat: 35.68950,
  lng: 139.69171,
};

const SIMILAR_OFFERS_COUNT = 10;
const similarOffers = new Array(SIMILAR_OFFERS_COUNT).fill().map(createOffer);

const map = L.map('map-canvas');

map.on('load', () => {
  enableAdForm();
  enableMapFilters();
});

map.setView({
  lat: INITIAL_CORDS.lat,
  lng: INITIAL_CORDS.lng,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_CORDS.lat,
    lng: INITIAL_CORDS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const { location } = offer;

  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      generateOffer(offer),
      {
        keepInView: true,
      },
    );

  return marker;
};

similarOffers.forEach((offer) => {
  createMarker(offer);
});

const address = document.querySelector('#address');
address.value = `${INITIAL_CORDS.lat}, ${INITIAL_CORDS.lng}`;

mainPinMarker.on('moveend', () => {
  const pinCoords = mainPinMarker.getLatLng();
  address.value = `${pinCoords.lat.toFixed(5)}, ${pinCoords.lng.toFixed(5)}`;
});

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  address.value = `${INITIAL_CORDS.lat}, ${INITIAL_CORDS.lng}`;

  mainPinMarker.setLatLng({
    lat: INITIAL_CORDS.lat,
    lng: INITIAL_CORDS.lng,
  });

  map.setView({
    lat: INITIAL_CORDS.lat,
    lng: INITIAL_CORDS.lng,
  }, 10);
});