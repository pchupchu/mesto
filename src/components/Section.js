export default class Section {
  constructor({ renderer }, selector) {
    //this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }


  renderCards(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
