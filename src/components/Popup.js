//класс общий для модальных окон
export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeBtn = this._popup.querySelector('.popup__toggle');
    this._handleEscClose = this._handleEscClose.bind(this); //привязываем контекст метода закрытия попапа по клику на esc на класс
  }

  //метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //метод закрытия попапа нажатием на esc
  _handleEscClose = e => {
    if(e.key === 'Escape') this.close();
  }

  //метод установки слушателей на кнопку закрытия попапа и клика на оверлей
  setEventListeners() {
    this._closeBtn.addEventListener('click', evt => this.close());
    this._popup.addEventListener('mousedown', evt => {if(evt.target.classList.contains('popup')) this.close()});
  }
}