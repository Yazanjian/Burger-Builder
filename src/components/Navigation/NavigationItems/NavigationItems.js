import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return(
        <ul className={styles.NavigationItems}>
            <NavigationItem path="/" link="Home Page"/>
            {props.isAuth ? <NavigationItem path="/orders" link="Orders" /> : null}
            {props.isAuth 
                ? <NavigationItem path="/logout" link="Log out" />
                : <NavigationItem path="/Auth" link="Authenticate" />
            }
        </ul>
    );
}

export default navigationItems;
