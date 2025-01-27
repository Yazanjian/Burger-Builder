import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/button/button';
import styles from './CheckoutSummary.module.css';
const CheckoutSummary = ( props ) => 
{
    
    return(
        <div className={styles.CheckoutSummary}> 
            <h1> We hope it tastes well </h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType={'Danger'} clicked={props.cancelCheckoutSummary}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.continueCheckOutSummary}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;