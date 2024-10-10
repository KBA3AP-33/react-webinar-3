import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function Comment({ comment, onReply = () => {}, t = (text) => text }) {
  const cn = bem('Comment');

  const callbacks = {
    onReply: () => onReply(comment._id),
  };

  return (
    <div className={cn()}>
        <div className={cn('header')}>
            <p className={cn('user')}>{comment.author.profile.name}</p>
            <p className={cn('date')}>{comment.dateCreate}</p>
        </div>
        <div className={cn('content')}>{comment.text}</div>
        <div className={cn('controls')}>
            <Link to={'#'} className={cn('controls-link')} onClick={callbacks.onReply}>{t('comments.reply')}</Link>
        </div>
    </div>
  );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.string,
        text: PropTypes.string,
        dateCreate: PropTypes.string,
        author: PropTypes.shape({
            profile: PropTypes.shape({
                name: PropTypes.string,
            }),
        }),
    }).isRequired,
    t: PropTypes.func,
};

export default memo(Comment);
