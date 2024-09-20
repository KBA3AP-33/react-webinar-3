import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';


function List({ list, component, callbacks }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          { React.createElement(component, { item, callbacks }) }
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
  component: PropTypes.object,
  callbacks: PropTypes.object,
};

export default React.memo(List);
