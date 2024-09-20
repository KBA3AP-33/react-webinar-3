import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import { getPriceFormat } from "../../utils";
import { cn as bem } from '@bem-react/classname';
import basketItem from '../basket-item';
import Button from '../button';
import './style.css';

function Basket({ basket, onClose, onDeleteItem }) {
    const getList = () => {
        const { items } = basket;
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
                <Button onClick={callbacks.onClose}>Закрыть</Button>
            </Head>
            {
                (basket?.count)
                    ? <div className={cn('list')}>
                        <List
                            list={getList()}
                            component={basketItem}
                            callbacks={{
                                onDelete: onDeleteItem
                            }}/>
                        <p className={cn('price')}>
                            <span className={cn('total')}>
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
