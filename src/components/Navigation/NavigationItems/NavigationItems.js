import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return(
        <ul className={styles.NavigationItems}>
            <NavigationItem path="/" link="Home Page"/>
            <NavigationItem path="/orders" link="Orders" />
            <NavigationItem path="/Auth" link="Authenticate" />
        </ul>
    );
}

export default navigationItems;
