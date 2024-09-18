import React from 'react';
import PropTypes from 'prop-types';
import { getPriceFormat, plural } from "../../utils";

function BasketInfo({ basket }) {
  return (
    <div>
      <span>
        В корзине:&emsp;
        <b>
          {
            (basket?.count)
              ? <>{basket.count} {plural(basket.count, { one: 'товар', few: 'товара', many: 'товаров' })} / {getPriceFormat(basket.price)}</>
              : <>пусто</>
          }
        </b>
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
