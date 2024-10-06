import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormLayout({ title = '', children, onSubmit = () => {}, error = '', waiting = false, labelSubmit = 'Отправить' }) {
    const cn = bem('FormLayout');

    const callbacks = {
        onSubmit: (e) => {
            e.preventDefault();
            onSubmit();
        },
    }

    return (
        <form className={cn()} onSubmit={callbacks.onSubmit}>
            {(title) && <div className={cn('title')}>{title}</div>}  
            {children}
            <div className={cn('error')}>
                {
                    (error) && <p>{error}</p>
                }
            </div>
            <button disabled={waiting}>{labelSubmit}</button>
        </form>
    );
}

FormLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    error: PropTypes.string,
    waiting: PropTypes.bool,
    labelSubmit: PropTypes.string,
};

export default memo(FormLayout);
