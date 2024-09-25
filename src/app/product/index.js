import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductItem from '../../components/product-item';
import ProductsLayout from '../products-layout';


function Product() {
  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.actions.modals.close();
    store.actions.product.load(params.id);
  }, []);

  const select = useSelector(state => ({
    product: state.product.product,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <ProductsLayout title={select.product?.title}>
      <ProductItem item={select?.product} onAdd={callbacks.addToBasket}/>
    </ProductsLayout>
  );
}

export default memo(Product);
