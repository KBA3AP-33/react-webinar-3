import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

const CommentInfo = forwardRef(function CommentInfo({ link, title, close, state }, ref) {
  const cn = bem('CommentInfo');

  return (
    <div className={cn()} ref={ref}>
        <span>
            <Link
                to={link.to}
                state={state}
                className={cn('link')}>
                {link.title}
            </Link>
        </span>
        <span>{title} </span>
        {
            (close) &&
                <span className={cn('close')} onClick={close.onClose}>
                    {close.title}
                </span>
        }
    </div>
  );
})

CommentInfo.propTypes = {
    link: PropTypes.shape({
        to: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
    state: PropTypes.shape({
        back: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    close: PropTypes.shape({
        title: PropTypes.string,
        onClose: PropTypes.func,
    }),
    t: PropTypes.func,
};

export default memo(CommentInfo);
