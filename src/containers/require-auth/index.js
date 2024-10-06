import PropTypes from "prop-types";
import { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function RequireAuth({ children }) {
    let location = useLocation();
    const navigate = useNavigate();
    const store = useStore();

    const select = useSelector(state => ({
      user: state.profile.user,
      waiting: state.profile.waiting,
      error: state.profile.error,
    }));

    useEffect(() => { store.actions.profile.load(); }, []);
    useEffect(() => {
      if (select.error) {
        store.actions.authorization.logout();
        navigate('/', { replace: true });
      }

      if (!select.waiting) {
        if (!select.user) {
            navigate(`/login?from=${location.pathname}`, { replace: true });
        }
      }
    }, [select.waiting, select.user, select.error]);
  
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default memo(RequireAuth);