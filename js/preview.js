const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const photosChooser = document.querySelector('#images');
const previewPhotos = document.querySelector('.ad-form__photo');

photosChooser.addEventListener('change', () => {
  const file = photosChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const photo = document.createElement('img');
      photo.style.width = '70px';
      photo.style.height = '70px';
      photo.src = reader.result;
      previewPhotos.append(photo);
    });

    reader.readAsDataURL(file);
  }
});
