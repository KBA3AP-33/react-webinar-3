import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductsLayout from '../products-layout';
import useLanguage from '../hooks/use-language';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();
  
  useEffect(() => {
    const page = sessionStorage.getItem('page');
    store.actions.catalog.load(page ? Number(page) : 1);
  }, []);
  const { translate } = useLanguage();

  const select = useSelector(state => ({
    list: state.catalog.list,
    pages: state.catalog.pages,
  }));

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
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
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
