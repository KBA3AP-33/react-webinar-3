import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { getPagination, getProperty, numberFormat } from '../../utils';


function Catalog() {
  const store = useStore();
  
  useEffect(() => {
    const page = sessionStorage.getItem('page');
    store.actions.catalog.load(page ? Number(page) : 1);
  }, []);

  const select = useSelector(state => ({
    app: state.language.app,
    list: state.catalog.list,
    countPages: state.catalog.countPages,
    currentPage: state.catalog.currentPage,
  }));
  const translate = (key) => getProperty(select.app, key);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    changePage: useCallback(page => {
      store.actions.catalog.load(page);
      sessionStorage.setItem('page', page);
    }, [store]),
  };
  const pages = getPagination({ first: 1, current: select.currentPage, last: select.countPages });

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            item={{ ...item, price: `${numberFormat(item.price)} ₽` }}
            link={`/product/${item._id}`}
            add={{ title: translate('main.catalog.addButton'), onAdd: callbacks.addToBasket }} />
        )
      },
      [callbacks.addToBasket, select.app],
    ),
  };

  return (
    <List list={select.list} renderItem={renders.item}>
        {
            pages.length && <Pagination pages={pages} changePage={callbacks.changePage}/>
        }  
    </List>
  );
}

export default memo(Catalog);
