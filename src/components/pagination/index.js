import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ pages, changePage = () => {} }) {
    const cn = bem('Pagination');

    return (
        <div className={cn()}>
            {
                pages.map((page, i) =>
                    <div
                        key={i}
                        onClick={() => changePage(Number(page[0]))}
                        className={cn('page', { none: page[1] === null, current: page[1] })}>
                        {page[0]}
                    </div>)
            }
        </div>
    );
}

Pagination.propTypes = {
    pages: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool,
            ])
        )
    ),
    changePage: PropTypes.func,
};

export default memo(Pagination);
