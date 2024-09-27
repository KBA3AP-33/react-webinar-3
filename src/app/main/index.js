import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductsLayout from '../products-layout';
import Pagination from '../../components/pagination';
import { getProperty, numberFormat } from '../../utils';

function Main() {
  const store = useStore();
  
  useEffect(() => {
    const page = sessionStorage.getItem('page');
    store.actions.catalog.load(page ? Number(page) : 1);
  }, []);

  const select = useSelector(state => ({
    app: state.language.app,
    list: state.catalog.list,
    pages: state.catalog.pages,
  }));
  const translate = (key) => getProperty(select.app, key);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    changePage: useCallback(page => {
      store.actions.catalog.load(page);
      sessionStorage.setItem('page', page);
    }, [store]),
  };

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
    <ProductsLayout title={translate('main.title')}>
      <List list={select.list} renderItem={renders.item} pages={select.pages}>
        {
          select.pages.length && <Pagination pages={select.pages} changePage={callbacks.changePage}/>
        }  
      </List>
    </ProductsLayout>
  );
}

export default memo(Main);
