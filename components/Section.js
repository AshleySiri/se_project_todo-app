class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._data.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }
}

export default Section;
