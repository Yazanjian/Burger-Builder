import React from 'react';

import styles from "./Order.module.css";

const Order = (props) => {
    const ingredients = []; 
    for(let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName, value:props.ingredients[ingredientName]});
    }

    const ingredientsToPrint = ingredients.map(item => {
       return( <span 
            style={{
            display:'inline-block',
            margin:'0px 8px',
            textTransform:"capitalize",
            border:'1px solid #ccc',
            padding:'5px'}}> {item.name} ({item.value})</span> )
    });
    
    return(
        <div className={styles.OrdersForm}>
            <p>Ingredients : {ingredientsToPrint} </p>
            <p>Price <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;