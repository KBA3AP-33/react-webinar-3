import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, children }) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      <div className={cn('controls')}>
        {children}
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default React.memo(Head);
