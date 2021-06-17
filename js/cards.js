import { TYPE_RU } from './data.js';

const generateOffers = (offers) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offerFragment = document.createDocumentFragment();

  offers.forEach((card) => {
    const cardElement = cardTemplate.cloneNode(true);
    const popupTitle = cardElement.querySelector('.popup__title');
    const popupAvatar = cardElement.querySelector('.popup__avatar');
    const popupAdress = cardElement.querySelector('.popup__text--address');
    const popupTextPrice = cardElement.querySelector('.popup__text--price');
    const popupType = cardElement.querySelector('.popup__type');
    const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    const popupTextTime = cardElement.querySelector('.popup__text--time');
    const popupDescription = cardElement.querySelector('.popup__description');

    card.author.avatar ? popupAvatar.src = card.author.avatar : popupAvatar.style.display = 'none';
    card.offer.title ? popupTitle.textContent = card.offer.title : popupTitle.style.display = 'none';
    card.offer.address ? popupAdress.textContent = card.offer.address : popupAdress.style.display = 'none';
    card.offer.price ? popupTextPrice.textContent = `${card.offer.price} ₽/ночь` : popupTextPrice.style.display = 'none';
    card.offer.type ? popupType.textContent = TYPE_RU[card.offer.type] : popupType.style.display = 'none';
    card.offer.rooms && card.offer.guests ? popupTextCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей` : popupTextCapacity.style.display = 'none';
    card.offer.checkin && card.offer.checkout ? popupTextTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}` : popupTextTime.style.display = 'none';

    if (card.offer.features) {
      const modifiers = card.offer.features.map((feature) => `popup__feature--${feature}`);
      cardTemplate.querySelectorAll('.popup__feature').forEach((item) => {
        const modifier = item.classList[1];
        if (!modifiers.includes(modifier)) {
          item.remove();
        }
      });
    } else {
      cardElement.querySelector('.popup__features').style.display = 'none';
    }

    card.offer.description ? popupDescription.textContent = card.offer.description : popupDescription.style.display = 'none';

    const popupPhotos = cardElement.querySelector('.popup__photos');
    if (card.offer.photos) {
      const photoTemplate = cardElement.querySelector('.popup__photo');
      const photoFragment = document.createDocumentFragment();
      card.offer.photos.map((photo) => {
        const photoElement = photoTemplate.cloneNode(true);
        photoElement.setAttribute('src', photo);
        photoFragment.appendChild(photoElement);
      });
      popupPhotos.innerHTML = '';
      popupPhotos.appendChild(photoFragment);
    } else {
      popupPhotos.style.display = 'none';
    }

    offerFragment.appendChild(cardElement);
  });

  return offerFragment;
};

export { generateOffers };
