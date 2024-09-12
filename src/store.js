/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const nextId = (this.state.lastId ?? (this.state.list.length ? this.state.list.reduce((acc, el) => acc.code < el.code ? acc.code : el.code) : 0)) + 1;

    this.setState({
      ...this.state,
      lastId: nextId,
      list: [...this.state.list, { code: nextId, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      lastId: this.state.lastId ?? this.state.list.reduce((acc, el) => acc.code < el.code ? acc.code : el.code),
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        const selected = item.code === code && !item.selected;
        const nextItem = {
          ...item,
          selected,
          selectedCount: selected ? (item.selectedCount ?? 0) + 1 : item.selectedCount,
        }
        return nextItem;
      })
    });
  }
}

export default Store;
