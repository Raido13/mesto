export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeBtn = this._popup.querySelector('.popup__toggle');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.delEventListeners();
  }

  _handleEscClose = e => {
    if(e.key === 'Escape') this.close(document.querySelector('.popup_opened'));
  }

  _checkIfClickOnOverlay = e => {
    if(e.target.classList.contains('popup')) this.close(e.target);
  }

  __handleClose = e => {
    this.close(e.target.closest('.popup'));
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', this.__handleClose);
    this._popup.addEventListener('mousedown', this._checkIfClickOnOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  delEventListeners() {
    this._closeBtn.removeEventListener('click', this.close);
    this._popup.removeEventListener('mousedown', this._checkIfClickOnOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}

/*
//блок функций по работе модальных окон

//импортируем необходимые функции и переменные
import { popups } from '../pages/index.js';

//экспортируем необходимые функции и переменные
export { openPopup, closePopup, checkIfClickOnOverlay };

//Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', checkIfEsc);
}

//Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkIfEsc);
}

//функция добавления event закрытия модального окна по нажатию на оверлей
function checkIfClickOnOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//функция добавляет event закрытия модального окна по клавише esc
function checkIfEsc(evt) {
  if (evt.key === "Escape") {
    popups.forEach(popup => {
      if(popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  }
}

*/