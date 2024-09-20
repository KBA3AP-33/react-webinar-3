import React from 'react';
import PropTypes from 'prop-types';
import { getPriceFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import Button from "../button";
import './style.css';

function CatalogItem({ callbacks = { onAdd: () => {} }, ...props }) {
  const componentCallbacks = {
    onAdd: () => {
      callbacks.onAdd(props.item.code);
    },
  };

  const cn = bem('Catalog-Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{getPriceFormat(props.item.price)}</div>
      <div className={cn('actions')}>
        <Button onClick={componentCallbacks.onAdd}>Добавить</Button>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  callbacks: PropTypes.shape({
    onAdd: PropTypes.func
  }),
};

export default React.memo(CatalogItem);
