import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return(
        <ul className={styles.NavigationItems}>
            <NavigationItem path="/" link="Home Page"/>
            <NavigationItem path="/orders" link="Orders" />
        </ul>
    );
}

export default navigationItems;
