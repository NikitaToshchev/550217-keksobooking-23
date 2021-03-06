const TYPE_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const generateOffer = (card) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  const popupTitle = cardElement.querySelector('.popup__title');
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  const popupAdress = cardElement.querySelector('.popup__text--address');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupFeatures = [...cardElement.querySelectorAll('.popup__feature')];

  card.author.avatar ? popupAvatar.src = card.author.avatar : popupAvatar.style.display = 'none';
  card.offer.title ? popupTitle.textContent = card.offer.title : popupTitle.style.display = 'none';
  card.offer.address ? popupAdress.textContent = card.offer.address : popupAdress.style.display = 'none';
  card.offer.price ? popupTextPrice.textContent = `${card.offer.price} ₽/ночь` : popupTextPrice.style.display = 'none';
  card.offer.type ? popupType.textContent = TYPE_RU[card.offer.type] : popupType.style.display = 'none';
  card.offer.rooms && card.offer.guests ? popupTextCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей` : popupTextCapacity.style.display = 'none';
  card.offer.checkin && card.offer.checkout ? popupTextTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}` : popupTextTime.style.display = 'none';

  if (card.offer.features) {
    const modifiers = card.offer.features.map((feature) => `popup__feature--${feature}`);
    popupFeatures.forEach((item) => {
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
    popupPhotos.innerHTML = '';
    card.offer.photos.map((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      popupPhotos.appendChild(photoElement);
    });
  } else {
    popupPhotos.style.display = 'none';
  }

  return cardElement;
};

export { generateOffer };
