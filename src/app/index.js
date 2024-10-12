import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../containers/protected';
import { useSelector as useSelectorRedux } from 'react-redux';
import useTranslate from '../hooks/use-translate';
import useServices from '../hooks/use-services';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  useInit(async () => {
    await store.actions.session.remind();
  });

  const services = useServices();
  const { lang } = useTranslate();

  useLayoutEffect(() => {
    const header = services._i18n.config.langHeader;
    store.services.api.setHeader(header, lang);
  }, [lang]);

  const activeModal = useSelectorRedux(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={
            <Protected redirect="/login">
              <Profile />
            </Protected>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
