import { codeGenerator, getPagination } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      limit: 10,
      currentPage: 1,
      pages: [],
    };
  }

  async load(page = 1) {
    const offset = (page - 1) * this.getState().limit;
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${offset}&fields=items(_id, title, price),count`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        pages: getPagination({
          first: 1,
          current: page,
          last: Math.ceil(json.result.count / this.getState().limit)
        }),
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
