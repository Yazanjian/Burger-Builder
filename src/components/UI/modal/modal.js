import React from 'react';
import styles from './modal.module.css';
import Xcomponent from '../Xcomponent/Xcomponent';
import Backdrop from '../backdrop/backdrop';
import Aux from '../../../hoc/Aux';

const Modal = (props) => (
    <Aux>
        <Backdrop BackdropClicked={props.xClicked}/>        
        <div className={styles.Modal}>
            <Xcomponent  xClicked={props.xClicked}/>
            {props.children}     
        </div> 
        
    </Aux>
);

// export default React.memo(Modal);
export default Modal;