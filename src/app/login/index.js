import { memo, useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../containers/login-form';
import AuthBar from '../../containers/auth-bar';
import useSelector from '../../hooks/use-selector';
import { useNavigate, useSearchParams } from 'react-router-dom';


function Login() {
    const store = useStore();
    const { t } = useTranslate();
    const navigate = useNavigate();
    const params = useSearchParams();

    const select = useSelector(state => ({
        error: state.authorization.error,
        user: state.authorization.user,
    }));

    useEffect(() => { if (select.user) navigate(params[0].get('from') || '/') }, [select.user]);

    const callbacks = {
        onLogin: useCallback((user) => store.actions.authorization.login(user), [store]),
    }

    return (
        <PageLayout>
            <AuthBar/>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <LoginForm
                onLogin={callbacks.onLogin}
                error={select.error}
                t={t}/>
        </PageLayout>
    );
}

export default memo(Login);
