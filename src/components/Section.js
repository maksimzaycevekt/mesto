//отвечает за отрисовку элементов на страниц
export class Section {
  constructor({items, renderer}, element) {
    this._utems = items
    this._render = renderer;
    this._element = document.querySelector(element);
  };

  //отрисовка всех элементов
  renderElements(items) {
    items.forEach(item => {
      this._render(item)
    });
  };

  //принимает дом элемент и добавляет его в контейнер, где this selector - контейнер.
  addItem(element) {
    this._element.prepend(element);
  };
};
