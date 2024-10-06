import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormLayout({ title = '', children, onSubmit = () => {}, errors, labelSubmit = 'Отправить' }) {
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
                    (errors.length)
                        ? errors.map(error => <p key={error}>{error}</p>)
                        : <></>
                }
            </div>
            <button type='submit'>{labelSubmit}</button>
        </form>
    );
}

FormLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
    labelSubmit: PropTypes.string,
};

export default memo(FormLayout);
