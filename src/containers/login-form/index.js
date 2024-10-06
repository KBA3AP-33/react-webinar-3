import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../../components/form-layout';
import FormInput from '../../components/form-input';

function LoginForm({ onLogin = () => {}, error, t = (text) => text }) {
    const [user, setUser] = useState({ login: '', password: '' });
    const [errors, setErrors] = useState(error ? [error] : []);

    const isValid = () => {
        let errors = [];
        setErrors(errors);

        if (user.login.length < 5) errors = [...errors, `Минимальная длина поля "${t('auth.login')}" - 5 символов`];
        if (user.password.length < 5) errors = [...errors, `Минимальная длина поля "${t('auth.password')}" - 5 символов`];

        setErrors(prev => [...prev, ...errors]);
        return !(!!errors.length);
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
            errors={(errors.length) ? errors : (error) ? [error] : []}
            labelSubmit={t('auth.enter')}
            onSubmit={callbacks.onLogin}>
            <FormInput
                id='login'
                title={t('auth.login')}
                value={user.login.trimStart()}
                onChange={callbacks.onName}/>
            <FormInput
                id='password'
                title={t('auth.password')}
                type='password'
                value={user.password.trimStart()}
                onChange={callbacks.onPassword}/>
        </FormLayout>
    );
}

LoginForm.propTypes = {
    onLogin: PropTypes.func,
    error: PropTypes.string,
    t: PropTypes.func,
};

export default memo(LoginForm);
