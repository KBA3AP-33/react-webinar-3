import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from '../../components/input';
import './style.css';

function Radio({ name, list, select, ...props }) {
    const cn = bem('Radio');

    return (
        <div className={cn()}>
            {
                list.map(item =>
                    <Input
                        id={item.value}
                        name={name}
                        key={item.title}
                        type="radio"
                        title={item.title}
                        value={item.value}
                        checked={item.value === select}
                        hidden
                        {...props}/>)
            }
        </div>
    );
}

Radio.propTypes = {
    name: PropTypes.string.isRequired,
    select: PropTypes.string,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
    })).isRequired,
};

export default memo(Radio);
