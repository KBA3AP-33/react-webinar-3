import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function Item({ link = '#', add, ...props }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => add.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{props.item.price}</div>
        {
          add ? <button onClick={callbacks.onAdd}>{add.title}</button> : <></>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
  link: PropTypes.string,
  add: PropTypes.shape({
    title: PropTypes.string,
    onAdd: PropTypes.func,
  }),
};

export default memo(Item);
