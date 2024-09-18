import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, onAdd, onDelete }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} onDelete={onDelete} onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(List);
