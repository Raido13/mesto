import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, submitter, autofill) {
    super(popup);
    this._submitter = submitter;
    this._form = popup.querySelector('.popup__form');
    this._inputList = Array.from(popup.querySelectorAll('.popup__item'));
    this._autofill = autofill;
  }

  _getInputValues() {
    return this._inputList.map(input => {return input.value});
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading, formElement) {
    const submitButton = formElement.querySelector('.popup__submit-button');
    if(isLoading) {
      submitButton.textContent = 'Сохранение...';
    } else {
      submitButton.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitter);
    super.setEventListeners();
  }
}