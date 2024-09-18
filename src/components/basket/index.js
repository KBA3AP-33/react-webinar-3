import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import { getPriceFormat } from "../../utils";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Basket({ basket, onClose, onDeleteItem }) {
    const getList = () => {
        const { price, count, isVisible, ...items } = basket;
        return Object.values(items);
    }
    
    const callbacks = {
        onClose: () => {
            onClose();
        },
    };

    const cn = bem('Basket');

    return (
        <div className={cn()}>
            <Head title="Корзина">
                <button onClick={callbacks.onClose}>Закрыть</button>
            </Head>
            {
                (basket?.count)
                    ? <div className={cn('list')}>
                        <List
                            list={getList()}
                            onDelete={onDeleteItem}/>
                        <p className={cn('price')}>
                            <span className={cn('total', {padding: 'cell'})}>
                                Итого:&ensp;
                            </span>
                            <span className={cn('total', {padding: 'cell'})}>
                                {getPriceFormat(basket.price)}
                            </span>
                        </p>
                    </div>
                    : <p className={cn('empty')}>Корзина пуста</p>
            }
        </div>
    )
}

Basket.propTypes = {
    basket: PropTypes.shape({
        count: PropTypes.number,
        price: PropTypes.number,
    }),
    onDeleteItem: PropTypes.func,
    onClose: PropTypes.func,
};

export default React.memo(Basket);
