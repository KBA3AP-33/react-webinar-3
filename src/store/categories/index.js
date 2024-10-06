import StoreModule from '../module';


class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
    };
  }

  async load() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const items = json.result.items;

    this.setState({ ...this.getState(), list: items }, 'Категории загружены из АПИ');
  }
}

export default CategoriesState;
