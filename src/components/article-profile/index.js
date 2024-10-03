import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ArticleProfile({ article, t = (text) => text }) {
  const cn = bem('ArticleProfile');

  return (
    <div className={cn()}>
        <div className={cn('title')}>{t('profile.title')}</div>
        <div className={cn('prop')}>
            <span className={cn('label')}>{t('profile.name')}:&nbsp;</span>
            <span className={cn('value')}>{article?.profile.name}</span>
        </div>
        <div className={cn('prop')}>
            <span className={cn('label')}>{t('profile.phone')}:&nbsp;</span>
            <span className={cn('value')}>{article?.profile.phone}</span>
        </div>
        <div className={cn('prop')}>
            <span className={cn('label')}>email:&nbsp;</span>
            <span className={cn('value')}>{article?.email}</span>
        </div>
    </div>
  );
}

ArticleProfile.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }),
  t: PropTypes.func,
};

export default memo(ArticleProfile);
