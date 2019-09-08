import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/drawerToggle/drawerToggle';

const Toolbar = (props) => {
    return(
        <header className={styles.Toolbar}>
            {/* <div onClick={props.menuClicked}>Menu</div> */}
            <DrawerToggle clicked={props.menuClicked}/>
            <Logo height="80%"/>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;