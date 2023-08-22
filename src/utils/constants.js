//файл с перечнем констатнт

//сохраняем в константу адрес и заголовок запроса для Api
export const options = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "ba4ab074-000e-4a51-b901-da38460be3f2",
    "Content-Type": "application/json",
  },
};

const page = document.querySelector('.page');
export const content = page.querySelector('.content');

export const userDataForm = page.querySelector('.popup__user-data-form');
export const addPictureForm = page.querySelector('.popup__add-picture-form');
export const userAvatarForm = page.querySelector('.popup__user-avatar-form');

export const usernameInput = userDataForm.querySelector('.popup__item_input_username');
export const userOccupationInput = userDataForm.querySelector('.popup__item_input_occupation');
export const userAvatarLinkInput = userAvatarForm.querySelector('.popup__item_input_avatar-link');
export const pictureTitleInput = page.querySelector('.popup__item_input_picture-title');
export const pictureLinkInput = page.querySelector('.popup__item_input_picture-link');

export const profileEditButton = content.querySelector('.profile__edit-button');
export const addPictureButton = content.querySelector('.profile__add-button');
export const avatarEditButton = content.querySelector('.profile__avatar');

export const photoGrid = content.querySelector('.photo-grid');

export const popupPictureForm = page.querySelector('.popup__picture-form');
export const popupPictureImage = popupPictureForm.querySelector('.popup__picture-element');
export const popupPictureCaption = popupPictureForm.querySelector('.popup__picture-caption');

export const popupDeletePictureForm = page.querySelector('.popup__delete-picture');

export const popupToggles = page.querySelectorAll('.popup__toggle');

export const formSelectors = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
};

export const photoGridSelector = '.photo-grid';

export const userDataSelectors = {
  userNameSelector: '.profile__username',
  userOccupationSelector: '.profile__occupation',
  userAvatarSelector: '.profile__avatar'
};

export const storage = {
  userID: '',
  cardToDelete: []
};