import React from 'react';
import PropTypes from 'prop-types';
import { getPriceFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function BasketItem({ callbacks = { onDelete: () => {} }, ...props }) {
  const componentCallbacks = {
    onDelete: () => {
      callbacks.onDelete(props.item.code);
    },
  };

  const cn = bem('Basket-Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{getPriceFormat(props.item.price)}</div>
      <div className={cn('count')}>{props.item.count} шт</div>
      <div className={cn('actions')}>
        <Button onClick={componentCallbacks.onDelete}>Удалить</Button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  callbacks: PropTypes.shape({
    onDelete: PropTypes.func
  }),
};

export default React.memo(BasketItem);
