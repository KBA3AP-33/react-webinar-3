import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Profile from './profile';
import Login from './login';
import RequireAuth from "../containers/require-auth";
import useStore from '../hooks/use-store';
import { useEffect } from 'react';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  useEffect(() => { store.actions.authorization.load() }, []);
 
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/profile'} element={<RequireAuth><Profile/></RequireAuth>}/>
        <Route path={'/login'} element={<Login />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
