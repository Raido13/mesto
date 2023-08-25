//импортируем классы и константы
import '../pages/index.css';
import Api from '../components/api.js';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  options,
  formSelectors,
  userDataSelectors,
  popupPicture,
  popupAddCard,
  popupEditUserdata,
  popupEditAvatar,
  addPictureForm,
  userDataForm,
  userAvatarForm,
  photoGridSelector,
  cardTemplateSelector,
  profileEditButton,
  addPictureButton,
  avatarEditButton,
  usernameInput,
  userOccupationInput,
  profileUsername,
  profileOccupation,
  popupDeleteCard,
  storage
} from '../utils/constants.js';


//создаём экземпляр класса Api
export const api = new Api(options);

//создаём экземпляр класса FormValidator для формы добавления карточки и включаем валидацию
const cardFormValidator = new FormValidator(formSelectors, addPictureForm);
cardFormValidator.enableValidation();

//создаём экземпляр класса FormValidator для формы изменения данных пользователя и включаем валидацию
const userFormValidator = new FormValidator(formSelectors, userDataForm);
userFormValidator.enableValidation();

//создаём экземпляр класса FormValidator для формы изменения аватара и включаем валидацию
const avatarFormValidator = new FormValidator(formSelectors, userAvatarForm);
avatarFormValidator.enableValidation();

const popupAddCardForm = new PopupWithForm({
  popup: popupAddCard,
  submitter: data => {
  popupAddCardForm.renderLoading(true, addPictureForm);
  api.postNewCard(data)
    .then((item) => {
      const card = new Card({
        item,
        cardTemplateSelector,
        handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
        },
        onLikePress: (id, condition) => {
          return api.changeLike(id, condition);
        },
        deletePopupOpen: () => {
          popupDeleteCardForm.open();
        }
      });
      const cardElement = card.generate();
      initialCardList.addItemToTop(cardElement);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupAddCardForm.renderLoading(false, addPictureForm);
      popupAddCardForm.close();
    });
  }
})

const popupEditUserdataForm = new PopupWithForm({
  popup: popupEditUserdata,
  submitter: data => {
    popupEditUserdataForm.renderLoading(true, userDataForm);
    api.patchProfileData(data)
      .then((userData) => {
        profileUsername.textContent = userData.name;
        profileOccupation.textContent = userData.about;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditUserdataForm.renderLoading(false, userDataForm);
        popupEditUserdataForm.close();
      });
  }
})

const popupEditAvatarForm = new PopupWithForm({
  popup: popupEditAvatar,
  submitter: data => {
    popupEditAvatarForm.renderLoading(true, userAvatarForm);
    api.patchAvatar(data)
      .then((userData) => {
        userInfo.setUserAvatar(userData.avatar); 
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatarForm.renderLoading(false, userAvatarForm);
        popupEditAvatarForm.close();
      });
  }
})

const popupWithImage = new PopupWithImage(popupPicture);

