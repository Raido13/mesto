//блок функций по созданию карточек с фотографиями

//импортируем необходимые функции и переменные

import {popupPictureForm, storage, popupDeletePictureForm} from '../utils/constants';
import Popup from './Popup';
import PopupWithImage from './PopupWithImage';

//класс добавления блока в DOM для новой фотографии и подключения к ней необходимых event и fetch
export default class Card {
  constructor(name, link, likes, _id, owner) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
  }
//создаём копию темплейта
  _getElement() {
    return document.querySelector('.photo-grid__photo-card').cloneNode(true);
  }

  generate() {
//сохраняем копию темплейта в элемент карточки
    this._element = this._getElement();
//создаём необходимые переменные
    this._pictureElement = this._element.querySelector('.photo-grid__photo');
    this._likeButtonElement = this._element.querySelector('.photo-grid__like-button');
    this._likesCounter = this._element.querySelector('.photo-grid__likes-count');
    this._deleteButtonElement = this._element.querySelector('.photo-grid__delete-button');
    this._captionTextButtonElement = this._element.querySelector('.photo-grid__caption-text');
    const condition = (this._owner._id == storage.userID);
//проверяем является ли пользователь владельцем карточки
    if(condition) deleteButtonElement.classList.add('photo-grid__delete-button_active');
//задаём параметры для отображения элемента карточки
    pictureElement.src = this._link;
    pictureElement.alt = this._name;
    captionTextButtonElement.textContent = this._name;
//добавляем слушатели событий
    this._setEventListeners();
//приводим карточку к базовому состоянию до добавления в разметку
    this._showLikes();
    this._checkMyLike();
    this._activateLikeButton();
//возвращаем раметку карточки
    return this._element;
  }
//метод отображения на карточке количества лайков
  _showLikes() {
    this._likesCounter.textContent = this._likes.lenght;
  }
//метод проверки, есть ли собственный лайк на карточке
  _checkMyLike() {
    const condition = this.likes.find(like => like._id == storage.userID);
    condition
      ? this._likeButtonElement.classList.add('photo-grid__like-button_active')
      : this._likeButtonElement.classList.remove('photo-grid__like-button_active');

    this._showLikes();
  }
//метод отправки запроса на сервер о состоянии кнопки лайка карточки
  _activateLikeButton() {
    const condition = this._likeButtonElement.classList.contains('photo-grid__like-button_active');
    condition
      ? Api.removeLike(this._id)
        .then(() => {
          this._showLikes();
          this._checkMyLike();
        })
        .catch((err) => {
          console.log(err);
        })
      : Api.addLike(this._id)
        .then(() => {
          this._showLikes();
          this._checkMyLike();
        })
        .catch((err) => {
          console.log(err);
        });
  }
//метод подготовки к открытию попапа с картинкой
  _imageOpenPopup() {
    new PopupWithImage(popupPictureForm, this._name, this._link);
  }
//метод подготовки к закрытию попапа с картинкой
  _imageClosePopup() {
    PopupWithImage.close();
  }
//метод подготовки к открытию попапа с подтверждением удаления элемента
  _deletePopupOpen() {
    storage.cardToDelete = [this._id, this._element]

    Popup.open(popupDeletePictureForm);
  }
//метод закрытия попапа с подтверждением удаления элемента
  _deleteCloseOpen() {
    Popup.close(popupDeletePictureForm);
  }
//метод расстановки слушателей на элементы связанные с карточкой
  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => {
      this._activateLikeButton();
    })
    this._pictureElement.addEventListener('click', () => {
      this._imageOpenPopup();
    })
    this._deleteButtonElement.addEventListener('click', () => {
      this._deletePopupOpen();
    })
    // popupDeletePictureForm.closest('.popup__toggle').addEventListener('click', () => {
    //   this._deleteCloseOpen();
    // })
    // popupPictureForm.closest('.popup__toggle').addEventListener('click', () => {
    //   this._imageClosePopup();
    // })
  }
}

