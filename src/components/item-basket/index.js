import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import useLanguage from '../../app/hooks/use-language';
import { Link } from 'react-router-dom';
import './style.css';

function ItemBasket({ onRemove = () => {}, ...props }) {
  const cn = bem('ItemBasket');
  const { translate } = useLanguage();

  const callbacks = {
    onRemove: () => onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/product/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate('basket.itemCount')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('basket.removeButton')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
