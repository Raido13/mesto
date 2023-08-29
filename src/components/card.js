//класс карточки с фотографией

//импортируем необходимые функции и переменные
import {storage} from '../utils/constants';

//класс добавления блока в DOM для новой фотографии и подключения к ней необходимых event
export default class Card {
  constructor({item, cardTemplateSelector, handleCardClick, onLikePress, deletePopupOpen}) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._owner = item.owner;
    this._templateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._onLikePress = onLikePress;
    this._deletePopupOpen = deletePopupOpen;
  }

//создаём копию темплейта
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.photo-grid__photo-card').cloneNode(true);
  }

//метод создания карточки
  generate() {
//сохраняем копию темплейта в элемент карточки
    this._template = this._getTemplate();
//создаём необходимые переменные
    this._pictureElement = this._template.querySelector('.photo-grid__photo');
    this._likeButtonElement = this._template.querySelector('.photo-grid__like-button');
    this._likesCounter = this._template.querySelector('.photo-grid__likes-count');
    this._deleteButtonElement = this._template.querySelector('.photo-grid__delete-button');
    this._captionTextButtonElement = this._template.querySelector('.photo-grid__caption-text');
    const condition = (this._owner._id == storage.userID);
//проверяем является ли пользователь владельцем карточки
    if(condition) this._deleteButtonElement.classList.add('photo-grid__delete-button_active');
//задаём параметры для отображения элемента карточки
    this._pictureElement.src = this._link;
    this._pictureElement.alt = this._name;
    this._captionTextButtonElement.textContent = this._name;
//добавляем слушатели событий
    this._setEventListeners();
//приводим карточку к базовому состоянию до добавления в разметку
    this._showLikes();
//возвращаем раметку карточки
    return this._template;
  }

//метод отображения на карточке количества лайков
  _showLikes() {
    const condition = this._likes.some(like => like._id === storage.userID);
    condition
      ? this._likeButtonElement.classList.add('photo-grid__like-button_active')
      : this._likeButtonElement.classList.remove('photo-grid__like-button_active');

    this._likesCounter.textContent = this._likes.length;
  }
  
//метод обновления лайков после нажатия кнопки лайка
  updateLikes(likedCard) {
    this._likes = likedCard.likes;
    this._likesCounter.textContent = this._likes.length;
    this._likeButtonElement.classList.toggle('photo-grid__like-button_active');
  }

//метод расстановки слушателей на элементы связанные с карточкой
  _setEventListeners() {
    //слушатель на кнопку лайка
    this._likeButtonElement.addEventListener('click', () => {
      const condition = this._likeButtonElement.classList.contains('photo-grid__like-button_active');
      this._onLikePress(this._id, condition);
    });

    //слушатель на клик на картинку карточки
    this._pictureElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    //слушатель на значок корзины
    this._deleteButtonElement.addEventListener('click', () => {
      storage.cardToDelete = {id: this._id, element: this._template};
      this._deletePopupOpen();
    });
  }
}
