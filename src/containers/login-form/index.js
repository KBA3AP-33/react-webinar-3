import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../../components/form-layout';
import FormInput from '../../components/form-input';

function LoginForm({ onLogin = () => {}, error, waiting, t = (text) => text }) {
    const [user, setUser] = useState({ login: '', password: '' });
    const [errors, setErrors] = useState({ login: '', password: '' });
    
    const isValid = () => {
        const nextErrors = { login: '', password: '' };

        if (user.login.length < 5) nextErrors.login = `Минимальная длина 5 символов`;
        if (user.password.length < 5) nextErrors.password = `Минимальная длина 5 символов`;

        setErrors(nextErrors);
        return nextErrors.login === '' && nextErrors.password === '';
    }

    const callbacks = {
        onName: (e) => setUser({ ...user, login: e.target.value }),
        onPassword: (e) => setUser({ ...user, password: e.target.value }),
        onLogin: () => {
            if (isValid()) {
                onLogin(user);
            }
        },
    }

    return (
        <FormLayout
            title={t('auth.entry')}
            error={error}
            waiting={waiting}
            labelSubmit={t('auth.enter')}
            onSubmit={callbacks.onLogin}>
            <FormInput
                id='login'
                title={t('auth.login')}
                error={errors.login}
                value={user.login.trimStart()}
                onChange={callbacks.onName}/>
            <FormInput
                id='password'
                title={t('auth.password')}
                error={errors.password}
                type='password'
                value={user.password.trimStart()}
                onChange={callbacks.onPassword}/>
        </FormLayout>
    );
}

LoginForm.propTypes = {
    onLogin: PropTypes.func,
    error: PropTypes.string,
    waiting: PropTypes.bool,
    t: PropTypes.func,
};

export default memo(LoginForm);
