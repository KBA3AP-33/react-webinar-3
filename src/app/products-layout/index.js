import { memo } from 'react';
import Header from '../header';
import Basket from '../basket';
import PropTypes from 'prop-types';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';


function ProductLayout({ children }) {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <PageLayout>
        {children}
        {activeModal === 'basket' && <Basket />}
    </PageLayout>
  );
}

ProductLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default memo(ProductLayout);
