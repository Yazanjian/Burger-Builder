import React from 'react';
import styles from './dawerToggle.module.css'; 

const drawerToggle = (props) => {
    return(
        <div onClick={props.clicked} className={styles.DrawerToggle}>
           <div></div>
           <div></div>
           <div></div>
        </div>
    );
}

export default drawerToggle;