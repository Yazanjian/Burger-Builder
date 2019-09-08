import React from 'react';
import imgLogo from '../../assets/images/burger-logo.png';
import styles from './logo.module.css';


const logo = (props) => (
    <div className={styles.Logo} style={{height:props.height}}> 
        <img src={imgLogo} alt={"Burger Logo"}/>
    </div>
);

export default logo;