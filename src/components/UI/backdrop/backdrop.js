import React from 'react';
import styles from './backdrop.module.css';

const backdrop = (props) => (
    <div className={styles.BackDrop} onClick={props.BackdropClicked}> </div>
)

export default backdrop;