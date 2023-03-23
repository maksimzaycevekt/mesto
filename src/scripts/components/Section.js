//отвечает за отрисовку элементов на страниц
export class Section {
  constructor({items, renderer}, selector) {
    this._utems = items
    this._render = renderer;
    this._selector = document.querySelector(selector);
  };

  //отрисовка всех элементов
  renderElements(method) {
    method.forEach(item => {
      this._render(item)
    });
  };

  //принимает дом элемент и добавляет его в контейнер, где this selector - контейнер.
  addItem(element) {
    this._selector.prepend(element);
  };
};
