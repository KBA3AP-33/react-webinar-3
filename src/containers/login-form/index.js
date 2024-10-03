import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../../components/form-layout';
import FormInput from '../../components/form-input';

function LoginForm({ onLogin = () => {}, error, t = (text) => text }) {
    const [user, setUser] = useState({ login: '', password: '' });

    const callbacks = {
        onName: (e) => setUser({ ...user, login: e.target.value }),
        onPassword: (e) => setUser({ ...user, password: e.target.value }),
        onLogin: () => onLogin(user),
    }

    return (
        <FormLayout
            title={t('auth.entry')}
            error={error}
            labelSubmit={t('auth.enter')}
            onSubmit={callbacks.onLogin}>
            <FormInput
                id='login'
                title={t('auth.login')}
                value={user.login}
                onChange={callbacks.onName}
                pattern=".{0}|.{5,}"
                required/>
            <FormInput
                id='password'
                title={t('auth.password')}
                type='password'
                value={user.password}
                onChange={callbacks.onPassword}
                pattern=".{0}|.{5,}"
                autoComplete="current-password"
                required/>
        </FormLayout>
    );
}

LoginForm.propTypes = {
    onLogin: PropTypes.func,
    error: PropTypes.string,
    t: PropTypes.func,
};

export default memo(LoginForm);
