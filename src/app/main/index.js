import { memo, useEffect } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductsLayout from '../products-layout';
import { getProperty } from '../../utils';
import Header from '../header';
import Catalog from '../catalog';

function Main() {
  const store = useStore();
  
  useEffect(() => {
    const page = sessionStorage.getItem('page');
    store.actions.catalog.load(page ? Number(page) : 1);
  }, []);

  const select = useSelector(state => ({
    app: state.language.app,
  }));
  const translate = (key) => getProperty(select.app, key);

  return (
    <ProductsLayout>
      <Header title={translate('main.title')}/>
      <Catalog/>
    </ProductsLayout>
  );
}

export default memo(Main);
