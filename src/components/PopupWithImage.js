import Popup from './Popup';

//дочерний класс для попапа с картинкой
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._pictureCaption = this._popup.querySelector('.popup__picture-caption');
    this._pictureImage = this._popup.querySelector('.popup__picture-element');
  }

  //метод открытия попапа
  open(name, link) {
    this._pictureImage.src = link;
    this._pictureImage.alt = name;
    this._pictureCaption.textContent = name;

    super.open();
  }
}