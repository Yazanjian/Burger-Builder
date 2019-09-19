import React from 'react'; 
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <div> Total Price : <strong>{props.price.toFixed(2)}</strong></div>
        {controls.map(ctr => (
            <BuildControl key={ctr.label} label={ctr.label} type={ctr.type}/>
        ))}
        <button className={styles.OrderButton} disabled={!props.purchasable} onClick={props.orderNowClicked}>
            {props.isAuth ? "ORDER NOW" : "Sign in First"}
        </button>
    </div>
); 


export default BuildControls;
