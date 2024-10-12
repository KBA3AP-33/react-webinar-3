import { memo, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentForm = forwardRef(function CommentForm({ title, create, close, t = (text) => text }, ref) {
  const cn = bem('CommentForm');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const callbacks = {
    create: (e) => {
      e.preventDefault();
      const comment = value.trim();

      if (!comment) {
        setError('Заполните поле');
        return;
      }

      setError('');
      create(comment);
      setValue('');
    }
  };

  return (
    <form className={cn()} onSubmit={callbacks.create}>
        <p className={cn('title')}>{title}</p>
        <div>
            <textarea
              ref={ref}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={cn('content')}/>
          {
            error && <div className={cn('error')}>{error}</div>
          }
        </div>
        <div className={cn('controls')}>
            <button>{t('comments.send')}</button>
            {
              (close) && <button onClick={close.onClose}>{close.title}</button>
            }
        </div>
    </form>
  );
})

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  create: PropTypes.func.isRequired,
  close: PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
  }),
  t: PropTypes.func,
};

export default memo(CommentForm);
