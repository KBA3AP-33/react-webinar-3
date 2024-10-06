import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormInput({ title = '', type = 'text', theme = '', error = '', ...props }) {
  const cn = bem('FormInput');
  
  return (
    <div className={cn({ theme })}>
        {
            (title) && <label htmlFor={props.id} className={cn('title')}>{title}</label>
        }
        <input
            id={props.id}
            type={type}
            className={cn('input')}
            {...props}/>
        {
          (error) && <p className={cn('error')}>{error}</p>
        }
    </div>
  );
}

FormInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
  error: PropTypes.string,
};

export default memo(FormInput);