const popupDeleteCardForm = new PopupWithForm({
  popup: popupDeleteCard,
  submitter: () => {
    return api.deleteCard(storage.cardToDelete.id)
    .then(() => {
      storage.cardToDelete.element.remove();
      popupDeleteCardForm.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
});

//создаём экземпляр класса Section для загрузки на сайт карточек с фотографиями
const initialCardList = new Section({
  renderer: item => {
    const card = new Card({
      item,
      cardTemplateSelector,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      onLikePress: (id, condition) => {
        return api.changeLike(id, condition);
      },
      deletePopupOpen: () => {
        popupDeleteCardForm.open();
      }
    });
    const cardElement = card.generate();
    initialCardList.addItemToBottom(cardElement);
  }
}, photoGridSelector);

//создаём экземпляр класса с данными пользователя
const userInfo = new UserInfo(userDataSelectors);

//добавляем event открытия модального окна к кнопке редактирования данных пользователя и сброс проверки валидации
profileEditButton.addEventListener('click', () => {
//  сюда вставить вызов функции открытия попапа экземпляра класса редактирования профайла
  popupEditUserdataForm.autofill({usernameInput, userOccupationInput}, userInfo.getUserInfo());
  userFormValidator.reloadValidation(); //подумать, как обойтись без этой функции
  popupEditUserdataForm.open();
});

//добавляем event открытия модального окна к кнопке добавления новой фотографии и сброс проверки валидации
addPictureButton.addEventListener('click', function() {
//  сюда вставить вызов функции открытия попапа экземпляра класса добавления фотографии
  cardFormValidator.reloadValidation(); //подумать, как обойтись без этой функции
  popupAddCardForm.open();
});

//добавляем event открытия модального окна к кнопке изменения аватара и сброс проверки валидации
avatarEditButton.addEventListener('click', function() {
//  сюда вставить вызов функции открытия попапа экземпляра класса изменения аватара
  avatarFormValidator.reloadValidation(); //подумать, как обойтись без этой функции
  popupEditAvatarForm.open();
});

//промис, при исполнении которого загружается информация на сайт и отрисовывается DOM при загрузке
Promise.all([
  api.getInitialUserData(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      userName: userData.name,
      userOccupation: userData.about
    });
    storage.userID = userData._id;
    userInfo.setUserAvatar(userData.avatar);
    initialCardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })

/*
//базовый файл с кодом. Здесь вызовы функций и установка слушателей событий

//экспортируем необходимые функции
export {
  page,
  content,
  pictureTitle,
  pictureLink,
  pictureTemplate,
  popupPictureForm,
  popupDeletePictureForm,
  popupPictureImage,
  popupPictureCaption,
  photoGrid,
  popups,
  popupUserDataForm,
  usernameInput,
  userOccupationInput,
  userAvatarLinkInput,
  profileInfo,
  profileUsername,
  profileOccupation,
  popupUserAddPictureForm,
  popupUserAvatarForm,
  avatarEditButton,
  cardToDelete,
  handleDeletePictureFormSubmit
};

//импортируем необходимые функции и переменные

import { enableValidation, reloadValidation } from '../components/FormValidator.js';
import { openPopup, closePopup, checkIfClickOnOverlay } from '../components/Popup.js';
import { fillInputField, updateUserData, updateUserAvatar, renderLoading } from '../utils/utils.js';
import { getInitialUserData, getInitialCards, patchProfileData, patchAvatar, postNewCard, deleteCard } from '../components/Api.js';
import { addPictureToBottom, addPictureToTop } from '../components/Card.js';

// подгружаем необходимые элементы из DOM
const page = document.querySelector('.page');
const content = page.querySelector('.content');

const pictureTitle = page.querySelector('.popup__item_input_picture-title');
const pictureLink = page.querySelector('.popup__item_input_picture-link');
const pictureTemplate = page.querySelector('#photo-card-template').content;
const popupPictureForm = page.querySelector('.popup__picture-form');
const popupPictureImage = popupPictureForm.querySelector('.popup__picture-element');
const popupPictureCaption = popupPictureForm.querySelector('.popup__picture-caption');
const photoGrid = content.querySelector('.photo-grid');

const popups = page.querySelectorAll('.popup');

const popupUserDataForm = page.querySelector('.popup__user-data');
const popupUserAddPictureForm = page.querySelector('.popup__add-picture');
const popupUserAvatarForm = page.querySelector('.popup__user-avatar');
const popupDeletePictureForm = page.querySelector('.popup__delete-picture');
const usernameInput = popupUserDataForm.querySelector('.popup__item_input_username');
const userOccupationInput = popupUserDataForm.querySelector('.popup__item_input_occupation');
const userAvatarLinkInput = popupUserAvatarForm.querySelector('.popup__item_input_avatar-link');
const profileInfo = content.querySelector('.profile__info');
const profileUsername = profileInfo.querySelector('.profile__username');
const profileOccupation = profileInfo.querySelector('.profile__occupation');

const popupToggles = page.querySelectorAll('.popup__toggle');
const profileEditButton = content.querySelector('.profile__edit-button');
const addPictureButton = content.querySelector('.profile__add-button');
const avatarEditButton = content.querySelector('.profile__avatar');

const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
};

//создаем переменную для подгрузки в неё личного ID, для сверки своих лайков и своих карточек
let myId;
//создаем переменную для подгрузки в неё ID и DOM-элемента удаляемой карточки, чтобы передать в сабмит формы подтверждения удаления
let cardToDelete = {};

//добавляем event открытия модального окна к кнопке редактирования данных пользователя и сброс проверки валидации
profileEditButton.addEventListener('click', function() {
  openPopup(popupUserDataForm);
  fillInputField(usernameInput, userOccupationInput, profileUsername, profileOccupation);
  reloadValidation(popupUserDataForm, formSelectors);
});

//добавляем event открытия модального окна к кнопке добавления новой фотографии и сброс проверки валидации
addPictureButton.addEventListener('click', function() {
  pictureTitle.value = "";
  pictureLink.value = "";
  openPopup(popupUserAddPictureForm);
  reloadValidation(popupUserAddPictureForm, formSelectors);
});

//добавляем event открытия модального окна к кнопке изменения аватара и сброс проверки валидации
avatarEditButton.addEventListener('click', function() {
  userAvatarLinkInput.value = "";
  openPopup(popupUserAvatarForm);
  reloadValidation(popupUserAvatarForm, formSelectors);
})

//добавляем event закрытия модального окна по кнопке крестик
popupToggles.forEach(function(element) {
  element.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')));
});

//добавляем слушатель клика на оверлей на все попапы
popups.forEach((popup) => {
  popup.addEventListener('mousedown', checkIfClickOnOverlay);
})

//добавляем event по клику на кнопку сохранения формы изменения данных пользователя, вызывающий соответствующую функцию
popupUserDataForm.addEventListener('submit', handleProfileFormSubmit);

//добавляем event по клику на кнопку добавления фотографии, вызывающий соответствующую функцию
popupUserAddPictureForm.addEventListener('submit', handlePictureAddingFormSubmit);

//добавляем event по клику на кнопку сохранения формы изменения аватара пользователя, вызывающий соответствующую функцию
popupUserAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

//установка слушателя на сабмит формы удаления карточки
popupDeletePictureForm.addEventListener('submit', handleDeletePictureFormSubmit);


//Форма отправки на сервер формы по изменению персональных данных пользователя
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupUserDataForm);
  patchProfileData(usernameInput, userOccupationInput)
    .then((userData) => {
      profileUsername.textContent = userData.name;
      profileOccupation.textContent = userData.about;
      closePopup(popupUserDataForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupUserDataForm);
    });
}

//Форма отправки на сервер добавленной фотографии
function handlePictureAddingFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupUserAddPictureForm);
  postNewCard(pictureTitle, pictureLink)
    .then((newCard) => {
      addPictureToTop(newCard.name, newCard.link, newCard.owner._id, myId, newCard._id, newCard.likes);
      closePopup(popupUserAddPictureForm);
      evt.target.reset();
    })
    .catch(() => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupUserAddPictureForm);
    });
}

//Форма отправки на сервер ссылки на картинку с новым аватаром
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupUserAvatarForm);
  patchAvatar(userAvatarLinkInput)
    .then((userData) => {
      updateUserAvatar(userData.avatar);
      closePopup(popupUserAvatarForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupUserAvatarForm);
    });
}

//Функция удаления карточки через форму подтверждения
function handleDeletePictureFormSubmit(evt) {
  evt.preventDefault();
  deleteCard(cardToDelete.id)
    .then((res) => {
      cardToDelete.domElement.remove();
      closePopup(popupDeletePictureForm);
    })
    .catch((err) => {
      console.log(err);
    });
}

//вызываем функцию валидации
enableValidation(formSelectors);

//загружаем данные пользователя, аватар и карточки из fetch-запроса к серверу
Promise.all([
  getInitialUserData(),
  getInitialCards()
])
  .then(([userData, initialCards]) => {
    updateUserData(userData.name, userData.about);
    updateUserAvatar(userData.avatar);
    myId = userData._id;
    initialCards.forEach(element => {
      addPictureToBottom(element.name, element.link, element.owner._id, myId, element._id, element.likes);
    });
  })
  .catch((err) => {
    console.log(err);
  })

  */