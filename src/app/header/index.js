import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Head from '../head';
import Navbar from '../../components/navbar';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useLanguage from '../hooks/use-language';

function Header({ title }) {
    const store = useStore();
    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));
    const { translate } = useLanguage();
    const links = [{ title: translate('main.mainLink'), path: '/' }]
    
    const callbacks = {
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }; 
    const cn = bem('Header');

    return (
        <header className={cn()}>
            <Head title={title} />
            <Navbar links={links}>
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            </Navbar>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string,
};

export default memo(Header);
