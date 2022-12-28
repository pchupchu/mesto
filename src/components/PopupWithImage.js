import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImageCard = this._popupElement.querySelector('.popup__image-card');
    this._popupImageTitle = this._popupElement.querySelector('.popup__image-title');
  }


  // open popup
  open(name, link) {
    this._popupImageCard.src = link;
    this._popupImageCard.alt = name;
    this._popupImageTitle.textContent = name;
    super.open();
  };
}
