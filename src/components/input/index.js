import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function Input({ id, name, type, title, ...props }) {
    const cn = bem('Input');

    return (
        <div className={cn()}>
            {
                title && <label htmlFor={id} className={cn('title')}>{title}</label>
            }
            <input
                id={id}
                name={name}
                type={type}
                {...props} />
        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
};

export default memo(Input);
