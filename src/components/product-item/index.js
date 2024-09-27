import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProductItem({ item, add }) {
    const cn = bem('Product-item');

    const callbacks = {
        onAdd: () => add.onAdd(item._id),
    };
    
    return (
        <div className={cn()}>
            {
                item &&
                <>
                    <div>{item.description}</div>
                    <div>
                        <span>{item.madeIn.title}:&nbsp;</span>
                        <span className={cn('country')}>{item.madeIn.value}&nbsp;({item.madeIn.code})</span>
                    </div>
                    <div>
                        <span>{item.category.title}:&nbsp;</span>
                        <span className={cn('category')}>{item.category.value}</span>
                    </div>
                    <div>
                        <span>{item.edition.title}:&nbsp;</span>
                        <span className={cn('edition')}>{item.edition.value}</span>
                    </div>
                    <div className={cn('price')}>{item.price}</div>
                    {
                        add ? <button onClick={callbacks.onAdd}>{add.title}</button> : <></>
                    }
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
            title: PropTypes.string,
            value: PropTypes.string,
            code: PropTypes.string,
        }),
        category: PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
        }),
        edition: PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.number,
        }),
        price: PropTypes.string,
    }),
    add: PropTypes.shape({
        title: PropTypes.string,
        onAdd: PropTypes.func,
    }),
};

export default memo(ProductItem);
