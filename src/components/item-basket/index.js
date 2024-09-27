import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ItemBasket({ link = '#', remove, ...props }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: () => remove.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={link}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{props.item.price}</div>
        <div className={cn('cell')}>{props.item.amount}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{remove.title}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
  link: PropTypes.string,
  remove: PropTypes.shape({
    title: PropTypes.string,
    onRemove: PropTypes.func,
  }),
};

export default memo(ItemBasket);
