import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/button/button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(itemName => {
        return (<li key={itemName}> <span style={{textTransform:"capitalize"}}>{itemName} </span> : {props.ingredients[itemName]}</li>)       
    })
    return(
        <Aux>            
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p> <strong>Total Price : {props.price.toFixed(2)}$</strong> </p>
            <p>Continue to check out?</p>
            <Button btnType='Danger' clicked={props.cancelled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.continue}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;