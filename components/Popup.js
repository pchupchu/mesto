export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this._popupCloseBtn = this._popupSelector.querySelector('.popup__close-button');
    this._popupCloseBtn.addEventListener('click', () => {
      this.close();
    });

    this._popupSelector.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  };
};
