import { memo } from 'react';
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Navbar({ links, children }) {
    const cn = bem('Navbar');

    return (
        <div className={cn()}>
            <nav>
                <ul className={cn('list')}>
                    {
                        links.length && links.map(link => 
                            <li key={link.path}>
                                <Link to={link.path}>{link.title}</Link>
                            </li>)
                    }
                </ul>
            </nav>
            {children}
        </div>
    );
}

Navbar.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            path: PropTypes.string,
        })
    ).isRequired,
    children: PropTypes.node,
};

export default memo(Navbar);
