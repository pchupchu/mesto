import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }


  // open popup
  open(name, link) {
    super.open();

    this._popupImageCard = this._popupSelector.querySelector('.popup__image-card');
    this._popupImageTitle = this._popupSelector.querySelector('.popup__image-title');
    this._popupImageCard.src = link;
    this._popupImageCard.alt = name;
    this._popupImageTitle.textContent = name;
  };
}
