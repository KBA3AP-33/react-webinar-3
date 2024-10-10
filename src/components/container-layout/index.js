import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ContainerLayout({ children, direction, justify, items, padding, ...props }) {
  const cn = bem('ContainerLayout');
  return (
    <div className={cn({ direction, justify, items, padding })} {...props}>
      {React.Children.map(children, child => (
        <div key={child.key} className={cn('item')}>
          {child}
        </div>
      ))}
    </div>
  );
}

ContainerLayout.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(['row', 'column']),
  justify: PropTypes.oneOf(['start', 'end', 'between']),
  items: PropTypes.oneOf(['start', 'end']),
  padding: PropTypes.oneOf(['small', 'medium', 'big']),
};

export default memo(ContainerLayout);
