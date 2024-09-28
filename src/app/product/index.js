import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductItem from '../../components/product-item';
import ProductsLayout from '../products-layout';
import { getProperty, numberFormat } from '../../utils';
import Header from '../header';


function Product() {
  const store = useStore();
  const params = useParams();
  
  useEffect(() => {
    store.actions.modals.close();
    store.actions.product.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    app: state.language.app,
    product: state.product.product,
  }));
  const translate = (key) => getProperty(select.app, key);

  const item = (select?.product)
    ? {
      ...select.product,
      madeIn: {
        title: translate('product.originCountry'),
        value: select.product.madeIn.title,
        code: select.product.madeIn.code,
      },
      category: {
        title: translate('product.category'),
        value: select.product.category.title,
      },
      edition: {
        title: translate('product.releaseYear'),
        value: select.product.edition,
      },
      price: `${translate('product.price')}: ${numberFormat(select.product.price)} ₽`,
    }
    : null;

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <ProductsLayout>
      <Header title={select.product?.title}/>
      <ProductItem
        item={item}
        add={{ title: translate('product.addButton'), onAdd: callbacks.addToBasket }}/>
    </ProductsLayout>
  );
}

export default memo(Product);
