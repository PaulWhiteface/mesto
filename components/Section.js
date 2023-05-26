export default class Section {
  constructor({items, renderer}, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  addItem() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    })
  }
}