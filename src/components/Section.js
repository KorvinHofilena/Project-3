class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    console.log("Adding item:", element);
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
