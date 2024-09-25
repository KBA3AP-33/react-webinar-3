import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';


function List({ list, renderItem, children }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
      ))}
      {children}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
  children: PropTypes.node,
};

export default memo(List);
