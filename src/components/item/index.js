import React from 'react';
import PropTypes from 'prop-types';
import { getPriceFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ onAdd, onDelete, ...props }) {
  const callbacks = {
    onAdd: () => {
      onAdd(props.item);
    },

    onDelete: () => {
      onDelete(props.item.code);
    },
  };

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{getPriceFormat(props.item.price)}</div>
      {
        props.item.count && <div className={cn('count')}>{props.item.count} шт</div>
      } 
      <div className={cn('actions')}>
        {
          onAdd && <button onClick={callbacks.onAdd}>Добавить</button>
        }
        {
          onDelete && <button onClick={callbacks.onDelete}>Удалить</button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number,
    price: PropTypes.number.isRequired,
  }),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
