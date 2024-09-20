import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ children, ...props }) {
  return (
    <button className="button" {...props}>
        {children}
    </button>
  );
}

Button.propTypes = {
    children: PropTypes.node,
};

export default React.memo(Button);
