import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { getProperty, numberFormat } from '../../utils';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    app: state.language.app,
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const translate = (key) => getProperty(select.app, key);

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        const basketItem = {
          ...item,
          price: `${numberFormat(item.price)} ₽`,
          amount: `${numberFormat(item.amount || 0)} ${translate('basket.itemCount')}`,
        }
        return (
          <ItemBasket
            item={basketItem}
            link={`/product/${basketItem._id}`}
            remove={{ title: translate('basket.removeButton'), onRemove: callbacks.removeFromBasket }}/>
        );
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout
      title={translate('basket.title')}
      close={{ title: `${translate('modal.closeButton')}`,
      onClose: callbacks.closeModal }}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal total={{ title: translate('basket.total'), value: `${numberFormat(select.sum)} ₽` }} />
    </ModalLayout>
  );
}

export default memo(Basket);
