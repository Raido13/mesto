import Popup from './Popup';
import {popupPictureImage, popupPictureCaption} from '../utils/constants';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(name, link) {
    popupPictureImage.src = link;
    popupPictureImage.alt = name;
    popupPictureCaption.textContent = name;

    super.open();
  }
  
  close() {
    popupPictureImage.src = '';
    popupPictureImage.alt = '';
    popupPictureCaption.textContent = '';
    
    super.close();
  }
}