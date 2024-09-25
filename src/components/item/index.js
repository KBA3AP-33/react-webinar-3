import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom';
import useLanguage from '../../app/hooks/use-language';
import './style.css';

function Item({ onAdd = () => { }, ...props }) {
  const cn = bem('Item');
  const { translate } = useLanguage();

  const callbacks = {
    onAdd: () => onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/product/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate('main.catalog.addButton')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
