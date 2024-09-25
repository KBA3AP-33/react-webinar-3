import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from "../../utils";
import useLanguage from '../../app/hooks/use-language';

function ProductItem({ item, onAdd = () => {} }) {
    const cn = bem('Product-item');
    const { translate } = useLanguage();

    const callbacks = {
        onAdd: () => onAdd(item._id),
    };
    
    return (
        <div className={cn()}>
            {
                item &&
                <>
                    <div>{item?.description}</div>
                    <div>
                        <span>{translate('product.originCountry')}:&nbsp;</span>
                        <span className={cn('country')}>{item?.madeIn?.title}&nbsp;({item?.madeIn?.code})</span>
                    </div>
                    <div>
                        <span>{translate('product.category')}:&nbsp;</span>
                        <span className={cn('category')}>{item?.category?.title}</span>
                    </div>
                    <div>
                        <span>{translate('product.releaseYear')}:&nbsp;</span>
                        <span className={cn('edition')}>{item?.edition}</span>
                    </div>
                    <div className={cn('price')}>{translate('product.price')}:&nbsp;{numberFormat(item?.price)}&nbsp;₽</div>
                    <button onClick={callbacks.onAdd}>{translate('product.addButton')}</button>
                </>
            }
        </div>
    );
}

ProductItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description: PropTypes.string,
        madeIn: PropTypes.shape({
            code: PropTypes.string,
        }),
        category: PropTypes.shape({
            title: PropTypes.string,
        }),
        edition: PropTypes.number,
        price: PropTypes.number,
    }),
    onAdd: PropTypes.func,
};

export default memo(ProductItem);
