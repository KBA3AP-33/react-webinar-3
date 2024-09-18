import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ children, isOpen = false }) {
  const cn = bem('Modal');

  return (
    <div className={`${isOpen ? cn() : cn({ display: 'hidden' })}`}>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(Modal);
