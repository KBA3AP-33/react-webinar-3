import React from 'react';
import PropTypes from 'prop-types';
import { getPriceFormat, plural } from "../../utils";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function BasketInfo({ basket }) {
  const cn = bem('Basket-info');

  return (
    <div className={cn()}>
      <span>
        В корзине:&emsp;
        <span className={cn('product')}>
          {
            (basket?.count)
              ? <>{basket.count} {plural(basket.count, { one: 'товар', few: 'товара', many: 'товаров' })} / {getPriceFormat(basket.price)}</>
              : <>пусто</>
          }
        </span>
      </span>
    </div>
  );
}

BasketInfo.propTypes = {
    basket: PropTypes.shape({
        count: PropTypes.number,
        price: PropTypes.number,
    })
};

export default React.memo(BasketInfo);
