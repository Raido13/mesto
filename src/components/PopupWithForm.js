import Popup from './Popup';
import Api from './api';
import FormValidator from './FormValidator';

export default class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
    this._form = popup.querySelector('.popup__form');
    this._inputList = Array.from(popup.querySelectorAll('.popup__item'));
  }

  _getInputValues() {
    return this._inputList.map(input => {return input.value});
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      const data = this._getInputValues();
      
    })
    super.setEventListeners();
  }
}