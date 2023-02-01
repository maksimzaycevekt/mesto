//отвечает за отрисовку элементов на страниц
export class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._render = renderer;
    this._selector = selector;
  };

  //отрисовка всех элементов
  renderElements() {
    this._items.forEach(item => {
      this._render(item)
    });
  };

  //принимает дом элемент и добавляет его в контейнер, где this selector - контейнер.
  addItem(element) {
    this._selector.prepend(element);
  };
};
