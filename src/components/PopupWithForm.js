import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({popup, submitter}) {
    super(popup);
    this._submitter = submitter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(popup.querySelectorAll('.popup__item'));
  }
  //тут костыль
  _getInputValues() {
    return this._inputList.map(input => {return input.value});
  }

  close() {
    this._form.reset();
    super.close();
  }

  autofill(inputElements, userData) {
    inputElements.usernameInput.value = userData.userName;
    inputElements.userOccupationInput.value = userData.userOccupation;
  }

  renderLoading(isLoading, formElement) {
    const submitButton = formElement.querySelector('.popup__submit-button');
    isLoading
      ?  submitButton.textContent = 'Сохранение...'
      :  submitButton.textContent = 'Сохранить';
  }

  _handleSubmitter = e => {
    e.preventDefault();
    const data = this._getInputValues();
    this._submitter(data);
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmitter);
    super.setEventListeners();
  }

  delEventListeners() {
    this._form.removeEventListener('submit', this._handleSubmitter);
    super.delEventListeners();
  }
}