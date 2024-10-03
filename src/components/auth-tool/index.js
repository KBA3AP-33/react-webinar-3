import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function AuthTool({ link, user, onLogin = () => {}, onLogout = () => {}, t = (text) => text }) {
    const cn = bem('AuthTool');

    return (
        <div className={cn()}>
            {
                (user)
                ? <>
                    {
                        (link)
                        ? <Link to={link} className={cn('name')}>{user.profile.name}</Link>
                        : <div className={cn('name')}>{user.profile.name}</div>
                    }
                    <button onClick={onLogout}>{t('auth.exit')}</button>
                </>
                :  <button onClick={onLogin}>{t('auth.entry')}</button>
            }
        </div>
    );
}

AuthTool.propTypes = {
    link: PropTypes.string,
    user: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profile: PropTypes.shape({
            name: PropTypes.string,
        })
    }),
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    t: PropTypes.func,
};

export default memo(AuthTool);