/*
//блок функций по созданию карточек с фотографиями

//импортируем необходимые функции и переменные
import { openPopup } from "./modal.js";
import { addLike, removeLike } from "./Api.js";
import {
  content,
  pictureTitle,
  pictureLink,
  pictureTemplate,
  popupPictureForm,
  popupDeletePictureForm,
  popupPictureImage,
  popupPictureCaption,
  photoGrid,
  cardToDelete,
} from '../pages/index.js';

//экспортируем необходимые функции и переменные
export {
  addPictureToTop,
  addPictureToBottom,
  activateDeleteButton,
  showLikes,
  content,
  pictureTitle,
  pictureLink
};

//функция добавления блока в DOM для новой фотографии и подключения к ней необходимых event и fetch
function createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
//создаём необходимые переменные
  const pictureCard = pictureTemplate.querySelector('.photo-grid__photo-card').cloneNode(true);
  const pictureElement = pictureCard.querySelector('.photo-grid__photo');
  const likeButtonElement = pictureCard.querySelector('.photo-grid__like-button');
  const likesCounter = pictureCard.querySelector('.photo-grid__likes-count');
  const deleteButtonElement = pictureCard.querySelector('.photo-grid__delete-button');
  const captionTextButtonElement = pictureCard.querySelector('.photo-grid__caption-text');

  //задаём параметры переменным для заполнения карточки
  pictureElement.src = pictureLink;
  pictureElement.alt = pictureTitle;
  captionTextButtonElement.textContent = pictureTitle;

  //добавляем event по клику на фотокарточку, открывающий модальное окно с фотографией
  pictureElement.addEventListener('click', function(evt) {
    popupPictureImage.src = pictureLink;
    popupPictureImage.alt = pictureTitle;
    popupPictureCaption.textContent = pictureTitle;
    openPopup(popupPictureForm);
  });

  //запускаем функции проверки, сколько лайков у карточки, и есть ли свой лайк, подключаем функцию активации лайка и функцию активации кнопки удаления карточки
  showLikes(usersList, likesCounter);
  checkMyLike(usersList, personalId, likeButtonElement);
  activateLikeButton(likesCounter, likeButtonElement, pictureId);
  activateDeleteButton(cardId, personalId, pictureId, deleteButtonElement);

  //возвращаем готовую карточку
  return pictureCard;
}


// функция по добавлению карточки в начало Грида (для добавления карточки через форму, чтобы новая карточка была сверху)
function addPictureToTop(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
  //вызываем функцию создания фотокарточки
  const pictureCard = createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList);
  //добавляем фото в начало грид-блока
  photoGrid.prepend(pictureCard);
}

// функция по добавлению карточки в конец Грида (для предзагрузки карточек с сервера, чтобы свежие были вверху)
function addPictureToBottom(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
  //вызываем функцию создания фотокарточки
  const pictureCard = createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList);
  //добавляем фото в конец грид-блока
  photoGrid.append(pictureCard);
}

//функция добавления кнопки удаления на свою карточку и работы этой кнопки
function activateDeleteButton(cardId, personalId, pictureId, deleteButtonElement) {
  if(cardId === personalId) {
    deleteButtonElement.classList.add('photo-grid__delete-button_active');
    deleteButtonElement.addEventListener('click', (evt) => {
      openPopup(popupDeletePictureForm);
      cardToDelete.domElement = deleteButtonElement.closest('.photo-grid__photo-card');
      cardToDelete.id = pictureId;
    });
  }
}

//функция отображения на карточке количества лайков
function showLikes(usersList, likesCounter) {
  const likesNumber = usersList.length;
  likesCounter.textContent = likesNumber;
}

//функция проверки, есть ли собственный лайк на карточке
function checkMyLike(usersList, personalId, likeButtonElement) {
  const usersArray = Array.from(usersList);
  const hasMyLike = usersArray.some((user) => {
    return user._id === personalId;
  });
  if (hasMyLike) {
    likeButtonElement.classList.add('photo-grid__like-button_active');
  } else {
    likeButtonElement.classList.remove('photo-grid__like-button_active');
  }
}

//функция, подключающая на лайк слушатель, который отправляет запрос на сервер и меняет статус кнопки лайка
function activateLikeButton(likesCounter, likeButtonElement, pictureId) {
  likeButtonElement.addEventListener('click', function(evt) {
    if (likeButtonElement.classList.contains('photo-grid__like-button_active')) {
      removeLike(pictureId)
        .then((updatedCard) => {
          showLikes(updatedCard.likes, likesCounter);
          likeButtonElement.classList.toggle('photo-grid__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addLike(pictureId)
        .then((updatedCard) => {
          showLikes(updatedCard.likes, likesCounter);
          likeButtonElement.classList.toggle('photo-grid__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

*/