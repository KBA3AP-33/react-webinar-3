import { createRoot } from 'react-dom/client';
import Store from './store';
import { StoreContext } from './store/context';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router";

const store = new Store();
const router = createBrowserRouter(routes);
const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
