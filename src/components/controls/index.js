import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Controls({ children, onMove = () => {} }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={() => onMove()}>Перейти</button>
      {children}
    </div>
  );
}

Controls.propTypes = {
  children: PropTypes.node,
  onMove: PropTypes.func,
};

export default React.memo(Controls);
