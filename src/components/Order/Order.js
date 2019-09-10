import React from 'react';

import styles from "./Order.module.css";

const Order = (props) => {
    return(
        <div className={styles.OrdersForm}>
            <p>Ingredients : salad (1) </p>
            <p>Price <strong>USD 2</strong></p>
        </div>
    )
}

export default Order;