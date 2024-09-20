import { generateCode } from './utils';

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

  changeVisibleBasket() {
    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        isVisible: !this.state.basket?.isVisible
      }
    });
  }

  addItemInBasket(code) {
    const item = this.state.list.find(e => e.code === code);
    if (!item) return;

    const basketItem = this.state.basket?.items?.[item.code];
    const count = basketItem?.count ?? 0;
    
    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        items: {
          ...this.state.basket?.items,
          [item.code]: { ...item, count: count + 1 },
        },
        count: (this.state.basket?.count ?? 0) + (typeof(basketItem) === 'undefined'),
        price: (this.state.basket?.price ?? 0) + item.price,
      }
    });
  }

  deleteItemFromBasket(code) {
    const { items, count, price } = this.state.basket;
    const { [code]: item, ...nextBasket } = items;

    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        items: { ...nextBasket },
        count: count - 1,
        price: price - (item.count * item.price),
      },
    });
  }
}

export default Store;
