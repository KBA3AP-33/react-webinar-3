import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Head from '../../components/head';
import Navbar from '../../components/navbar';
import LanguageSelector from "../language-selector";
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { getProperty, numberFormat, plural } from '../../utils';

function Header({ title }) {
    const store = useStore();
    const select = useSelector(state => ({
        app: state.language.app,
        language: state.language.language,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));
    const translate = (key) => getProperty(select.app, key);

    const links = [{ title: translate('main.mainLink'), path: '/' }]
    
    const getTotal = (amount, sum, lang) => {
        if (!amount) return translate('main.basket.basketTool.empty');
    
        const products = (lang === 'eu')
          ? plural(amount, { one: 'product', other: 'products' }, 'eu-EU')
          : plural(amount, { one: 'товар', few: 'товара', many: 'товаров' })
    
        return `${amount} ${products} / ${numberFormat(sum)} ₽`
    }

    const callbacks = {
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }; 
    const cn = bem('Header');

    return (
        <header className={cn()}>
            <Head title={title}>
                <LanguageSelector/>
            </Head>
            <Navbar links={links}>
                <BasketTool
                    open={{ title: translate('main.basket.basketTool.goButton'), onOpen: callbacks.openModalBasket }}
                    tool={{ title: translate('main.basket.basketTool.title'), value: getTotal(select.amount, select.sum, select.language) }} />
            </Navbar>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string,
};

export default memo(Header);
