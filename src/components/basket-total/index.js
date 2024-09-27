import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function BasketTotal({ total }) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{total.title}</span>
      <span className={cn('cell')}> {total.value}</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  total: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }),
};

export default memo(BasketTotal);
