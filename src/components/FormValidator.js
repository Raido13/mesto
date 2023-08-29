//класс с валидацией форм
export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(formSelectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(formSelectors.submitButtonSelector);
    this._inactiveButtonClass = formSelectors.inactiveButtonClass;
    this._inputErrorClass = formSelectors.inputErrorClass;
    this._errorClass = formSelectors.errorClass;
  }

  //метод, который показывает текст ошибки и подсвечивает поле с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //метод, который скрывает текст ошибки и поле с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.add(this._errorClass);
  }

  //метод проверки поля на валидность
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //метод установки слушателей на инпут, вызывающий проверку валидности поля и изменение статуса кнопки
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //метод проверки, есть ли в списке полей невалидное поле
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  //метод управления состоянием кнопки сабмита формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //метод, запускающий валидацию
  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //метод сброса ошибок валидации и проверка активности кнопки (используется при открытии попапа с данными пользователя и с загрузкой фото)
  reloadValidation() {
    this._inputList.forEach(inputElement => {
      inputElement.setCustomValidity("");
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}