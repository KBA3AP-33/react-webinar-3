import PropTypes from "prop-types";
import { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    let location = useLocation();

    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default memo(RequireAuth);