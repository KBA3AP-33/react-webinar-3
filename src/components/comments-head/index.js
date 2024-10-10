import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsHead({ title }) {
  const cn = bem('CommentsHead');

  return (
    <div className={cn()}>
        <div className={cn('title')}>{title}</div>
    </div>
  )
}

export default memo(CommentsHead);
