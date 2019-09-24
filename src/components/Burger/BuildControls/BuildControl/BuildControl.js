import React, {useContext} from 'react'; 
import styles from './BuildControl.module.css';
import ToProvide from '../../../../context/toProvide';

const BuildControl = ({label, type}) => {
    const toProvide = useContext(ToProvide);
    return(
    <div className={styles.BuildControl }>
        <div className={styles.Label}> {label} </div>
        <button data-test={`${label}-less`} className={styles.Less} onClick={()=>toProvide.removed(type)} disabled={toProvide.disabledButton[type]}>Less</button> 
        <button data-test={`${label}-more`} className={styles.More} onClick={()=>toProvide.added(type)}>More</button> 
    </div>
    )
}; 


export default BuildControl;
