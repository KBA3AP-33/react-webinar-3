import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function BasketTool({ tool, open }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{tool.title}:</span>
      <span className={cn('total')}>{tool.value}</span>
      {
        open ? <button onClick={open.onOpen}>{open.title}</button> : <></>
      }
    </div>
  );
}

BasketTool.propTypes = {
  tool: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  open: PropTypes.shape({
    title: PropTypes.string,
    onOpen: PropTypes.func,
  }),
};

export default memo(BasketTool);
