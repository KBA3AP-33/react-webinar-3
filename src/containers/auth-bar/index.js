import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import AuthTool from '../../components/auth-tool';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';


function AuthBar() {
    const store = useStore();
    const navigate = useNavigate();
    const { t } = useTranslate();

    const select = useSelector(state => ({
        user: state.authorization.user,
    }));

    useEffect(() => { store.actions.authorization.init() }, []);

    const callbacks = {
        onLogin: useCallback(() => navigate(`/login?from=${(location.pathname !== '/login') ? location.pathname : ''}`), []),
        onLogout: useCallback(() => store.actions.authorization.logout(), [store]),
    } 

    return (
        <SideLayout side="end">
            <AuthTool
                link={`/profile`}
                user={select.user}
                onLogin={callbacks.onLogin}
                onLogout={callbacks.onLogout}
                t={t}/>
        </SideLayout>
    );
}

export default memo(AuthBar);
