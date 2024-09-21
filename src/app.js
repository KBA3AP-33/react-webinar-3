import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Basket from './components/basket';
import BasketInfo from './components/basket-info';
import CatalogItem from './components/catalog-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;

  const callbacks = {
    onAddInBasket: useCallback((code) => {
      store.addItemInBasket(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItemFromBasket(code);
    }, [store]),

    onChangeVisibleModal: useCallback(() => {
      store.changeVisibleBasket();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onMove={callbacks.onChangeVisibleModal}>
        <BasketInfo basket={basket}/>
      </Controls>
      <List
        list={list}
        callbacks={{ onAdd: callbacks.onAddInBasket }}>
          <CatalogItem/>
      </List>
        
      <Modal isOpen={basket?.isVisible}>
        {
          basket?.isVisible &&
            <Basket
              basket={basket}
              onDeleteItem={callbacks.onDeleteItem}
              onClose={callbacks.onChangeVisibleModal}/>
        }
      </Modal>
    </PageLayout>
  );
}

export default App;
