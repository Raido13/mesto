import Popup from './Popup';
import {popupPictureImage, popupPictureCaption} from '../utils/constants';

export default class PopupWithImage extends Popup {
  constructor(popup, name, link) {
    super(popup);
    this._name = name;
    this._link = link;
  }

  open() {
    popupPictureImage.src = this._link;
    popupPictureImage.alt = this._name;
    popupPictureCaption.textContent = this._name;

    super.open();
  }
  
  close() {
    popupPictureImage.src = '';
    popupPictureImage.alt = '';
    popupPictureCaption.textContent = '';
    
    super.close();
  }
}