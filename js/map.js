import { generateOffer } from './generate-offer.js';
import { enableAdForm } from './form.js';
import { compareOffers } from './filter.js';

const INITIAL_CORDS = {
  lat: 35.68950,
  lng: 139.69171,
};

const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;

const SIMILAR_OFFERS_COUNT = 10;

const map = L.map('map-canvas');
const markerGroup = L.layerGroup();

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT],
  iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT],
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

const initMap = () => {
  map.on('load', () => {
    enableAdForm();
  }).setView({
    lat: INITIAL_CORDS.lat,
    lng: INITIAL_CORDS.lng,
  }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  mainPinMarker.addTo(map);
  markerGroup.addTo(map);
};

const createMarker = (offer) => {
  const { location } = offer;

  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [PIN_WIDTH, PIN_HEIGHT],
    iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
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

const createMarkers = (offers) => {
  markerGroup.clearLayers();
  offers.
    slice()
    .sort(compareOffers)
    .slice(0, SIMILAR_OFFERS_COUNT)
    .forEach((offer) => {
      createMarker(offer);
    });
};

const address = document.querySelector('#address');
address.value = `${INITIAL_CORDS.lat}, ${INITIAL_CORDS.lng}`;

mainPinMarker.on('moveend', () => {
  const pinCoords = mainPinMarker.getLatLng();
  address.value = `${pinCoords.lat.toFixed(5)}, ${pinCoords.lng.toFixed(5)}`;
});

const setInitialSettings = () => {
  address.value = `${INITIAL_CORDS.lat}, ${INITIAL_CORDS.lng}`;

  mainPinMarker.setLatLng({
    lat: INITIAL_CORDS.lat,
    lng: INITIAL_CORDS.lng,
  });

  map.setView({
    lat: INITIAL_CORDS.lat,
    lng: INITIAL_CORDS.lng,
  }, 10);
};

export { setInitialSettings, createMarkers, initMap };
