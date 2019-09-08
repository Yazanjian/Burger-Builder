import React, {useContext} from 'react'; 
import styles from './BuildControl.module.css';
import ToProvide from '../../../../context/toProvide';

const BuildControl = (props) => {
    const toProvide = useContext(ToProvide);
    return(
    <div className={styles.BuildControl }>
        <div className={styles.Label}> {props.label} </div>
        <button className={styles.Less} onClick={()=>toProvide.removed(props.type)} disabled={toProvide.disabledButton[props.type]}>Less</button> 
        <button className={styles.More} onClick={()=>toProvide.added(props.type)}>More</button> 
    </div>
    )
}; 


export default BuildControl;
