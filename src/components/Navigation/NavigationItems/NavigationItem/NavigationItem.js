import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const navigationItem = (props) => {
    return(
        <li className={styles.NavigationItem}> 
            <NavLink to={props.path} activeClassName={styles.active} exact> {props.link} </NavLink> 
        </li>
    );
}

export default navigationItem;
