import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../router";


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <Router>
      <Routes>
        {
          routes.map(route => <Route key={route.path} path={route.path} element={route.element} exact />)
        }
      </Routes>
    </Router>
  );
}

export default App;
