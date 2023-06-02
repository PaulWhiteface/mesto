export default class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    data.forEach(item => {
      this._renderer(item);
    })
  }
}