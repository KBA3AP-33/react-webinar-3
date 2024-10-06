import StoreModule from '../module';


class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  async load() {
    this.setState({ ...this.getState(), waiting: true });
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const items = json.result.items;

    this.setState({ ...this.getState(), list: items, waiting: false }, 'Категории загружены из АПИ');
  }
}

export default CategoriesState;
