//класс добавленияя элемента в разметку
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //метод применения колбэка на каждый элемент массива
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }

  //метод добавления элемента в конец разметки
  addItemToBottom(element) {
    this._container.append(element);
  }

  //метод добавления элемента в начало разметки
  addItemToTop(element) {
    this._container.prepend(element);
  }
}